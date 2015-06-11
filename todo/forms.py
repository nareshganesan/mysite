from django import forms
from todo.models import Todo


class PostForm(forms.ModelForm):
    class Meta:
        model = Todo
        # exclude = ['author', 'updated', 'created', ]
        fields = ['name']
        widgets = {
            'name': forms.TextInput(
                attrs={'id': 'post-text', 'required': True, 'placeholder': 'Say something...'}
            ),
        }