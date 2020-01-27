import React from 'react';
import {Link} from 'react-router-dom';
import AlbumTrackSmall from './AlbumTrackSmall';
import TrackPanel from './TrackPanel';
import {formatDate, formatTime} from '../utils';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      tracks: [],
    };
  }

  async componentDidMount() {
    const tracks = await this.props.albumTracks({albumId: this.props.id});
    this.setState({tracks});
  }

  render() {
    const {tracks} = this.state;
    const {coverUrl, artistName, releaseDate, title, id, albumLikeStatus, isOwner, user} = this.props;

    return <div class="Mb(60px)">
      <div class="D(f)">
        <Link to="/detail"><img class="W(160px) H(160px) shadow p-1 rounded" src={coverUrl} alt=""/></Link>
        <div class="W(100%) Mstart(20px)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(40px) H(40px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                <span class="Fz(14px)"><i class="fas fa-play"></i></span>
              </span>
              <div class="Mstart(10px)">
                <Link to="/artist/all" class="D(b) Td(n):h Fz(14px) C(#999999)">{artistName}</Link>
                <Link to="/detail" class="D(ib) Td(n):h C(black) Fz(16px)">{title}</Link>
                <span class="C(#999999) Fz(14px) Mstart(4px)"> Album · {new Date(releaseDate).getYear() + 1900}</span>
              </div>
            </div>
            <div class="Fl(end)">{formatDate(releaseDate)}</div>
          </div>
          <div class="Pos(r) Mb(60px)">
            <div class="Mt(20px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) H(22px)">
              <span ref={this.currentTime} class="Fl(start) bg-dark Px(8px) C(lightgray) Fz(10px)">0:00</span>
              <span class="Fl(end) bg-dark Px(8px) C(lightgray) Fz(10px)">0:00</span>
              <div ref={this.progress} class="B(-0.5px) Pos(a) Mt(60px) Bdbs(s) Bdbw(3px) Bdbc(black) H(26px)"/>
            </div>

          </div>
          <table class="My(10px) table table-hover table-sm table-bordered">
            <tbody>
              {tracks.map((track) => <AlbumTrackSmall key={track._id} id={track._id} coverUrl={coverUrl}
                trackUrl={track.trackUrl} title={track.title} artistName={artistName}/>)}
            </tbody>
          </table>

          <TrackPanel/>
        </div>
      </div>
    </div>;
  }
}
