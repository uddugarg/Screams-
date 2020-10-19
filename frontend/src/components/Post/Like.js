import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Like(props) {

    const user = useSelector(state => state.user);

    const [likes, setLikes] = useState('');
    const [liked, setLiked] = useState(null);

    let variable = {}

    if (props.post) {
        variable = {
            writer: user.userData._id,
            postId: props.postId,
            postWriter: props.postWriter,
        }
    } else {
        variable = {
            writer: user.userData._id,
            commentId: props.commentId,
            postWriter: props.postWriter,
        }
    }

    useEffect(() => {

        let writer = user.userData && user.userData._id;

        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length);
                    response.data.likes.map(like => {
                        if (like.writer === writer) {
                            setLiked('liked');
                        }
                    })
                } else {
                    alert('Unable to get likes');
                }
            })
    }, [])

    const handleLike = () => {
        if (liked === null) {
            axios.post('/api/like/postLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes + 1);
                        setLiked('liked');
                    } else {
                        alert('Unable to like this post!!');
                    }
                })
        } else {
            axios.post('/api/like/deleteLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes - 1);
                        setLiked(null);
                    } else {
                        alert('Cannot Unlike the post');
                    }
                })
        }
    }


    return (
        <div>
            {liked !== 'liked' ? (
                <IconButton className='post__reactionBtn' onClick={handleLike} >
                    <FavoriteBorderRoundedIcon fontSize='small' />
                </IconButton>
            ) : (
                    <IconButton className='post__reactionBtn' onClick={handleLike} >
                        <FavoriteIcon fontSize='small' />
                    </IconButton>
                )
            }

        </div>
    )
}

export default Like
