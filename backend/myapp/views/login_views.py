from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from myapp.forms import LoginForm

import logging

logger = logging.getLogger(__name__)

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            userID = form.cleaned_data['userID']
            password = form.cleaned_data['password']
            remember = form.cleaned_data.get('remember')
            logger.debug(f"Trying to authenticate user: {userID}")

            user = authenticate(request, username=userID, password=password)  # username을 userID로 변경
            if user is not None:
                login(request, user)
                logger.debug("로그인 성공")

                response = redirect('home')

                if remember:
                    response.set_cookie('userID', userID, max_age=3 * 24 * 60 * 60)  # 3일 동안 쿠키 저장
                    response.set_cookie('password', password, max_age=3 * 24 * 60 * 60)
                else:
                    response.delete_cookie('userID')
                    response.delete_cookie('password')

                return response


            else:
                logger.debug("로그인 실패: 잘못된 아이디 또는 비밀번호")
                form.add_error(None, "잘못된 아이디 또는 비밀번호입니다.")
        else:
            logger.debug(f"Form is not valid: {form.errors}")
    else:
        userID = request.COOKIES.get('userID', '')
        password = request.COOKIES.get('password', '')
        form = LoginForm(initial={'userID': userID, 'password': password})
        logger.debug("Displaying login form")
    return render(request, 'myapp/login.html', {'form': form})
