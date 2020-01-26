import React from 'react';
import {Link} from 'react-router-dom';
import {formatDate, formatTime} from '../utils';
import TrackPanel from './TrackPanel';
import TrackComment from './TrackComment';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.currentTime = React.createRef();
    this.progress = React.createRef();

    this.state = {
      audio: null,
      playing: false,
      duration: 0,
      comments: [],
      signedUrl: null,
      liked: false,
    };
    this.play = this.play.bind(this);
  }

  async componentDidMount() {
    const comments = await this.props.trackCommentList({trackId: this.props.id});
    const signedUrl = await this.props.getSignedUrl({trackId: this.props.id});
    let liked = false;
    if (this.props.user) {
      liked = await this.props.trackLikeStatus({trackId: this.props.id});
      console.log(liked);
    }

    this.setState({comments, signedUrl, liked});
    const audio = new Audio(this.props.trackUrl);
    audio.addEventListener('loadeddata', () => {
      const duration = audio.duration;
      console.log(duration);
      this.setState({audio, duration});
    });
  }

  async play(e) {
    const playing = !(this.state.playing);

    if (!this.state.playing) {
      this.state.audio.play();
    } else {
      this.state.audio.pause();
    }

    this.state.audio.addEventListener('timeupdate', () => {
      if (this.currentTime.current) {
        this.currentTime.current.innerText = formatTime(Math.floor(this.state.audio.currentTime)).toString();
        this.progress.current.style.width = `${this.state.audio.currentTime / this.state.duration * 100}%`;
      }
    });

    this.setState({playing});
  }


  render() {
    const {id, coverUrl, artistName, title, releaseDate, isOwner} = this.props;
    const {duration, playing, comments, signedUrl, liked} = this.state;

    return <div class="Mb(60px)">
      <div class="D(f)">
        <Link to={{pathname: `/${artistName}/${id}`}}><img class="W(160px) H(160px) shadow p-1 rounded" src={coverUrl} alt=""/></Link>
        <div class="W(100%) Mstart(20px)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span onClick={this.play} class="Cur(p) C(white) W(40px) H(40px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                {playing && <span class="Fz(14px)"><i class="fas fa-pause"></i></span>}
                {!playing && <span class="Fz(14px)"><i class="fas fa-play"></i></span>}
              </span>
              <div class="Mstart(10px)">
                <Link to={{pathname: `/${artistName}/all`}} class="D(b) Td(n):h Fz(14px) C(#999999)">{artistName}</Link>
                <Link to={{pathname: `/${artistName}/${id}`}} class="D(b) Td(n):h C(black) Fz(16px)">{title}</Link>
              </div>
            </div>
            <div class="Fl(end)">{formatDate(releaseDate)}</div>
          </div>
          <div class="Pos(r) Mb(60px)">
            <div class="Mt(20px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) H(22px)">
              <span ref={this.currentTime} class="Fl(start) bg-dark Px(8px) C(lightgray) Fz(10px)">0:00</span>
              <span class="Fl(end) bg-dark Px(8px) C(lightgray) Fz(10px)">{formatTime(duration)}</span>
              <div ref={this.progress} class="B(-0.5px) Pos(a) Mt(60px) Bdbs(s) Bdbw(3px) Bdbc(black) H(26px)"/>
            </div>
            {comments.map((comment) => <TrackComment key={comment._id} id={comment._id} textColor="black" Pt="0"
              commentAuthorId={comment.commentAuthorId} commentAuthorName={comment.commentAuthorName}
              commentAuthorAvatarUrl={comment.commentAuthorAvatarUrl} body={comment.body} date={comment.date}
              timestamp={comment.timestamp} duration={duration}/>)}
          </div>

          {/* <div class="My(34px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) H(20px)">
            <span class="Fl(end) bg-dark Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div> */}
          <TrackPanel isOwner={isOwner} signedUrl={signedUrl} title={title} liked={liked} like={this.like} unlike={this.unlike}
            delete={this.delete} artistName={artistName} id={id}/>
        </div>
      </div>
    </div>;
  }
}
