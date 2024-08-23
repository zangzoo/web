from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from django.views.decorators.http import require_http_methods
from xhtml2pdf import pisa
import os
from django.conf import settings
from datetime import datetime
import pytz
from myapp.models import Patient



@require_http_methods(["GET", "POST"])
def fetch_data(request):
    kst = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst)

    if request.method == 'POST':
        patient_name = request.POST.get('patient_name', 'None')
        
        # Patient 모델에서 환자 정보를 조회합니다.
        try:
            patient = Patient.objects.get(patient_name__icontains=patient_name)
        except Patient.DoesNotExist:
            return HttpResponse('해당 이름의 환자가 존재하지 않습니다.')

        context = {
                'patient_name': patient.patient_name,
                'patient_id': patient.id,
                'age': patient.age,
                'gender': patient.gender,
                'date_of_birth': patient.dob.strftime('%Y-%m-%d') if patient.dob else 'None',
                'radiology_type': request.POST.get('radiology_type', 'None'),
                'test_date': request.POST.get('test_date', now.strftime('%Y-%m-%d')),
                'test_time': request.POST.get('test_time', now.strftime('%H:%M')),
                'department': request.POST.get('department', 'None'),
                'diagnosis': request.POST.get('diagnosis', 'None'),
                'medications': request.POST.get('medications', 'None'),
                'ordering_physician': request.POST.get('ordering_physician', 'None'),
                'radiology_physician': request.POST.get('radiology_physician', 'None'),
                'ai_analysis_image': request.POST.get('ai_analysis_image', request.session.get('image_url', 'None')),
                'ai_interpretation': request.POST.get('ai_interpretation', 'None'),
                'physician_manifestation': request.POST.get('physician_manifestation', 'None'),
                'predicted_class_name': request.session.get('predicted_class_name', 'None'),
                'confidence': request.session.get('confidence', 'None')
        }
        return generate_pdf(request, context)
    else:
        return render(request, 'report_form.html')


def generate_pdf(request, context):
    template_path = 'myapp/report_template.html'
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="alzheimer_report.pdf"'
    template = get_template(template_path)
    html = template.render(context)
    pisa_status = pisa.CreatePDF(html, dest=response)
    if pisa_status.err:
        return HttpResponse('오류가 발생했습니다. <pre>' + html + '</pre>')
    return response

@require_http_methods(["GET"])
def download_report(request):
    kst = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst)

    # 세션에서 환자 이름 가져오기
    patient_name = request.session.get('patient_name')
    
    if not patient_name:
        # 요청에서 직접 환자 이름을 가져오거나 기본값 사용
        patient_name = request.GET.get('patient_name')
        if not patient_name:
            return HttpResponse("환자 이름이 세션 또는 요청에 없습니다.", status=400)

    try:
        # 환자 이름을 기반으로 Patient 모델에서 환자 정보 조회
        patient = Patient.objects.get(patient_name__icontains=patient_name)
    except Patient.DoesNotExist:
        return HttpResponse("해당 이름의 환자가 존재하지 않습니다.", status=404)

    context = {
        'patient_name': patient.patient_name,
        'patient_id': patient.id,
        'age': patient.age,
        'gender': patient.gender,
        'date_of_birth': patient.dob.strftime('%Y-%m-%d'),
        'radiology_type': 'MRI',  # 이 부분은 상황에 따라 수정 필요
        'test_date': now.strftime('%Y-%m-%d'),
        'test_time': now.strftime('%H:%M'),
        'department': '신경외과',  # 이 부분은 상황에 따라 수정 필요
        'diagnosis': '알츠하이머',  # 이 부분은 상황에 따라 수정 필요
        'medications': 'None',  # 이 부분은 상황에 따라 수정 필요
        'ordering_physician': 'Dr. Kim',  # 이 부분은 상황에 따라 수정 필요
        'radiology_physician': 'Dr. Lee',  # 이 부분은 상황에 따라 수정 필요
        'ai_analysis_image': request.session.get('image_url', os.path.join(settings.MEDIA_URL, 'images/MRI.jpg')),
        'ai_interpretation': 'AI 해석 결과',
        'physician_manifestation': '의사 소견',
        'predicted_class_name': request.session.get('predicted_class_name'),
        'confidence': request.session.get('confidence')
    }
    
    return generate_pdf(request, context)