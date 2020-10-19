import React, { useState } from 'react';
import axios from 'axios';
import screamLogo64x from '../../images/screamLogo64x.png'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import ChatIcon from '@material-ui/icons/Chat'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, IconButton } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import Notification from '../Notification/Notification';



function Header(props) {

    const user = useSelector(state => state.user);

    const [profileMenu, setProfileMenu] = useState(null);
    const [notif, setNotif] = useState(null)

    const handleClick = (event) => {
        setProfileMenu(event.currentTarget);
    };

    const handleClose = () => {
        setProfileMenu(null);
    };

    const handleOpenNotif = (event) => {
        setNotif(event.currentTarget);
    };

    const handleCloseNotif = () => {
        setNotif(null);
    };

    const handleLogout = () => {
        axios.get('/api/user/logout')
            .then(response => {
                if (response.status === 200) {
                    props.history.push('/');
                } else {
                    alert('Log Out Failed')
                }
            });
    }


    return (
        <div className='header'>
            <Link to='/home'>
                <div className='header__logo'>
                    <img src={screamLogo64x} alt='screams' />
                    <h2>Screams'</h2>
                </div>
            </Link>
            <div className='header__navigation'>
                <Link to='/home'>
                    <IconButton>
                        <HomeRoundedIcon className='header__navigationIcon' />
                    </IconButton>
                </Link>
                <IconButton aria-controls="notifications" aria-haspopup="true" onClick={handleOpenNotif}>
                    <NotificationsActiveIcon className='header__navigationIcon' />
                </IconButton>
                <Menu id="notifications" anchorEl={notif} keepMounted open={Boolean(notif)} onClose={handleCloseNotif}>
                    <Notification />
                </Menu>
                <Link to={`/messenger`}>
                    <IconButton>
                        <ChatIcon className='header__navigationIcon' />
                    </IconButton>
                </Link>
            </div>

            <div>
                <Button className='header__logBtn' aria-controls="profileMenu" aria-haspopup="true" onClick={handleClick}>{user.userData && user.userData.username}</Button>

                <Menu id="profileMenu" anchorEl={profileMenu} keepMounted open={Boolean(profileMenu)} onClose={handleClose}>
                    <Avatar className='header__avatar' src={user.userData && user.userData.image} alt='user' />
                    <Link to={`/manage/profile/${user.userData && user.userData.username}`}>
                        <MenuItem className='header__items' onClick={handleClose}>Manage Profile</MenuItem>
                    </Link>
                    <MenuItem className='header__items' onClick={handleClose}>Setting</MenuItem>
                    <MenuItem className='header__items' onClick={handleLogout}>LogOut</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(Header)
