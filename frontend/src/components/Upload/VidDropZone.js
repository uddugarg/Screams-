import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import MovieIcon from '@material-ui/icons/Movie';
import ImageIcon from '@material-ui/icons/Image';
import './Upload.css';

function VidDropZone({ video, setVideo, thumbnail, setThumbnail, duration, setDuration }) {

    const handleDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files);
        formData.append('file', files[0]);

        axios.post('/api/post/uploadVideo', formData, config)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.videoFilePath);

                    let variable = {
                        filePath: response.data.videoFilePath
                    }
                    axios.post('/api/post/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setThumbnail(response.data.thumbsFilePath);
                                setDuration(response.data.thumbsFileDuration);
                            } else {
                                alert('Failed to upload video!');
                            }
                        })
                } else {
                    alert('Failed to upload!');
                }
            })
    }

    return (
        <div>
            <Dropzone onDrop={handleDrop}
                multiple={false}
                maxSize={80000000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="container">
                        <div
                            {...getRootProps({
                                className: 'dropzone',
                                onDrop: event => event.stopPropagation()
                            })}
                        >
                            <input name='file' {...getInputProps()} />
                            <MovieIcon />
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default VidDropZone
