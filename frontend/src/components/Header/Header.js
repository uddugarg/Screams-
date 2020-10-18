import React from 'react';
import axios from 'axios';
import screamLogo64x from '../../images/screamLogo64x.png'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import ChatIcon from '@material-ui/icons/Chat'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';



function Header(props) {

    const user = useSelector(state => state.user);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <IconButton>
                    <NotificationsActiveIcon className='header__navigationIcon' />
                </IconButton>
                <Link to={`/messenger`}>
                    <IconButton>
                        <ChatIcon className='header__navigationIcon' />
                    </IconButton>
                </Link>
            </div>

            <div>
                <Button className='header__logBtn' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{user.userData && user.userData.username}</Button>

                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <Link to={`/manage/profile/${user.userData && user.userData.username}`}>
                        <MenuItem onClick={handleClose}>Manage Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={handleClose}>Setting</MenuItem>
                    <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default withRouter(Header)
