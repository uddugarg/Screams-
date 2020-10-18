import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar, Button, TextField } from '@material-ui/core';
import Comment from './Comment';
import './Post.css'
import Replies from './Replies';

function CommentsModal(props) {

    const user = useSelector(state => state.user);

    const [comment, setComment] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            comment: comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        axios.post('/api/comment/postComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComment('');
                    props.refreshFunction(response.data.doc);
                } else {
                    alert('Comment cannot be posted right now!');
                }
            })
    }

    return (
        <div className='comments__modal'>
            <h3 className='comments__header'>Comments</h3>
            {props.comments && props.comments.map((comment, index) => (
                (!comment.commentId &&
                    <React.Fragment key={index}>
                        <Comment comment={comment} postId={props.postId} commentId={comment._id} refreshFunction={props.refreshFunction} />
                        <Replies replies={props.comments} postId={props.postId} commentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
            <form onSubmit={handleSubmit} className='comments__container'>
                <Avatar className='comments__avatar' src={user.userData && user.userData.image} alt={user.userData && user.userData.email} />
                <TextField className='comments__input' variant='standard' color='primary' type='text' label='Add a public comment'
                    value={comment} onChange={(e) => setComment(e.target.value)}
                />
                <Button className='comments__logBtn' type='submit' variant='outlined' disabled={!comment} onClick={handleSubmit}>Post</Button>
            </form>
        </div>
    )
}

export default CommentsModal
