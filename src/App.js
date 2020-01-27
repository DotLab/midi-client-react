import React from 'react';
import PropsRoute from './PropsRoute';
import axios from 'axios';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import ArtistHomepage from './components/ArtistHomepage';
import TrackDetailPage from './components/TrackDetailPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

import {Switch} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS, LIKES, FOLLOWING, FOLLOWER, PROFILE, ACCOUNT, SECURITY, TRACK, SINGLE} from './components/utils';
import AlbumDetailPage from './components/AlbumDetailPage';
import UploadPage from './components/UploadPage';
import LibraryPage from './components/LibraryPage';
import EditPage from './components/EditPage';
import SettingPage from './components/SettingPage';
import ArtistMeta from './components/ArtistMeta';

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

  async uploadTracks({token, buffers, fileNames, fileSizes, coverUrl, title, albumTitle, type, genre, tags, description}) {
    const res = await this.genericApi1('/v1/tracks/upload', {token, buffers, fileNames, fileSizes, coverUrl, title, albumTitle, type, genre, tags, description});
    if (type === SINGLE) {
      this.history.push(`/${this.state.user.userName}/${res.payload}`);
    } else {
      this.history.push(`/${this.state.user.userName}/album/${res.payload}`);
    }
  }

  async editTracks({token, trackId, coverUrl, title, type, genre, tags, description}) {
    await this.genericApi1('/v1/tracks/edit', {token, trackId, coverUrl, title, type, genre, tags, description});
    if (type === TRACK) {
      this.history.push(`/${this.state.user.userName}/${trackId}`);
    } else {
      this.history.push(`/${this.state.user.userName}/album/${trackId}`);
    }
  }

  async trackDetail({trackId}) {
    const res = await this.genericApi1('/v1/tracks/detail', {trackId});
    console.log(res);
    return res.payload;
  }

  async artistInfo({artistId, artistName}) {
    const res = await this.genericApi1('/v1/users/artist-info', {artistId, artistName});
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

  async likeTrack({token, trackId}) {
    await this.genericApi1('/v1/tracks/like', {token, trackId});
  }

  async unlikeTrack({token, trackId}) {
    await this.genericApi1('/v1/tracks/unlike', {token, trackId});
  }

  async trackLikeCount({trackId}) {
    const res = await this.genericApi1('/v1/tracks/like-count', {trackId});
    return res.payload;
  }

  async trackLikeStatus({token, trackId}) {
    const res = await this.genericApi1('/v1/tracks/like-status', {token, trackId});
    return res.payload;
  }

  async deleteTrack({token, trackId}) {
    await this.genericApi1('/v1/tracks/delete', {token, trackId});
  }

  async newReleases({limit}) {
    const res = await this.genericApi1('/v1/tracks/new-releases', {limit});
    return res.payload;
  }

  async trending({limit}) {
    const res = await this.genericApi1('/v1/tracks/trending', {limit});
    return res.payload;
  }

  async favored({token}) {
    const res = await this.genericApi1('/v1/tracks/favored', {token});
    return res.payload;
  }

  async all({artistName}) {
    const res = await this.genericApi1('/v1/users/all-midi', {artistName});
    return res.payload;
  }

  async popularTracks({artistName, limit}) {
    const res = await this.genericApi1('/v1/users/popular-tracks', {artistName, limit});
    return res.payload;
  }

  async tracks({artistName}) {
    const res = await this.genericApi1('/v1/users/tracks', {artistName});
    return res.payload;
  }

  async albums({artistName}) {
    const res = await this.genericApi1('/v1/users/albums', {artistName});
    return res.payload;
  }

  async followArtist({token, artistName}) {
    await this.genericApi1('/v1/users/follow', {token, artistName});
  }

  async unfollowArtist({token, artistName}) {
    await this.genericApi1('/v1/users/unfollow', {token, artistName});
  }

  async followingStatus({token, artistName}) {
    const res = await this.genericApi1('/v1/users/follow-status', {token, artistName});
    return res.payload;
  }

  async followerCount({token, artistName}) {
    const res = await this.genericApi1('/v1/users/follower-count', {token, artistName});
    return res.payload;
  }

  async likedTracks({token}) {
    const res = await this.genericApi1('/v1/users/liked-tracks', {token});
    return res.payload;
  }

  async likedAlbums({token}) {
    const res = await this.genericApi1('/v1/users/liked-albums', {token});
    return res.payload;
  }

  async followerArtists({token}) {
    const res = await this.genericApi1('/v1/users/follower-artists', {token});
    return res.payload;
  }

  async followingArtists({token}) {
    const res = await this.genericApi1('/v1/users/following-artists', {token});
    return res.payload;
  }

  async uploadAvatar({token, buffer}) {
    const res = await this.genericApi1('/v1/users/avatar', {token, buffer});
    return res.payload;
  }

  async updateProfile({displayName, overview, token}) {
    await this.genericApi1('/v1/users/profile/update', {displayName, overview, token});
  }

  async userInfo({token}) {
    const res = await this.genericApi1('/v1/users/info', {token});
    return res.payload;
  }

  async getAllAlbums({token}) {
    const res = await this.genericApi1('/v1/albums/listing', {token});
    return res.payload;
  }

  async albumDetail({albumId}) {
    const res = await this.genericApi1('/v1/albums/detail', {albumId});
    return res.payload;
  }

  async albumTracks({albumId}) {
    const res = await this.genericApi1('/v1/albums/tracks', {albumId});
    return res.payload;
  }

  async relatedAlbums({albumId}) {
    const res = await this.genericApi1('/v1/albums/related', {albumId});
    return res.payload;
  }

  async getCoverUrl({title}) {
    const res = await this.genericApi1('/v1/albums/coverUrl', {title});
    return res.payload;
  }

  render() {
    return <div>
      <PropsRoute path="/" component={Navbar} app={this}/>
      <Switch>
        <PropsRoute exact path="/" component={Homepage} app={this}/>

        <PropsRoute exact path="/:userName/all" component={ArtistHomepage} tab={ALL} app={this}/>
        <PropsRoute exact path="/:userName/popular" component={ArtistHomepage} tab={POPULAR} app={this}/>
        <PropsRoute exact path="/:userName/tracks" component={ArtistHomepage} tab={TRACKS} app={this}/>
        <PropsRoute exact path="/:userName/albums" component={ArtistHomepage} tab={ALBUMS} app={this}/>
        <PropsRoute exact path="/:userName/following" component={ArtistMeta} tab={FOLLOWING} app={this}/>
        <PropsRoute exact path="/:userName/follower" component={ArtistMeta} tab={FOLLOWER} app={this}/>

        <PropsRoute exact path="/you/library/likes" component={LibraryPage} tab={LIKES} app={this}/>
        <PropsRoute exact path="/you/library/albums" component={LibraryPage} tab={ALBUMS} app={this}/>
        <PropsRoute exact path="/you/library/following" component={LibraryPage} tab={FOLLOWING} app={this}/>
        <PropsRoute exact path="/you/library/follower" component={LibraryPage} tab={FOLLOWER} app={this}/>
        <PropsRoute exact path="/settings/profile" component={SettingPage} app={this} tab={PROFILE}/>
        <PropsRoute exact path="/settings/account" component={SettingPage} app={this} tab={ACCOUNT}/>
        <PropsRoute exact path="/settings/security" component={SettingPage} app={this} tab={SECURITY}/>

        <PropsRoute exact path="/:userName/:trackId" component={TrackDetailPage} app={this}/>
        <PropsRoute exact path="/:userName/:trackId/edit" component={EditPage} type={TRACKS} app={this}/>
        <PropsRoute exact path="/:userName/album/:albumId" component={AlbumDetailPage} app={this}/>
        <PropsRoute exact path="/register" component={RegisterPage} app={this}/>
        <PropsRoute exact path="/login" component={LoginPage} app={this}/>
        <PropsRoute exact path="/upload" component={UploadPage} app={this}/>
        <PropsRoute exact path="/album/edit" component={EditPage} type={ALBUMS} app={this}/>

      </Switch>
    </div>;
  }
}
