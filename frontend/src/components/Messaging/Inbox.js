import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Divider, IconButton, TextField } from '@material-ui/core';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CallIcon from '@material-ui/icons/Call';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SendIcon from '@material-ui/icons/Send';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './Messaging.css';

function Inbox(props) {

    const [sender, setSender] = useState('');
    const [message, setMessage] = useState('');
    const [userMessages, setUserMessages] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [messages, setMessages] = useState([]);

    const contactId = props.match.params.userId;
    localStorage.setItem('postId', contactId);


    useEffect(() => {

        let senderVariable = {
            writer: contactId,
        }

        axios.post('/api/user/getUser', senderVariable)
            .then(response => {
                if (response.data.success) {
                    setSender(response.data.userDetails);
                } else {
                    alert('Cannot Get The User Deatils');
                }
            })

    }, [])

    const handleBack = () => {
        props.history.goBack();
    }

    const variable = {
        writer: localStorage.getItem('userId'),
        message: message,
        contactId: contactId
    }

    const allMessages = userMessages.concat(contactMessages);

    useEffect(() => {
        axios.post('/api/message/getUserMessages', variable)
            .then(response => {
                if (response.data.success) {
                    setUserMessages([...allMessages, ...response.data.messages]);
                } else {
                    alert('Cannot get messages');
                }
            })
        axios.post('/api/message/getContactMessages', variable)
            .then(response => {
                if (response.data.success) {
                    setContactMessages([...allMessages, ...response.data.messages]);
                } else {
                    alert('Cannot get messages');
                }
            })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/message/postMessage', variable)
            .then(response => {
                if (response.data.success) {
                    setMessage('');
                    setUserMessages([...allMessages, response.data.doc]);
                } else {
                    alert('Cannot Send Message!');
                }
            })

    }

    return (
        <div>

            <Header />
            <Sidebar />

            <div className='inbox__box'>
                <div className='inbox__header'>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosIcon fontSize='small' />
                    </IconButton>
                    <Avatar src={sender.image} alt='user' />
                    <p>{sender.firstName + ' ' + sender.lastName}</p>
                    <IconButton className='inbox__headerBtn'>
                        <CallIcon fontSize='small' />
                    </IconButton>
                    <Link to={`/profile/${localStorage.getItem('postId')}`}>
                        <IconButton>
                            <InfoOutlinedIcon fontSize='small' />
                        </IconButton>
                    </Link>
                </div>

                <div className='inbox__messages'>
                    {allMessages.map((msg, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={msg.writer._id === localStorage.getItem('userId') ? 'inbox__message right' : 'inbox__message'}
                            >
                                {msg.writer._id !== localStorage.getItem('userId') && 
                                    <Avatar className='inbox__avatar' src={msg.writer.image} alt='name' />
                                }
                                <p className='inbox__msg'>{msg.message}</p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className='inbox__field'>
                    <IconButton>
                        <PhotoCameraIcon fontSize='small' />
                    </IconButton>
                    <TextField className='inbox__textField' type='text' variant='outlined' placeholder='Message....' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <IconButton>
                        <SendIcon fontSize='small' onClick={handleSubmit} />
                    </IconButton>
                </form>
            </div>

        </div>
    )
}

export default Inbox
