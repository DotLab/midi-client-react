import React from 'react';
import {Link} from 'react-router-dom';
import {FOLLOWING, FOLLOWER} from './utils';
import FollowingArtist from './FollowingArtist';

export default class ArtistMeta extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      following: true,
    };
  }

  render() {
    const {tab} = this.props;

    return <div class="W(80%) Mx(a) My(40px)">
      <div class="D(f) Fl(start) W(100%) Py(20px)">
        <img class="W(100px) H(100px)" src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt="lisa"/>
        <div class="Mstart(20px) Fz(30px) Fw(600)">Lisa</div>
      </div>

      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to={{pathname: `/${this.props.match.params.userName}/following`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWING ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Following</Link>
        <Link to={{pathname: `/${this.props.match.params.userName}/follower`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWER ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Follower</Link>
      </div>
      <div class="D(f)">
        {tab === FOLLOWING && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
        </div>}

        {tab === FOLLOWER && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <FollowingArtist/>
        </div>}

      </div>

    </div>;
  }
}
