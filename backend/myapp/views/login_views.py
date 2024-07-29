from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from myapp.forms import LoginForm

import logging

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            userID = form.cleaned_data['userID']
            password = form.cleaned_data['password']
            user = authenticate(request, username=userID, password=password)  # username을 userID로 변경
            if user is not None:
                login(request, user)
                logger.debug("로그인 성공")
                return redirect('home')
            else:
                logger.debug("로그인 실패: 잘못된 아이디 또는 비밀번호")
                form.add_error(None, "잘못된 아이디 또는 비밀번호입니다.")
    else:
        form = LoginForm()
    return render(request, 'myapp/login.html', {'form': form})
