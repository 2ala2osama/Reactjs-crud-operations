import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import '../Styles/Card.css';
import '../Styles/Login.css';
const PostCard = ({ post, onDelete, onEdit }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDelete = () => {
        setShowConfirmDialog(true);
    };

    const confirmDelete = () => {
        onDelete(post.id);
        setShowConfirmDialog(false);
    };

    const handleEdit = () => {
        onEdit(post);
    };

    return (
        <div className="post-card">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className='button-actions'>
                <Button variant="contained" onClick={handleDelete}>Delete</Button>
                <Button variant="contained" onClick={handleEdit}>
                    Edit
                </Button>
            </div>
            {showConfirmDialog && (
                <Dialog open={showConfirmDialog}>
                    <DialogContent>
                        <div className="confirm-dialog">
                            <p>Are you sure you want to delete this post?</p>
                            <div className='buttton-actions'>
                                <Button onClick={confirmDelete}>Yes</Button>
                                <Button onClick={() => setShowConfirmDialog(false)}>No</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default PostCard;
