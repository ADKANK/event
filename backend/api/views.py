from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, filters, status
from rest_framework.response import Response
from .serializers import UserSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Post
from rest_framework.decorators import api_view, permission_classes
from .filters import PostFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

class PostView(generics.ListCreateAPIView):
    queryset = Post.objects.all() # get all Post
    serializer_class = PostSerializer # use the PostSerializer
    permission_classes = [IsAuthenticated] # only authenticated users can view the Post

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) # save the author of the Post
        else:
            return Response(serializer.errors) # return any errors if the serializer is not valid
        
    def get_queryset(self):
        user = self.request.user # get the current user
        return Post.objects.filter(author=user) # return all Post by the current user

class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()  # get all posts
    serializer_class = PostSerializer # use the PostSerializer
    permission_classes = [AllowAny] # allow any user to view the Post
    filter_backends = [DjangoFilterBackend] # enable filtering
    filterset_fields = ['title'] # filter by title
                     
    def post_view(request):
        posts = Post.objects.all() 
        serializer = PostSerializer(posts, many=True, context={'request': request} )
        return Response(serializer.data) # return all posts
    
@api_view(['POST'])
def get_post_likes(request, pk):
    post = get_object_or_404(Post, pk=pk) # Get the post
    user_likes = {} # Dictionary to store user like status
    all_users = User.objects.all() # Get all users
    for user in all_users: # Loop through all users
        user_likes[user.username] = False  # Initialize all users as not liked
    if request.method == 'POST': # Check if the request method is POST
        user = request.user # Get the current user
        if user.is_authenticated:  # Make sure the user is authenticated
            if user in post.likes.all(): # Check if the user has liked the post
                post.likes.remove(user) # Unlike the post
            else:
                post.likes.add(user) # Like the post
            user_likes[user.username] = user not in post.likes.all()  # Update user's like status
            return Response(user_likes) # Return the updated user like status
        else: 
            return Response(status=401)
    else:
        for user in all_users:
            user_likes[user.username] = user not in post.likes.all()  # Update user's like status
        return Response(user_likes)
    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # get all users
    serializer_class = UserSerializer # use the UserSerializer
    permission_classes = [AllowAny] # allow any user to create a new user

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow any origin to access this endpoint
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    # Add CORS headers to allow requests from all origins
    response = Response(serializer.data)
    response["Access-Control-Allow-Origin"] = "*"  # Allow requests from any origin
    response["Access-Control-Allow-Methods"] = "GET"  # Specify allowed methods
    
    return response
@api_view(['GET'])
@permission_classes([AllowAny]) 
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    response = Response(serializer.data)
    response["Access-Control-Allow-Origin"] = "*" # Allow requests from any origin
    response["Access-Control-Allow-Methods"] = "GET" # Specify allowed methods
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    username = request.user.username
    return Response({'username': username})

@api_view(['GET'])
def get_user_email(request, pk): 
    try:
        user = User.objects.get(pk=pk) # Get the user
        email = user.email
        return Response({'email': email})
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    if request.user.is_authenticated:
        user_id = request.user.id
        return Response({'user_id': user_id})
    else:
        return Response({'error': 'User is not authenticated'}, status=401)
@api_view(['GET'])
@permission_classes([AllowAny])
def get_like_count(request, pk):
    try:
        post = Post.objects.get(pk=pk) # Get the post
        like_count = post.likes.count() # Get the number of likes
        return Response({'like_count': like_count}) # Return the number of likes
    except Post.DoesNotExist:
        return Response(status=404)     

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def liked_posts(request):
    liked_posts = Post.objects.filter(likes=request.user) # Get all posts liked by the current user
    serializer = PostSerializer(liked_posts, many=True) # Serialize the posts
    return Response(serializer.data) # Return the serialized data

@api_view(['GET'])
def posts_by_current_user(request):
    current_user = request.user
    posts = Post.objects.filter(author=current_user)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


# get creation_date of a post
@api_view(['GET'])
def get_creation_date(request, pk):
    try:
        post = Post.objects.get(pk=pk) # Get the post
        creation_date = post.created_at # Get the creation date
        return Response({'creation_date': creation_date}) # Return the creation date
    except Post.DoesNotExist:
        return Response(status=404) # Return 404 if the post does not exist