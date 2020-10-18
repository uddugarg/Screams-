import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import ImageIcon from '@material-ui/icons/Image';
import './Upload.css';

function ImgDropZone({ image, setImage }) {

    const handleDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files);
        formData.append('file', files[0]);

        axios.post('/api/post/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImage([...image, response.data.filePath]);
                } else {
                    alert('Failed to upload Image!');
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
                            <ImageIcon />
                        </div>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default ImgDropZone
