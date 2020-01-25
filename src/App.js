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
import {ALL, POPULAR, TRACKS, ALBUMS, LIKES, FOLLOWING, FOLLOWER, PROFILE, ACCOUNT, SECURITY} from './components/utils';
import AlbumDetailPage from './components/AlbumDetailPage';
import UploadPage from './components/UploadPage';
import LibraryPage from './components/LibraryPage';
import EditPage from './components/EditPage';
import SettingPage from './components/SettingPage';

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
          this.userLogin({email: 'alice@gmail.com', password: '123'});
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

  async uploadCover({token, buffer}) {
    console.log('here');
    const res = await this.genericApi1('/v1/tracks/cover', {token, buffer});
    return res.payload;
  }

  async uploadTracks({token, buffers, fileNames, fileSizes, coverUrl, title, type, genre, tags, description}) {
    const res = await this.genericApi1('/v1/tracks/upload', {token, buffers, fileNames, fileSizes, coverUrl, title, type, genre, tags, description});
    if (buffers.length === 1) {
      this.history.push(`/${this.state.user.userName}/${res.payload}`);
    } else {
      this.history.push(`/${this.state.user.userName}/album/${res.payload}`);
    }
  }

  async trackDetail({trackId}) {
    const res = await this.genericApi1('/v1/tracks/detail', {trackId});
    console.log(res);
    return res.payload;
  }

  async artistInfo({artistId}) {
    const res = await this.genericApi1('/v1/users/artist-info', {artistId});
    return res.payload;
  }

  async createComment({token, trackId, comment, timestamp}) {
    await this.genericApi1('/v1/tracks/comment/create', {token, trackId, comment, timestamp});
  }

  async deleteComment({token, commentId}) {
    await this.genericApi1('/v1/tracks/comment/delete', {token, commentId});
  }

  async trackCommentList({trackId, limit, token}) {
    const res = await this.genericApi1('/v1/tracks/comment-list', {trackId, limit, token});
    return res.payload;
  }

  async inAlbum({trackId}) {
    const res = await this.genericApi1('/v1/tracks/in-album', {trackId});
    return res.payload;
  }

  async relatedTracks({trackId}) {
    const res = await this.genericApi1('/v1/tracks/related-tracks', {trackId});
    return res.payload;
  }

  async getSignedUrl({trackId}) {
    const res = await this.genericApi1('/v1/tracks/signed-url', {trackId});
    console.log(res);
    return res.payload;
  }

  async downloadFile({trackId}) {
    await this.genericApi1('/v1/tracks/download', {trackId});
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
        <PropsRoute exact path="/:userName/:trackId" component={TrackDetailPage} app={this}/>
        <PropsRoute exact path="/:userName/album/:albumId" component={AlbumDetailPage} app={this}/>
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
        <PropsRoute exact path="/album/edit" component={EditPage} type={ALBUMS} app={this}/>
        <PropsRoute exact path="/track/edit" component={EditPage} type={TRACKS} app={this}/>
        <PropsRoute exact path="/settings/profile" component={SettingPage} app={this} tab={PROFILE}/>
        <PropsRoute exact path="/settings/account" component={SettingPage} app={this} tab={ACCOUNT}/>
        <PropsRoute exact path="/settings/security" component={SettingPage} app={this} tab={SECURITY}/>

      </Switch>
    </div>;
  }
}
