from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..forms import ImageUploadForm

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_instance = form.save()
            # 업로드된 이미지의 URL을 반환
            image_url = request.build_absolute_uri(image_instance.image.url)
            return JsonResponse({
                'status': 'success',
                'message': 'Image uploaded successfully',
                'image_id': image_instance.id,
                'image_url': image_url  # 업로드된 이미지의 URL 반환
            })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'Failed to upload image',
                'errors': form.errors
            })
    else:
        form = ImageUploadForm()
        return render(request, 'myapp/upload.html', {'form': form})
