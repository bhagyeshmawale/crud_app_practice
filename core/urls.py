from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView, PasswordChangeView,PasswordChangeDoneView,PasswordResetView, PasswordResetConfirmView,PasswordResetCompleteView
from .form import MyChangePasswordForm, MyPasswordResetForm
urlpatterns = [
    path('', home, name='home'),
    path('signup/', signupView.as_view(), name='signup'),
    path('login/', myloginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='/login/'), name='logout'),
    path('change-password', PasswordChangeView.as_view(template_name='core/change-password.html',
                                                       form_class=MyChangePasswordForm), name='change-password'),
    path('password-change-done', PasswordChangeDoneView.as_view(template_name='core/change-password-done.html')
         , name='password_change_done'),
    path('reset-password/', PasswordResetView.as_view(template_name='core/reset-password.html',form_class= MyPasswordResetForm)
         , name='reset-password'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(template_name= 'core/password-reset-confirm.html',form_class= MySetPasswordForm),name='password_reset_confirm'),
    path('password-reset-done', PasswordChangeDoneView.as_view(template_name='core/password-reset-done.html'), name='password_reset_done'),
    path('password-reset-complete/',PasswordResetCompleteView.as_view(template_name='core/password-reset-complete.html'),name='password_reset_complete'),
    path('form-virsion/', Formversion.as_view(), name='form_version'),
    path('add-form/', AddForm.as_view(), name='add_form'),
path('delete-form/', Delete_Student.as_view(), name='delete_form'),


]