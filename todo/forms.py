from django import forms
from todo.models import Todo


class TodoForm(forms.ModelForm):

    name = forms.CharField(max_length=200, help_text="Please enter the Todo name.")
    description = forms.CharField(max_length=400, required=False, help_text="Optional Todo description..")
    priority = forms.CharField(max_length=8, help_text="Please enter the Todo priority.")
    notes = forms.CharField(max_length=300, required=False, help_text="Optional Todo notes.")
    tags = forms.CharField(max_length=100, required=False, help_text="Optional Todo tags.")
    project = forms.CharField(max_length=200, required=False, help_text="Optional Todo project.")
    email = forms.CharField(max_length=100, required=False, help_text="Optional Todo email.")
    phone_number = forms.CharField(max_length=12, required=False, help_text="Optional Todo phone number.")
    address = forms.CharField(max_length=200, required=False, help_text="Optional Todo address.")

    class Meta:
        model = Todo
        # exclude = ['author', 'updated', 'created', ]
        fields = ['name', 'description', 'priority', 'notes', 'tags', 'project', 'email', 'phone_number', 'address']

        widgets = {
            'name': forms.TextInput(
                attrs={'id': 'post-text', 'required': True, 'placeholder': 'Say something...'}
            ),
        }