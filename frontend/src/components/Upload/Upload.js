import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TextField, IconButton, Button } from '@material-ui/core'
import GifIcon from '@material-ui/icons/Gif';
import EventIcon from '@material-ui/icons/Event';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import './Upload.css';
import ImgDropZone from './ImgDropZone';
import VidDropZone from './VidDropZone';

function Upload(props) {

    const user = useSelector(state => state.user);

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            caption: caption,
            images: image,
            video: video,
            thumbnail: thumbnail,
            duration: duration,
        }

        if (caption === '') {
            return alert('Fields are empty!!');
        }

        axios.post('/api/post/uploadPost', variable)
            .then(response => {
                if (response.data.success) {
                    alert('Posted Successfully');
                    setImage('');
                    setCaption('');
                    setThumbnail('');
                    window.location.reload();
                } else {
                    alert('Failed to upload post!');
                }
            })
    }

    return (
        <div className='upload'>
            <TextField className='upload__caption' variant='filled' label='Write A Caption' type='text' value={caption} onChange={(e) => setCaption(e.target.value)} />
            <div className='upload__btns'>
                <IconButton className='upload__btn' aria-label="upload picture" component="span">
                    <ImgDropZone image={image}
                        setImage={setImage}
                    />
                </IconButton>
                <IconButton className='upload__btn' aria-label="upload picture" component="span">
                    <VidDropZone
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                        video={video}
                        setVideo={setVideo}
                        duration={duration}
                        setDuration={setDuration}
                    />
                </IconButton>
                <IconButton className='upload__btn'>
                    <GifIcon />
                </IconButton>
                <IconButton className='upload__btn'>
                    <EventIcon />
                </IconButton>
                <IconButton className='upload__btn'>
                    <AddLocationOutlinedIcon />
                </IconButton>

                <Button className='upload__btnSubmit' variant='outlined' type='submit' onClick={handleSubmit}>Scream</Button>
            </div>

            {image !== [] &&
                <div className='upload__thumbnailContainer'>
                    {image && image.map((img, index) => (
                        <div className='upload__thumbnail'>
                            <img src={`http://localhost:5000/${img}`} alt={index} />
                        </div>
                    ))}
                </div>
            }

            {thumbnail !== '' &&
                <div className='upload__thumbnailContainer'>
                    <div className='upload__thumbnail'>
                        <img src={`http://localhost:5000/${thumbnail}`} alt='thumbs' />
                    </div>
                </div>
            }
        </div>
    )
}

export default Upload
