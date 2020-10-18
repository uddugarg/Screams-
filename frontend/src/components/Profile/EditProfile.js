import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { TextField, Button, Avatar } from '@material-ui/core';
import './Profile.css';

function EditProfile() {


    const [userDetails, setUserDetails] = useState('');
    const [bio, setBio] = useState('')
    const [site, setSite] = useState('')

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
    }, [])

    return (
        <div className='update'>

            <Header />

            <div className='update__profile'>
                <Avatar className='update__pic' src={userDetails.image} alt={userDetails.firstName} />
                <a href className='update__edit'>Change Profile</a>
                <div className='update__name'>
                    <TextField className='update__field' variant='filled' label={userDetails.firstName} disabled />
                    <TextField className='update__field' variant='filled' label={userDetails.lastName} disabled />
                </div>
                <TextField className='update__field' variant='filled' type='text' label={userDetails.username} disabled />
                <TextField className='update__field' variant='filled' type='text' label='Bio' placeholder={userDetails.bio} value={bio} onChange={(e) => setBio(e.target.value)} />
                <TextField className='update__field' variant='filled' type='email' label={userDetails.email} disabled />
                <TextField className='update__field' variant='filled' type='text' label={userDetails.phNumber} disabled />
                <TextField className='update__field' variant='filled' type='text' label='Website' placeholder={userDetails.website} value={site} onChange={(e) => setSite(e.target.value)} />
                <Button className='update__btn' variant='contained' type='submit'>Update</Button>
            </div>
        </div>
    )
}

export default EditProfile
