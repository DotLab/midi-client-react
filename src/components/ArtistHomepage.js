import React from 'react';
import ReactMarkdown from 'react-markdown';
import Track from './Track';
import Album from './Album';
import {Link} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS, DEFAULT_LIMIT} from './utils';

export default class ArtistHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      artistId: null,
      artistName: this.props.match.params.userName,
      avatarUrl: null,
      followingCount: 0,
      followerCount: 0,
      overview: '',
      bio: '',
      trackCount: 0,

      following: false,
      all: [],
      popularTracks: [],
      tracks: [],
      albums: [],
    };

    this.trackCommentList = this.trackCommentList.bind(this);
    this.getSignedUrl = this.getSignedUrl.bind(this);
    this.trackLikeStatus = this.trackLikeStatus.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  async componentDidMount() {
    const artist = await this.app.artistInfo({artistName: this.props.match.params.userName});
    this.setState(artist);

    const all = await this.app.all({artistName: this.props.match.params.userName});
    const popularTracks = await this.app.popularTracks({artistName: this.props.match.params.userName, limit: DEFAULT_LIMIT});
    const tracks = await this.app.tracks({artistName: this.props.match.params.userName});
    const albums = await this.app.albums({artistName: this.props.match.params.userName});

    let following = false;
    if (this.app.state.user) {
      following = await this.app.followingStatus({token: this.app.state.token, artistName: this.props.match.params.userName});
      console.log(following);
    }
    this.setState({all, popularTracks, tracks, albums, following});
  }

  async trackCommentList({trackId}) {
    return await this.app.trackCommentList({token: this.app.state.token, trackId, limit: DEFAULT_LIMIT});
  }

  async getSignedUrl({trackId}) {
    return await this.app.getSignedUrl({trackId});
  }

  async trackLikeStatus({trackId}) {
    return await this.app.trackLikeStatus({token: this.app.state.token, trackId});
  }

  async follow(e) {
    e.preventDefault();
    await this.app.followArtist({token: this.app.state.token, artistName: this.state.artistName});
    this.setState({following: true});
    const counts = await this.app.followerCount({artistName: this.state.artistName});
    this.setState(counts);
  }

  async unfollow(e) {
    e.preventDefault();
    await this.app.unfollowArtist({token: this.app.state.token, artistName: this.state.artistName});
    this.setState({following: false});
    const counts = await this.app.followerCount({artistName: this.state.artistName});
    this.setState(counts);
  }

  render() {
    const {tab} = this.props;
    const {following, artistName, avatarUrl, bio, overview,
      followingCount, followerCount, trackCount, all, popularTracks, tracks, albums} = this.state;
    const isOwner = this.app.state.user && (this.app.state.user.userName === artistName);

    console.log(followerCount, followingCount);

    return <div class="W(80%) Mx(a)">
      <div class="Py(20px)">
        <div class="Pos(r) D(f) Fxd(c) Fl(start) W(100%) Py(20px)">
          {!avatarUrl && <div class="W(300px) H(300px) Op(0.5)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
          {avatarUrl && <img class="W(300px) H(300px) Op(0.5)" src={avatarUrl} alt="avatar"/>}

          <div class="Pos(a) Pt(120px)">
            <div class="Fz(50px) Px(20px) Fw(b) C(#999)">{artistName}</div>
            <div class="My(20px)">
              <button class="Bdc(t) Bdrs(4px) Bgc(#6c757d) C(white) C(white):h W(90px) Px(20px) Mx(20px)">Play</button>
              {!following && <button onClick={this.follow} class="Bgc($pink) Bdc(t) C(white) Bdrs(4px) W(90px) Px(20px) Mx(20px)">Follow</button>}
              {following && <button onClick={this.unfollow} class="btn btn-outline-secondary Bgc(b) Bdrs(4px) Bdc($pink) Bgc($pink):h Bdc($pink):h C(white) C(white):h Px(20px) Py(2px) Mx(20px)">Unfollow</button>}
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to={{pathname: `/${artistName}/all`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALL ? 'C($pink) Bdbs(s)' : 'C(gray)')}>All</Link>
        <Link to={{pathname: `/${artistName}/popular`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === POPULAR ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Popular tracks</Link>
        <Link to={{pathname: `/${artistName}/tracks`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Tracks</Link>
        <Link to={{pathname: `/${artistName}/albums`}} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Albums</Link>
      </div>
      <div class="D(f)">
        {tab === ALL && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <div class="Fz(22px) Mb(20px)">Recent</div>
          {all.map((track) => <Track key={track._id} id={track._id} coverUrl={track.coverUrl} artistName={track.artistName}
            title={track.title} releaseDate={track.releaseDate} trackUrl={track.trackUrl}
            trackLikeStatus={this.trackLikeStatus} trackCommentList={this.trackCommentList}
            getSignedUrl={this.getSignedUrl} user={this.app.state.user} isOwner={isOwner}/>)}
        </div>}

        {tab === POPULAR && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          {popularTracks.map((track) => <Track key={track._id} id={track._id} coverUrl={track.coverUrl} artistName={track.artistName}
            title={track.title} releaseDate={track.releaseDate} trackUrl={track.trackUrl}
            trackLikeStatus={this.trackLikeStatus} trackCommentList={this.trackCommentList}
            getSignedUrl={this.getSignedUrl} user={this.app.state.user} isOwner={isOwner}/>)}
        </div>}

        {tab === TRACKS && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          {tracks.map((track) => <Track key={track._id} id={track._id} coverUrl={track.coverUrl} artistName={track.artistName}
            title={track.title} releaseDate={track.releaseDate} trackUrl={track.trackUrl}
            trackLikeStatus={this.trackLikeStatus} trackCommentList={this.trackCommentList}
            getSignedUrl={this.getSignedUrl} user={this.app.state.user} isOwner={isOwner}/>)}
        </div>}

        {tab === ALBUMS && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <Album/>
          <Album/>

        </div>}

        <div class="P(20px) Miw(320px) Maw(400px)">
          <span class="D(ib) C(#999999) Pend(10px)">
            <div class="Fz(14px)">Followers</div>
            <div class="Fz(20px)">{followerCount}</div>
          </span>
          <span class="D(ib) C(#999999) Px(20px) Bdstarts(s) Bdstartw(1px) Bdstartc(#f2f2f2) Bdends(s) Bdendw(1px) Bdendc(lightgray)">
            <div class="Fz(14px)">Followings</div>
            <div class="Fz(20px)">{followingCount}</div>
          </span>
          <span class="D(ib) C(#999999) Px(20px)">
            <div class="Fz(14px)">Tracks</div>
            <div class="Fz(20px)">{trackCount}</div>
          </span>
          <div class="My(20px) Fz(12px) Fw(600)"><ReactMarkdown skipHtml={true} source={overview}/></div>
        </div>
      </div>

    </div>;
  }
}
