from django.http import JsonResponse

# Create your views here
def hello_world(request):
    response = {
    "data" : "Thank you for using web-starter-cli, this message is from the Django backend"
    }
    return JsonResponse(response)
