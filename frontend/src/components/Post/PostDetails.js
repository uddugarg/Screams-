import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import CancelIcon from '@material-ui/icons/Cancel';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PollIcon from '@material-ui/icons/Poll';
import SendIcon from '@material-ui/icons/Send';
import screamLogo64x from '../../images/screamLogo64x.png'
import { Avatar, Button, Divider, IconButton, makeStyles, Modal } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import Comments from './Comments';
import './Post.css';
import CommentsModal from './CommentsModal';
import Post from './Post';
import Like from './Like';
import Follow from './Follow';
import { Link } from 'react-router-dom';

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
        objectFit: 'contain',
        width: '90%',
        backgroundColor: '#f9c5d1',
        backgroundImage: 'linear-gradient(315deg, #f9c5d1 0%, #9795ef 74%)',
        border: '4px solid rgb(176, 134, 200)',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function PostDetails(props) {

    const postId = props.match.params.postId;

    const [open, setOpen] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles();

    const [post, setPost] = useState('');
    const [comments, setComments] = useState([]);
    const [commentNum, setCommentNum] = useState('')

    const variable = {
        postId: postId,
    }

    useEffect(() => {
        axios.post('/api/post/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.post);
                } else {
                    alert('Unable to fetch post!');
                }
            })

        axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('Unable to fetch comments');
                }
            })
    }, [])

    const updateComments = (comment) => {
        setComments(comments.concat(comment));
    }

    const handleClose = () => {
        props.history.goBack();
    }

    const savePostId = () => {
        window.localStorage.setItem('postId', post.writer._id);
    }


    if (post.writer) {
        return (
            <div className='postDetail'>

                <div className='postDetail__left'>
                    <div className='postDetail__header'>
                        <CancelIcon className='postDetail__close' fontSize='large' onClick={handleClose} />
                        <img src={screamLogo64x} alt='screams' />
                        <AspectRatioIcon className='postDetail__max' fontSize='large' />
                    </div>
                    <div className='postDetail__image'>
                        {post.images[0] &&
                            <Carousel autoplay={false}>
                                {post.images.map(image => (
                                    <img className='postDetail__img' src={`http://localhost:5000/${image}`} alt='images' />
                                ))}
                            </Carousel>
                        }
                        {post.video &&
                            <video className='postDetail__img' controls src={`http://localhost:5000/${post.video}`} alt='videos' />
                        }
                    </div>
                </div>

                <div className='postDetail__right'>
                    <div className='postDetail__details'>
                        <section className='postDetail__user'>
                            <Link to={`/profile/${localStorage.getItem('postId')}`}>
                                <Avatar className='postDetail__userPic' src={post.writer.image} alt={post.writer.username} onClick={savePostId} />
                            </Link>
                            <h4 onClick={savePostId}>{post.writer.firstName + ' ' + post.writer.lastName}</h4>
                            <Follow following={post.writer._id} />
                        </section>
                        <section className='postDetail__userE'>
                            <span onClick={savePostId}>@{post.writer.username}</span>
                            <span> · {moment(post.createdAt).format('MMM Do YY')}</span>
                        </section>
                        <p className='postDetail__userCaption'>{post.caption}</p>
                        <div className='postDetail__reaction'>
                            <div className='post__reactionBtns'>
                                <Like post={post} postId={post._id} postWriter={post.writer._id} />
                            </div>
                            <div className='post__reactionBtns'>
                                <Modal open={open} onClose={() => setOpen(false)}>
                                    <div style={modalStyle} className={classes.paper}>
                                        <CommentsModal
                                            comments={comments}
                                            commentNum={commentNum}
                                            postId={postId}
                                            refreshFunction={updateComments}
                                            postWriter={post.writer._id}
                                        />
                                    </div>
                                </Modal>
                                <IconButton className='post__reactionBtn' onClick={() => setOpen(true)}>
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
                        <div className='post__reactionDetails'>
                            <span>{commentNum} Comments</span>
                        </div>
                        <Divider />
                        <div className='postDetail__comments'>
                            <Comments
                                comments={comments}
                                postId={postId}
                                refreshFunction={updateComments}
                                setCommentNum={setCommentNum}
                                postWriter={post.writer._id}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div>
                Loading....
            </div>
        )
    }
}

export default PostDetails
