from django.utils.safestring import mark_safe
from django.contrib import admin
from .models import Post

# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'image_tag')
    list_filter = ('author', 'created_at')
    search_fields = ('title', 'content')
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height="{height}" />'.format(
            url=obj.image.url,
            width=200,
            height=200,
        ))
    image_tag.short_description = 'Image'
