import React, { Suspense } from 'react';
import Auth from './hoc/auth';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import PostDetails from './components/Post/PostDetails';
import Trending from './components/Post/Trending';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import ProfileVisit from './components/Profile/ProfileVisit';
import Inbox from './components/Messaging/Inbox';
import MessagingContacts from './components/Messaging/MessagingContacts';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="App">
        <Switch>
          <Route path='/inbox/:userId' component={Auth(Inbox, true)} />
          <Route exact path='/messenger' component={Auth(MessagingContacts, true)} />
          <Route path='/profile/:postId' component={Auth(ProfileVisit, true)} />
          <Route path='/manage/:username/updateProfile' component={Auth(EditProfile, true)} />
          <Route path='/manage/profile/:username' component={Auth(Profile, true)} />
          <Route path='/scream/:postId' component={Auth(PostDetails, true)} />
          <Route path='/trending' component={Auth(Trending, true)} />
          <Route path='/home' component={Auth(Home, true)} />
          <Route exact path='/' component={Auth(Login, false)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
