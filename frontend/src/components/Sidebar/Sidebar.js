import React from 'react'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {

    const user = useSelector(state => state.user);

    return (
        <div className='sidebar'>
            <Link to='/home'>
                <div className='sidebar__item'>
                    <HomeOutlinedIcon className='sidebar__icon' fontSize='large' />
                    <h1 className='sidebar__itemName'>Home</h1>
                </div>
            </Link>
            <Link to='/trending'>
                <div className='sidebar__item'>
                    <SpeakerGroupIcon className='sidebar__icon' fontSize='large' />
                    <h1 className='sidebar__itemName'>Trending</h1>
                </div>
            </Link>
            <div className='sidebar__item'>
                <MailOutlineIcon className='sidebar__icon' fontSize='large' />
                <h1 className='sidebar__itemName'>Messages</h1>
            </div>
            <div className='sidebar__item'>
                <BookmarksOutlinedIcon className='sidebar__icon' fontSize='large' />
                <h1 className='sidebar__itemName'>Saved</h1>
            </div>
            <Link to={`/manage/profile/${user.userData && user.userData.username}`}>
                <div className='sidebar__item'>
                    <PersonOutlineRoundedIcon className='sidebar__icon' fontSize='large' />
                    <h1 className='sidebar__itemName'>Profile</h1>
                </div>
            </Link>
            <div className='sidebar__item'>
                <MoreHorizIcon className='sidebar__icon' fontSize='large' />
                <h1 className='sidebar__itemName'>More</h1>
            </div>
        </div>
    )
}

export default Sidebar
