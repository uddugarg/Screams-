import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import UserPosts from './UserPosts';
import { Link } from 'react-router-dom';
import { Avatar, Button, Divider, makeStyles, Modal } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import './Profile.css';
import { useSelector } from 'react-redux';

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

function Profile() {

    const user = useSelector(state => state.user);

    const [openFollower, setOpenFollower] = useState(false)
    const [openFollowing, setOpenFollowing] = useState(false)
    const [modalStyle] = useState(getModalStyle)
    const classes = useStyles();

    const [userDetails, setUserDetails] = useState('');
    const [followersCount, setFollowersCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [followingCount, setFollowingCount] = useState(0);
    const [following, setFollowing] = useState([]);
    const [postsCount, setPostsCount] = useState(0);

    const variable = {
        writer: localStorage.getItem('userId'),
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
                    console.log(response.data.followers);
                    setFollowers(response.data.followers);
                } else {
                    alert('Cannot get Followers');
                }
            })

        axios.post('/api/follow/userFollowing', variable)
            .then(response => {
                if (response.data.success) {
                    setFollowingCount(response.data.following.length);
                    console.log(response.data.following);
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
                    <h3>{userDetails.firstName} {userDetails.lastName}</h3>
                    <h4 className='profile__username'>@{userDetails.username}</h4>
                    <h4 className='profile__bio'>{userDetails.bio}</h4>
                    <h4 className='profile__site'>{userDetails.website}</h4>
                    <Link to={`/manage/${user.userData && user.userData.username}/updateProfile`}>
                        <EditIcon className='profile__edit' fontSize='small' />
                    </Link>
                </div>

                <div className='userPosts'>
                    <UserPosts />
                </div>
            </div>
        </div>
    )

}

export default Profile
