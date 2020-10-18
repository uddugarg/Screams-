import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Avatar, Button, Divider, makeStyles, Modal } from '@material-ui/core';
import './Profile.css';
import { useSelector } from 'react-redux';
import VisitorPosts from './VisitorPosts';

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

function ProfileVisit() {

    const user = useSelector(state => state.user);

    const [openFollower, setOpenFollower] = useState(false)
    const [openFollowing, setOpenFollowing] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles();

    const [userDetails, setUserDetails] = useState('');
    const [followed, setFollowed] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [followingCount, setFollowingCount] = useState(0);
    const [following, setFollowing] = useState([]);
    const [postsCount, setPostsCount] = useState(0);
    const [posts, setPosts] = useState([]);

    const variable = {
        writer: localStorage.getItem('postId'),
    }

    useEffect(() => {

        axios.post('/api/user/getUser', variable)
            .then(response => {
                if (response.data.success) {
                    setUserDetails(response.data.userDetails);
                } else {
                    alert('Cannot Get The User Deatils');
                }
            })

        axios.post('/api/follow/userFollowers', variable)
            .then(response => {
                if (response.data.success) {
                    setFollowersCount(response.data.followers.length);
                    setFollowers(response.data.followers);
                } else {
                    alert('Cannot get Followers');
                }
            })

        axios.post('/api/follow/userFollowing', variable)
            .then(response => {
                if (response.data.success) {
                    setFollowingCount(response.data.following.length);
                    setFollowing(response.data.following);
                } else {
                    alert('Cannot get Followings');
                }
            })

        axios.post('/api/post/getUserPosts', variable)
            .then(response => {
                if (response.data.success) {
                    setPostsCount(response.data.usersPosts.length);
                } else {
                    alert('Server Down! Please Visit Later!');
                }
            })
    }, [])


    let followedVariable = {
        following: localStorage.getItem('postId'),
        follower: localStorage.getItem('userId'),
    }

    useEffect(() => {

        axios.post('/api/follow/followed', followedVariable)
            .then(response => {
                if (response.data.success) {
                    if (response.data.followed.length !== 0) {
                        setFollowed(true);
                    }
                } else {
                    alert('Cannot Get Info!!');
                }
            })
    })

    const handleSubscribe = () => {

        if (followed === true) {
            axios.post('/api/follow/unfollow', followedVariable)
                .then(response => {
                    if (response.data.success) {
                        setFollowersCount(followersCount - 1);
                        setFollowed(false);
                    } else {
                        alert('Unable to Unfollow');
                    }
                })
        } else {
            axios.post('/api/follow/follow', followedVariable)
                .then(response => {
                    if (response.data.success) {
                        setFollowersCount(followersCount + 1);
                        setFollowed(true);
                    } else {
                        alert('User Cannot be followed!!');
                    }
                })
        }
    }


    return (
        <div>
            <Header />

            <Sidebar />

            <div className='profile__panel'>
                <div className='profile__panelDetails'>
                    <div className='profile__flw'>
                        <Avatar className='profile__pic' src={userDetails.image} alt='dp' />
                        <Button className='flwrs' type='text'>{postsCount} Posts</Button>
                        <Modal open={openFollower} onClose={() => setOpenFollower(false)}>
                            <div style={modalStyle} className={classes.paper}>
                                <h3>Followers</h3>
                                {followers.map((follower, index) => (
                                    <div className='profile__followers' key={index}>
                                        <Avatar src={follower.follower.image} alt='user' />
                                        <h4>{follower.follower.firstName + ' ' + follower.follower.lastName}</h4>
                                        <Divider />
                                    </div>
                                ))}
                            </div>
                        </Modal>
                        <Button type='text' onClick={() => setOpenFollower(true)}>{followersCount} Followers</Button>

                        <Modal open={openFollowing} onClose={() => setOpenFollowing(false)}>
                            <div style={modalStyle} className={classes.paper}>
                                <h3>Following</h3>
                                {following.map((follow, index) => (
                                    <div className='profile__followers' key={index}>
                                        <Avatar src={follow.following.image} alt='user' />
                                        <h4>{follow.following.firstName + ' ' + follow.following.lastName}</h4>
                                        <Divider />
                                    </div>
                                ))}
                            </div>
                        </Modal>
                        <Button type='text' onClick={() => setOpenFollowing(true)}>{followingCount} Following</Button>
                    </div>
                    <div className='profile__flw'>
                        <h3>{userDetails.firstName} {userDetails.lastName}</h3>
                        {localStorage.getItem('userId') !== localStorage.getItem('postId') &&
                            <Button className={followed === true ? 'flw flwrs' : 'flwrs'}
                                variant='outlined'
                                type='submit'
                                onClick={handleSubscribe}>
                                {followed === true ? 'Followed' : 'Follow'}
                            </Button>
                        }
                    </div>
                    <h4 className='profile__username'>@{userDetails.username}</h4>
                    <h4 className='profile__bio'>{userDetails.bio}</h4>
                    <h4 className='profile__site'>{userDetails.website}</h4>
                </div>

                <div className='userPosts'>
                    <VisitorPosts />
                </div>
            </div>
        </div>
    )

}

export default ProfileVisit
