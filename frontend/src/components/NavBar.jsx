import React, { useState } from "react";
import '../styles/NavBar.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../styles/PostListPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ useremail, handleLogout, searchQuery, handleSearch, handleCreate }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handlePostsClick = () => {
        navigate('/');
    }

    const handleLikedPostsClick = () => {
        navigate('/liked-posts');
    };

    const handleMyPostsClick = () => {
        navigate('/my-posts');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>My App</h1>
            </div>
            <div className="search-bar" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        width: '300px',
                        marginRight: '10px',
                    }}
                />
                <button className='create-button' onClick={handleCreate}>Create</button>
            </div>
            <div className="navbar-user">
                {location.pathname === '/liked-posts' ? (
                    <button className="username-btn" onClick={handlePostsClick}>
                        Posts
                    </button>
                ) : (
                    <button className="username-btn" onClick={handleLikedPostsClick}>
                        Liked Posts
                    </button>
                )}

                {location.pathname === '/my-posts' ? (
                    <button className="username-btn" onClick={handlePostsClick}>
                        Posts
                    </button>
                ) : (
                    <button className="username-btn" onClick={handleMyPostsClick}>
                        My Posts
                    </button>
                )}
                <button className="username-btn" onClick={() => setIsOpen(!isOpen)}>
                    {useremail} <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};


export default NavBar;