from django.shortcuts import render

def register_view(request):
    return render(request, 'myapp/register.html')
