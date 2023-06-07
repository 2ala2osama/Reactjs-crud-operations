import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import PostCard from './PostCard';
import Button from '@mui/material/Button';
import '../Styles/Card.css';
import '../Styles/Login.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }, []);

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setShowDialog(false);
    };

    const handleDeletePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    const handleEditPost = (post) => {
        setEditPost(post);
        setShowDialog(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedPost = {
            title: formData.get('title'),
            body: formData.get('body'),
        };

        if (editPost) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${editPost?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            })
                .then((response) => response.json())
                .then((data) => {
                    setPosts((prevPosts) =>
                        prevPosts.map((post) => (post?.id === data.id ? data : post))
                    );
                    setShowDialog(false);
                    setEditPost(null);
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        } else {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost),
            })
                .then((response) => response.json())
                .then((data) => {
                    setPosts((prevPosts) => [...prevPosts, data]);
                    setShowDialog(false);
                })
                .catch((error) => {
                    console.log('Error:', error);
                });
        }
    };
    return (
        <Container>
            <div className='header-posts'>
                <h1>Posts</h1>
                <Button variant="contained" onClick={() => setShowDialog(true)}>Add Post</Button>
            </div>
            {showDialog && (
                <Dialog open={showDialog}>
                    <DialogTitle>{editPost ? 'Edit' : 'Add'} Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control'>
                                <label>
                                    Title:
                                </label>
                                <input type="text" name="title" defaultValue={editPost?.title} />
                            </div>
                            <div className='form-control'>
                                <label>
                                    Body:
                                </label>
                                <textarea name="body" defaultValue={editPost?.body} />
                            </div>
                            <div className='button-actions'>

                                <Button type="submit">{editPost ? 'Update' : 'Add'}</Button>
                                <Button type="button" onClick={() => setShowDialog(false)}>
                                Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

            )}

            {posts.map((post) => (
                
                <PostCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    onEdit={handleEditPost}
                />
            ))}
        </Container>
    );
};

export default PostList;
