import React from 'react';
import AlbumSmall from './AlbumSmall';
import AlbumTrack from './AlbumTrack';
import {Link} from 'react-router-dom';
import AlbumPanel from './AlbumPanel';
import {formatDate} from '../utils';

export default class AlbumDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      albumId: this.props.match.params.trackId,
      artistId: '',
      artistName: '',
      artistAvatarUrl: '',
      title: '',
      coverUrl: '',
      colors: [[223, 244, 228], [116, 76, 55], [80, 66, 50]],
      releaseDate: null,
      tracks: [],
      totalDuration: 0,

      followingCount: 0,
      trackCount: 0,
      liked: false,
      likeCount: 0,
    };

    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.delete = this.delete.bind(this);
    this.trackLikeStatus = this.trackLikeStatus.bind(this);
    this.likeTrack = this.likeTrack.bind(this);
    this.unlikeTrack = this.unlikeTrack.bind(this);
  }

  async componentDidMount() {
    const album = await this.app.albumDetail({albumId: this.props.match.params.albumId});
    this.setState(album);

    console.log(this.state);

    const artist = await this.app.artistInfo({artistId: this.state.artistId});
    this.setState({artistAvatarUrl: artist.avatarUrl, followingCount: artist.followingCount,
      trackCount: artist.trackCount});

    const tracks = await this.app.albumTracks({albumId: this.props.match.params.albumId});
    this.setState({tracks});
  }

  async like() {
    if (!this.app.state.user) {
      this.app.saveUrl(this.props.location.pathname);
      this.props.history.push('/login');
      return;
    }
    await this.app.likeAlbum({token: this.app.state.token, albumId: this.state.albumId});
    const likeCount = await this.app.albumLikeCount({albumId: this.state.albumId});
    this.setState({likeCount, liked: true});
  }

  async unlike() {
    await this.app.unlikeAlbum({token: this.app.state.token, albumId: this.state.albumId});
    const likeCount = await this.app.albumLikeCount({albumId: this.state.albumId});
    this.setState({likeCount, liked: false});
  }

  async delete(e) {
    e.preventDefault();
    await this.app.deleteTrack({token: this.app.state.token, trackId: this.state.trackId});
    this.props.history.push(`/${this.state.artistName}`);
  }

  async trackLikeStatus(trackId) {
    const liked = await this.app.trackLikeStatus({token: this.app.state.token, trackId: trackId});
    return liked;
  }

  async likeTrack(trackId) {
    if (!this.app.state.user) {
      this.app.saveUrl(this.props.location.pathname);
      this.props.history.push('/login');
      return;
    }
    await this.app.likeTrack({token: this.app.state.token, trackId: trackId});
  }

  async unlikeTrack(trackId) {
    if (!this.app.state.user) {
      this.app.saveUrl(this.props.location.pathname);
      this.props.history.push('/login');
      return;
    }
    await this.app.unlikeTrack({token: this.app.state.token, trackId: trackId});
  }

  render() {
    const {albumId, artistName, artistAvatarUrl, title, coverUrl, colors, releaseDate,
      tracks, followingCount, trackCount, liked, likeCount} = this.state;

    const isOwner = this.app.state.user && (this.app.state.user.userName === artistName);

    return <div class="W(80%) Mx(a)">
      <div class="D(f) P(20px) My(20px) Miw(800px)" style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
        rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}>
        <div class="W(70%) Pos(r)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                <i class="fas fa-play"></i>
              </span>
              <div class="Mx(20px)">
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) My(4px) Fz(16px)">{artistName}</div>
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) Fz(18px)">{title}</div>
              </div>
            </div>
            <span class="Fl(end) C(white)">{formatDate(releaseDate)}</span>
          </div>
          <div class="Pos(a) B(10px) H(100px) W(100px) bg-dark Bdrs(100%) D(f) Fxd(c) Jc(c) Ai(c)">
            <span class="C(white) Fz(30px)">{tracks.length}</span>
            <span class="C(white) Fz(14px) T(-2px)">TRACKS</span>
            <span class="C(#999999) Fz(14px)">17:23</span>
          </div>

        </div>
        <div class="Mstart(30px) W(30%)">
          <img class="H(100%) W(100%) " src={coverUrl} alt=""/>
        </div>
      </div>
      <div class="D(f)">
        <div class="W(70%) Miw(700px) Pend(30px) Bdends(s) Bdendw(1px) Bdendc(#f2f2f2)">

          <div class="D(f) Jc(sb) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Ai(b) Pb(10px)">
            <AlbumPanel isOwner={isOwner} title={title} liked={liked} like={this.like} unlike={this.unlike}
              delete={this.delete} artistName={artistName} id={albumId}/>
            <div>
              <span class="Fz(14px) C(#999999)"><i class="Mend(2px) fas fa-heart"></i> {likeCount}</span>
            </div>
          </div>
          <div class="D(f) Mt(20px)">
            <div>
              <img class="H(120px) W(120px)" src={artistAvatarUrl} alt=""/>
              <div class="Mt(10px)">{artistName}</div>
              <span data-toggle="tooltip" title={`${followingCount} followers`} class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-user-friends"></i> {followingCount}</span>
              <span data-toggle="tooltip" title={`${trackCount} tracks`} class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-list"></i> {trackCount}</span>
              <button class="D(b) Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Follow</button>
            </div>
            <div class="Mstart(20px) W(100%)">
              <div>
                <div class="Mt(10px) Fw(600) Fz(16px)">Released date:</div>
                <div class="Fz(14px)">{formatDate(releaseDate)}</div>
              </div>

              <table class="Mt(20px) table table-sm">
                <tbody>
                  {tracks.map((track) => <AlbumTrack key={track._id} id={track._id} coverUrl={coverUrl}
                    trackUrl={track.trackUrl} title={track.title} artistName={artistName} isOwner={isOwner}
                    trackLikeStatus={this.trackLikeStatus} likeTrack={this.likeTrack} unlikeTrack={this.unlikeTrack}/>)}

                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div class="Px(30px) Miw(380px)">

          <div class="C(#999999) Fz(16px) Mt(30px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Albums from this user</span>
            <Link to="/artist/albums" class="Fl(end) C(#999999) C(#999999):h Td(n):h">View all</Link>
          </div>
          <AlbumSmall/>
          <AlbumSmall/>

        </div>
      </div>


    </div>;
  }
}
