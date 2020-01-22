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
import {ALL, POPULAR, TRACKS, ALBUMS} from './components/utils';
import AlbumDetailPage from './components/AlbumDetailPage';
import UploadPage from './components/UploadPage';

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

      </Switch>
    </div>;
  }
}
