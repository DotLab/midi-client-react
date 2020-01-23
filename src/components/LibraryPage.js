import React from 'react';
import {Link} from 'react-router-dom';
import {ALBUMS, LIKES, FOLLOWING, FOLLOWER} from './utils';
import LibraryTrack from './LibraryTrack';
import FollowingArtist from './FollowingArtist';

export default class LibraryPage extends React.Component {
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

      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to="/library/likes" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === LIKES ? 'C($pink) Bdbs(s)' : 'C(gray)')}><i class="Mend(4px) Fz(16px) fas fa-heart"></i> Tracks</Link>
        <Link to="/library/albums" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C($pink) Bdbs(s)' : 'C(gray)')}><i class="Mend(4px) Fz(16px) fas fa-heart"></i> Albums</Link>
        <Link to="/library/following" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWING ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Following</Link>
        <Link to="/library/follower" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWER ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Follower</Link>
      </div>
      <div class="D(f)">
        {tab === LIKES && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear the tracks you've liked</div>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
        </div>}

        {tab === ALBUMS && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear the albums you've liked</div>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
          <LibraryTrack/>
        </div>}

        {tab === FOLLOWING && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear what the people you follow have posted</div>
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
          <FollowingArtist/>
        </div>}

        {tab === FOLLOWER && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">See your followers</div>
          <FollowingArtist/>
        </div>}


      </div>

    </div>;
  }
}
