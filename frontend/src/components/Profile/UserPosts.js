import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentsModal from '../Post/CommentsModal';
import Carousel from 'react-material-ui-carousel';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PollIcon from '@material-ui/icons/Poll';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles, Modal, Avatar, IconButton } from '@material-ui/core';
import '../Post/Post.css';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        maxWidth: 500,
        maxHeight: '90vh',
        height: 'auto',
        objectFit: 'contain',
        width: '90%',
        backgroundColor: '#f9c5d1',
        backgroundImage: 'linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%)',
        border: '4px solid rgb(176, 134, 200)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowX: 'hidden',
    },
}));

function UserPosts(props) {
    const user = useSelector(state => state.user);
    const writer = user.userData && user.userData._id;

    const [open, setOpen] = useState(false)
    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles();

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [postID, setPostID] = useState('');
    const [likes, setLikes] = useState('');

    useEffect(() => {

        let variable = {
            writer: localStorage.getItem('userId'),
        }
        
        axios.post('/api/post/getUserPosts', variable)
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.usersPosts);
                } else {
                    alert('Server Down! Please Visit Later!')
                }
            })
    }, [])

    let postId = '';

    const handleOpen = (id) => {
        setOpen(true);
        postId = id;
        setPostID(postId);

        let variable = {
            postId: postId
        }

        axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('Unable to fetch comment!');
                }
            })
    }

    const handleClose = () => {
        setOpen(false);
        setComments('');
    }

    const updateComments = (comment) => {
        setComments(comments.concat(comment));
    }



    let postIdForLike = '';

    const handleLike = (id) => {
        postIdForLike = id;
        console.log(postIdForLike);

        let variable = {
            postId: postIdForLike,
            writer: user.userData && user.userData._id,
        }

        axios.put('/api/post/postLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(likes + 1);
                } else {
                    alert('Cannot Like This Post!!');
                }
            })
    }

    const handleDislike = (id) => {
        postIdForLike = id;
        console.log(postIdForLike);

        let variable = {
            postId: postIdForLike,
            writer: user.userData && user.userData._id,
        }

        axios.put('/api/post/deleteLike', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(likes - 1);
                } else {
                    alert('Cannot Like This Post!!');
                }
            })
    }

    let postIdForVisit = '';

    const savePostId = (id) => {
        postIdForVisit = id;
        window.localStorage.setItem('postId', postIdForVisit);
    }

    const renderUsersPosts = 
        posts.map((post, index) => (
            <div key={index} className='post'>
                <div className='post__header'>
                    <Avatar className='post__profilePic' src={post.writer.image} alt={post.writer.username} onClick={() => {savePostId(post.writer._id)}} />
                    <h4 onClick={() => {savePostId(post.writer._id)}}>{post.writer.firstName + ' ' + post.writer.lastName}</h4>
                    <span onClick={() => {savePostId(post.writer._id)}}>· @{post.writer.username}</span>
                    <span>· {moment(post.createdAt).format('MMM Do YY')}</span>
                    {user.userData && user.userData._id === post.writer._id &&
                        <DeleteIcon className='post__delete' />
                    }
                </div>
                <Link to={`/scream/${post._id}`}>
                    <div className='post__caption'>
                        <p>{post.caption}</p>
                    </div>
                </Link>

                {post.images[0] &&
                    <Carousel autoplay={false} className='post__image'>
                        {post.images.map((image, index) => (
                            <Link key={index} to={`/scream/${post._id}`}>
                                <img className='post__img' src={`http://localhost:5000/${image}`} alt='images' />
                            </Link>
                        ))}
                    </Carousel>
                }

                {post.video &&
                    <Link to={`/scream/${post._id}`}>
                        <video className='post__img' controls src={`http://localhost:5000/${post.video}`} alt='videos' />
                    </Link>
                }
                <div className='post__reaction'>
                    <div className='post__reactionBtns'>
                        {!post.likes.includes(writer) ?
                            (
                                <IconButton className='post__reactionBtn' onClick={() => { handleLike(post._id) }}>
                                    <FavoriteBorderRoundedIcon fontSize='small' />
                                </IconButton>
                            ) : (
                                <IconButton className='post__reactionBtn' onClick={() => { handleDislike(post._id) }}>
                                    <FavoriteIcon fontSize='small' />
                                </IconButton>
                            )
                        }
                    </div>
                    <div className='post__reactionBtns'>
                        <Modal open={open} onClose={handleClose}>
                            {comments ? (
                                <div style={modalStyle} className={classes.paper}>
                                    <CommentsModal
                                        refreshFunction={updateComments}
                                        comments={comments}
                                        postId={postID}
                                    />
                                </div>
                            ) : (
                                    <div style={modalStyle} className={classes.paper}>
                                        Loading.....
                                    </div>
                                )
                            }
                        </Modal>
                        <IconButton className='post__reactionBtn' onClick={() => { handleOpen(post._id) }}>
                            <AddCommentIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <div className='post__reactionBtns'>
                        <IconButton className='post__reactionBtn' >
                            <PollIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <div className='post__reactionBtns'>
                        <IconButton className='post__reactionBtn' >
                            <SendIcon fontSize='small' />
                        </IconButton>
                    </div>
                </div>
            </div>
        ))
    



    return (
        <div className='posts'>
            {renderUsersPosts}
        </div>
    )
}

export default UserPosts

