import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, MenuItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Notification.css';

function Notification() {

    const user = useSelector(state => state.user);

    const [notifications, setNotifications] = useState([]);

    const variable = {
        writer: user.userData && user.userData._id,
    }

    useEffect(() => {
        axios.post('/api/notify/getNotifications', variable)
            .then(response => {
                if (response.data.success) {
                    setNotifications(response.data.notifications);
                } else {
                    alert('Cannot get notifications!');
                }
            })
    })

    return (
        <div>
            <h3>Notifications</h3>
            {notifications.map((item, index) => (
                <Link to={`/scream/${item.postId}`}>
                    {item.writer._id !== item.postWriter &&
                        <MenuItem className='notify__item' key={index}>
                        {!item.comment &&
                            <p>
                                <span className='notify__username'>{item.writer.firstName + ' ' + item.writer.lastName}</span> Liked your post
                        </p>
                        }
                        {item.comment && !item.reply &&
                            <p>
                                <span className='notify__username'>{item.writer.firstName + ' ' + item.writer.lastName}</span> Commented on your post
                        </p>
                        }
                        {item.reply &&
                            <p>
                                <span className='notify__username'>{item.writer.firstName + ' ' + item.writer.lastName}</span> Replied on your post
                        </p>
                        }
                    </MenuItem>
                    }
                    <Divider />
                </Link>
    ))
}
        </div >
    )
}

export default Notification
