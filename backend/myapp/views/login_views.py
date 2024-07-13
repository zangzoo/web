from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

def login_view(request):
    if request.method == 'POST':
        # 아이디와 비밀번호를 입력했을 때, 바로 업로드 페이지로 이동
        return redirect('upload_image')
    return render(request, 'myapp/login.html')
    """
    로그인 확인 후 로그인 되는 코드 - 현재는 바로 upload_image로 리디렉트하게끔 구현함
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('upload_image')
            else:
                form.add_error(None, "Invalid credentials")
    else:
        form = LoginForm()
    return render(request, 'myapp/login.html', {'form': form})
    """