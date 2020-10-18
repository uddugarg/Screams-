import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Divider } from '@material-ui/core';
import './Messaging.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';

function MessagingContacts() {

    const [contacts, setContacts] = useState([]);

    const variable = {
        writer: localStorage.getItem('userId'),
    }

    useEffect(() => {
        axios.post('/api/follow/userFollowing', variable)
            .then(response => {
                if (response.data.success) {
                    setContacts(response.data.following);
                } else {
                    alert('Cannot get Followings');
                }
            })
    })

    return (
        <div>

            <Header />
            <Sidebar />

            <div className='messenger'>

                <h2>Messenger</h2>

                {contacts.map((contact, index) => (
                    <Link to={`/inbox/${contact.following._id}`}>
                        <div className='messenger__people' key={index}>
                            <Avatar className='messenger__avatars' src={contact.following.image} alt='user' />
                            <h4>{contact.following.firstName + ' ' + contact.following.lastName}</h4>
                            <Divider />
                        </div>
                    </Link>
                ))}
            </div>

            <div className='messenger__box'>
                <h2>Start Screaming Personally!</h2>
            </div>

        </div>
    )
}

export default MessagingContacts
