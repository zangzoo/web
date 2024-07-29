from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login
from myapp.models import User, Hospital
from myapp.forms import RegisterForm

def register_view(request):
    if request.method == 'POST':
        post_data = request.POST.copy()
        email = post_data.get('email')
        email_domain = post_data.get('email_domain')
        if email and email_domain:
            full_email = f"{email}@{email_domain}"
            post_data['email'] = full_email

        print(post_data)

        # post_data를 수정하여 이메일과 도메인을 결합한 후 RegisterForm에 전달하도록 수정했지만, 폼 인스턴스를 생성할 때 수정된 post_data를 사용하지 않았다. 수정된 데이터를 폼에 전달해야 함
        form = RegisterForm(post_data)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            print("회원가입 성공")  # 디버깅 메시지
            return redirect('login')  # 로그인 페이지로 리디렉션
        else:
            print("폼이 유효하지 않습니다:", form.errors)
    else:
        form = RegisterForm()

    hospitals = Hospital.objects.all()
    return render(request, 'myapp/register.html', {'form': form, 'hospitals': hospitals})
