from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=100) 
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', default=1)
    likes = models.ManyToManyField(User, related_name='likes', blank=True)
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    def __str__(self):
        return self.title
    
    
