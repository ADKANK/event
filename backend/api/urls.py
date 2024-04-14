from django.urls import path
from .views import PostListView, PostView, get_creation_date, get_user_email ,  get_username, get_user_id, get_like_count,get_post_likes, liked_posts,posts_by_current_user


urlpatterns = [
    path("posts/create/", PostView.as_view(), name="post-list-create"),
    path("posts/<int:pk>/like/", get_post_likes, name="post-like"),
    path("posts/", PostListView.as_view(), name="post-list"),
    path("get-username/", get_username, name="username"),
    path('user/id/', get_user_id, name='get_user_id'),
    path('likes/', get_like_count, name='like_count'),
    path('liked-posts/', liked_posts, name='liked_posts'),
    path('posts/by-current-user/', posts_by_current_user, name='posts_by_current_user'),
    path('<int:pk>/get-user-email/', get_user_email, name='get_email'),
    path('posts/<int:pk>/get-creation-date/', get_creation_date, name='get_date')
    
]