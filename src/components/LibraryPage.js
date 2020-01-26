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
      likedTracks: [],
      likedAlbums: [],
      followingArtists: [],
      followerArtists: [],
    };
  }

  async componentDidMount() {
    if (this.app.state.user) {
      const likedTracks = await this.app.likedTracks({token: this.app.state.token});
      const likedAlbums = await this.app.likedAlbums({token: this.app.state.token});
      const followerArtists = await this.app.followerArtists({token: this.app.state.token});
      const followingArtists = await this.app.followingArtists({token: this.app.state.token});
      this.setState({likedTracks, likedAlbums, followerArtists, followingArtists});
    }
  }

  render() {
    const {tab} = this.props;
    const {likedTracks, likedAlbums, followingArtists, followerArtists} = this.state;

    return <div class="W(80%) Mx(a) My(40px)">

      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to="/you/library/likes" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === LIKES ? 'C($pink) Bdbs(s)' : 'C(gray)')}><i class="Mend(4px) Fz(16px) fas fa-heart"></i> Tracks</Link>
        <Link to="/you/library/albums" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C($pink) Bdbs(s)' : 'C(gray)')}><i class="Mend(4px) Fz(16px) fas fa-heart"></i> Albums</Link>
        <Link to="/you/library/following" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWING ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Following</Link>
        <Link to="/you/library/follower" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWER ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Follower</Link>
      </div>
      <div class="D(f)">
        {tab === LIKES && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear the tracks you've liked</div>
          {likedTracks.map((track) => <LibraryTrack key={track._id} id={track._id} title={track.title}
            artistName={track.artistName} coverUrl={track.coverUrl} />)}

        </div>}

        {tab === ALBUMS && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear the albums you've liked</div>
          {likedAlbums.map((track) => <LibraryTrack key={track._id} id={track._id} title={track.title}
            artistName={track.artistName} coverUrl={track.coverUrl} />)}
        </div>}

        {tab === FOLLOWING && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">Hear what the people you follow have posted</div>
          {followingArtists.map((artist) => <FollowingArtist key={artist._id} id={artist._id} avatarUrl={artist.avatarUrl}
            artistName={artist.userName} />)}
        </div>}

        {tab === FOLLOWER && <div class="Pt(40px) Miw(700px) Pend(20px)">
          <div class="Mb(20px) C(#999999)">See your followers</div>
          {followerArtists.map((artist) => <FollowingArtist key={artist._id} id={artist._id} avatarUrl={artist.avatarUrl}
            artistName={artist.userName} />)}
        </div>}
      </div>

    </div>;
  }
}
