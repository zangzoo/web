# views.py 파일에서 history_views 수정
from django.shortcuts import render
from myapp.models import Patient

def history_views(request):
    query = request.GET.get('search', '')  # 검색 쿼리 가져오기
    if query:
        patients = Patient.objects.filter(patient_name__icontains=query).order_by('-date_joined')  # 검색 기능
    else:
        patients = Patient.objects.all().order_by('-date_joined')  # 모든 환자 정보를 최신순으로

    return render(request, 'myapp/history.html', {'patients': patients, 'search_query': query})