import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import './Post.css';

function Follow(props) {

    const user = useSelector(state => state.user);

    const [followers, setFollowers] = useState(0);
    const [followed, setFollowed] = useState(false);

    const handleSubscribe = () => {
        let variable = {
            following: props.following,
            follower: user.userData._id
        }

        if (followed === true) {
            axios.post('/api/follow/unfollow', variable)
                .then(response => {
                    if (response.data.success) {
                        setFollowers(followers - 1);
                        setFollowed(false);
                    } else {
                        alert('Unable to Unfollow');
                    }
                })
        } else {
            axios.post('/api/follow/follow', variable)
                .then(response => {
                    if (response.data.success) {
                        setFollowers(followers + 1);
                        setFollowed(true);
                    } else {
                        alert('User Cannot be followed!!');
                    }
                })
        }
    }


    useEffect(() => {

        const variable = {
            following: props.following,
            follower: user.userData._id
        }

        axios.post('/api/follow/followers', variable)
            .then(response => {
                if (response.data.success) {
                    setFollowers(response.data.followers.length);
                } else {
                    alert('Cannot get Followers');
                }
            })

        axios.post('/api/follow/followed', variable)
            .then(response => {
                if (response.data.success) {
                    if (response.data.followed.length !== 0) {
                        setFollowed(true);
                    }
                } else {
                    alert('Cannot Get Info!!');
                }
            })

    }, [])


    if (user.userData._id !== props.following) {
        return (
            <div className='postDetail__flwBtn'>
                <Button className={followed === true ? 'flw' : ''}
                    variant='outlined'
                    type='submit'
                    onClick={handleSubscribe}>
                    {followers} {followed === true ? 'Followed' : 'Follow'}
                </Button>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Follow
