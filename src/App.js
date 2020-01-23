import React from 'react';
import PropsRoute from './PropsRoute';
import axios from 'axios';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import ArtistHomepage from './components/ArtistHomepage';
import TrackDetailPage from './components/TrackDetailPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

import {Switch} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS, LIKES, FOLLOWING, FOLLOWER} from './components/utils';
import AlbumDetailPage from './components/AlbumDetailPage';
import UploadPage from './components/UploadPage';
import LibraryPage from './components/LibraryPage';

const API_SUCCESS = 'SUCCESS';
const API_URL = 'http://localhost:3000';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.history = props.history;
    this.state = {
      user: null,
      token: localStorage.getItem('token'),
      error: null,
      currentUrl: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({token});
    }
  }

  genericApi1(event, arg) {
    return new Promise((resolve, reject) => {
      axios.post(API_URL + event, arg).then((response) => {
        if (response.data.status === API_SUCCESS) {
          resolve(response.data);
        } else {
          reject(response.data);
          this.userLogOut();
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }


  async userLogin({email, password}) {
    const res = await this.genericApi1('/v1/users/login', {email, password});
    const token = res.payload;

    localStorage.setItem('token', token);
    this.setState({token});
    this.userName({token});
    if (this.state.currentUrl) {
      this.history.push(this.state.currentUrl);
    } else {
      this.history.push('/');
      this.setState({currentUrl: null});
    }
  }

  saveUrl(currentUrl) {
    this.setState({currentUrl});
  }

  async userName({token}) {
    const res = await this.genericApi1('/v1/users/get-user', {token});
    this.setState({user: res.payload});
  }

  async userLogOut() {
    localStorage.removeItem('token');
    this.setState({token: null});
    this.history.push('/');
  }

  async userRegister({userName, email, displayName, password}) {
    await this.genericApi1('/v1/users/register', {email, userName, displayName, password});
    this.history.push('/login');
  }

  async userChangePassword({oldPassword, newPassword, token}) {
    await this.genericApi1('/v1/users/settings/changepassword', {token, oldPassword, newPassword});
    this.history.push('/login');
  }


  render() {
    return <div>
      <PropsRoute path="/" component={Navbar} app={this}/>
      <Switch>
        <PropsRoute exact path="/" component={Homepage} app={this}/>
        <PropsRoute exact path="/artist/all" component={ArtistHomepage} tab={ALL} app={this}/>
        <PropsRoute exact path="/artist/popular" component={ArtistHomepage} tab={POPULAR} app={this}/>
        <PropsRoute exact path="/artist/tracks" component={ArtistHomepage} tab={TRACKS} app={this}/>
        <PropsRoute exact path="/artist/albums" component={ArtistHomepage} tab={ALBUMS} app={this}/>
        <PropsRoute exact path="/detail" component={TrackDetailPage} app={this}/>
        <PropsRoute exact path="/album/detail" component={AlbumDetailPage} app={this}/>
        <PropsRoute exact path="/register" component={RegisterPage} app={this}/>
        <PropsRoute exact path="/login" component={LoginPage} app={this}/>
        <PropsRoute exact path="/upload" component={UploadPage} app={this}/>
        <PropsRoute exact path="/profile/all" component={ProfilePage} tab={ALL} app={this}/>
        <PropsRoute exact path="/profile/popular" component={ProfilePage} tab={POPULAR} app={this}/>
        <PropsRoute exact path="/profile/tracks" component={ProfilePage} tab={TRACKS} app={this}/>
        <PropsRoute exact path="/profile/albums" component={ProfilePage} tab={ALBUMS} app={this}/>
        <PropsRoute exact path="/profile/likes" component={ProfilePage} tab={LIKES} app={this}/>
        <PropsRoute exact path="/profile/following" component={ProfilePage} tab={FOLLOWING} app={this}/>
        <PropsRoute exact path="/library/likes" component={LibraryPage} tab={LIKES} app={this}/>
        <PropsRoute exact path="/library/albums" component={LibraryPage} tab={ALBUMS} app={this}/>
        <PropsRoute exact path="/library/following" component={LibraryPage} tab={FOLLOWING} app={this}/>
        <PropsRoute exact path="/library/follower" component={LibraryPage} tab={FOLLOWER} app={this}/>

      </Switch>
    </div>;
  }
}
