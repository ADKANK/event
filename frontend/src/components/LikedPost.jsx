import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your API client library
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Heart from "react-animated-heart";
import '../styles/PostListPage.css';
import PostForm from './PostForm';

const LikedPostsPage = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [createVisible, setCreateVisible] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [likeStatus, setLikeStatus] = useState({});
    const [userId, setUserId] = useState(null);
    const [creationDate, setCreationDate] = useState([]);

    useEffect(() => {


        const fetchUserId = async () => {
            try {
                const response = await api.get('/api/user/id/');
                setUserId(response.data.user_id);
            } catch (error) {
                console.error('Error fetching user ID:', error);

            }
        };

        fetchUserId();
        fetchLikedPosts();

    }, [searchQuery, likeStatus]);

    useEffect(() => {
        fetchUserEmail(); // Fetch user email whenever userId changes
    }, [userId]);

    useEffect(() => {
        fetchDate();
    }, [creationDate]);

    const fetchDate = async (postId) => {
        try {
            if (!postId) return;
            const response = await api.get(`/api/posts/${postId}}/get-creation-date/`);
            setCreationDate(response.data.created_at);
        } catch (error) {
            console.error('Error fetching creation date:', error);
        }
    };

    const fetchUserEmail = async () => {
        try {
            if (!userId) return;
            const response = await api.get(`/api/${userId}/get-user-email/`);
            setEmail(response.data.email);
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };

    const fetchLikedPosts = async () => {
        try {
            const response = await api.get('/api/liked-posts/', {
                params: {
                    title: searchQuery
                }
            });
            setLikedPosts(response.data);
        } catch (error) {
            console.error('Error fetching liked posts:', error);
        }
    };
    // Function to handle liking/unliking a post
    const handleLike = async (postId) => {
        try {
            const updatedLikeStatus = { ...likeStatus };
            updatedLikeStatus[postId] = !updatedLikeStatus[postId];
            setLikeStatus(updatedLikeStatus);
            const res = await api.post(`http://localhost:8000/api/posts/${postId}/like/`);
            fetchLikedPosts();
            return res.data;
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };


    const hasLikedPost = (post) => {
        const hasLiked = post.likes.some(like => {
            return like === userId;
        });
        return hasLiked;
    }

    const handleCreate = () => {
        setCreateVisible(true);
    };

    const handleClose = () => {
        setCreateVisible(false);
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString(); // Format as per user's locale
    };


    return (
        <div className="container">
            <NavBar useremail={email} searchQuery={searchQuery} handleSearch={handleSearch} handleCreate={handleCreate} handleLogout={() => navigate('/logout')} />
            <h1 className="page-title" style={{ textAlign: 'center', fontFamily: 'Roboto', fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Liked Posts</h1>
            <div className="post-list">
                {likedPosts.map(post => (
                    <div key={post.id} className="post-item">
                        <div className="post-content">
                            <h2 className="post-title" style={{ fontFamily: 'Roboto', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{post.title}</h2>
                            <p className="post-description" style={{ fontFamily: 'Open Sans', fontSize: '18px', color: '#666', marginBottom: '10px' }}>{post.content}</p>
                            <p className="like-count">Likes: {post.likes.length}</p> {/* Render like count */}
                            <p className="date">Created: {formatDate(post.created_at)}</p>
                        </div>
                        {post.image && <img src={`http://localhost:8000${post.image}`} className="post-image" />}


                        <Heart
                            onClick={async () => handleLike(post.id)}
                            // Check if the logged-in user's ID is present in the post.likes array
                            isClick={hasLikedPost(post)}
                        />


                    </div>
                ))}
                {createVisible && (
                    <PostForm onClose={handleClose} fetchPosts={fetchLikedPosts} />
                )}
            </div>
        </div>
    );
}

export default LikedPostsPage;