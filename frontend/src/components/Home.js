import React from 'react';
import Header from './Header/Header';
import Post from './Post/Post';
import Sidebar from './Sidebar/Sidebar';
import Upload from './Upload/Upload';

function Home(props) {
    return (
        <div>
            <Header />

            <Sidebar />

            <Upload />

            <Post />
        </div>
    )
}

export default Home
