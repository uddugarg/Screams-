import { Avatar, IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import './Post.css';
import Like from './Like';

function Comment(props) {

    const user = useSelector(state => state.user);

    const [reply, setReply] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            postId: props.postId,
            comment: reply,
            reply: reply,
            commentId: props.comment._id,
            postWriter: props.postWriter,
        }

        axios.post('/api/comment/postComment', variable)
            .then(response => {
                if (response.data.success) {
                    setReply('');
                    setOpen(false);
                    props.refreshFunction(response.data.doc);
                } else {
                    alert('Comment cannot be posted right now!');
                }
            })
    }

    return (
        <div className='comment'>
            <div className='comment__info'>
                <Avatar className='comments__avatar' src={props.comment.writer.image} alt={props.comment.writer.username} />
                <h4>{props.comment.writer.username}</h4>
                <p>{props.comment.comment}</p>
            </div>
            <div className='comment__actions'>
                <Like commentId={props.comment._id} />
                {props.commentId &&
                    <span onClick={handleOpen} className='comment__actionBtn'>Reply</span>
                }
            </div>
            {open &&
                <form onSubmit={handleSubmit}>
                    <TextField className='comment__replyField' variant='standard' color='primary' type='text' label='Add a reply'
                        value={reply} onChange={(e) => setReply(e.target.value)}
                    />
                </form>
            }
        </div>
    )
}

export default Comment
