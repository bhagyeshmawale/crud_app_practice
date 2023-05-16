from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.views.generic import View
from django.contrib.auth.forms import authenticate
from .form import *
from django.contrib import messages


from .models import FormVirsion

# Create your views here.

def home(request):
    return render(request, 'core/home.html')

class signupView(View):
    def get(self, request):
        fm=SighnUpForm()
        return render(request, 'core/signup.html', {'form':fm})

    def post(self, request):
        try:
            fm=SighnUpForm(request.POST)
            if fm.is_valid():
                fm.save()
                messages.success(request, "Signup Successful")
                return redirect('/login')
            else:
                return render(request, 'core/signup.html', {'form': fm})
        except:
            print('not working')

class myloginView(View):
    def get(self, request):
        fm = MyLoginForm()
        return render(request, 'core/login.html', {'form': fm})

    def post(self, request):
        fm = MyLoginForm(request, data=request.POST)
        if fm.is_valid():
            username = fm.cleaned_data['username']
            password = fm.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            print(user)
            if user is not None:
                login(request, user)
                return redirect('/')
            else:
                return render(request, 'core/login.html', {'form': fm})
        else:
            return render(request, 'core/login.html', {'form': fm})


class Formversion(View):
    def get(self,request):
        form_data = FormVirsion.objects.all()
        return  render(request, 'core/user_form.html', {'formdata': form_data})

class AddForm(View):
    def get(self,request):
        fm = AddFormVersion()
        return render(request, 'core/add_form.html', {'form': fm})

    def post(self,request):
        fm = AddFormVersion(request.POST)
        if fm.is_valid():
            fm.save()
            return render(request, 'core/user_form.html', {'form': fm})
        else:
            return render(request, 'core/user_form.html', {'form': fm})


class Delete_Student(View):
    def post(self,request):
        data = request.POST
        print(data)


