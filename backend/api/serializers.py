from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ["id", "username","email","password"] # fields to be serialized
        extra_kwargs = {"password": {"write_only": True}} # password is write only and required

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()

        return user
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "title", "content", "created_at", "author", "likes","image"]
        extra_kwargs = {"author": {"read_only": True}} # author is read only
        read_only_fields = ['like_count']

    def get_like_count(self, obj):
        return obj.likes.count()