import React from 'react';
import AlbumPanel from './AlbumPanel';
import {Link} from 'react-router-dom';

export default class AlbumTrack extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      hover: false,
      playing: false,
      audio: null,
      duration: 0,
      liked: false,
    };

    this.play = this.play.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.delete = this.delete.bind(this);
    this.trackLikeStatus = this.trackLikeStatus.bind(this);
  }

  async componentDidMount() {
    const liked = this.props.trackLikeStatus(this.props.id);
    this.setState(liked);
    const audio = new Audio(this.props.trackUrl);
    audio.addEventListener('loadeddata', () => {
      const duration = audio.duration;
      console.log(duration);
      this.setState({audio, duration});
    });
  }

  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.pause();
      this.setState({audio: null});
    }
  }

  async play(e) {
    const playing = !(this.state.playing);

    if (!this.state.playing) {
      this.state.audio.play();
    } else {
      this.state.audio.pause();
    }

    this.setState({playing});
  }

  async like() {
    await this.props.likeTrack(this.props.id);
    this.setState({liked: true});
  }

  async unlike() {
    await this.props.unlikeTrack(this.props.id);
    this.setState({liked: true});
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


  render() {
    const {hover, playing, liked} = this.state;
    const {id, coverUrl, title, artistName, isOwner} = this.props;

    return <tr onMouseEnter={() => this.setState({hover: true})}
      onMouseLeave={() => this.setState({hover: false})}>
      <td class="Bdts(n)! Bdbs(s) Bdbw(1px) Bdbc(#dee2e6) Pos(r) Bgc(#f2f2f2):h">
        <div class="W(74%) Pos(a) Op(1):h Op(0)" onClick={this.play}>
          {!playing && <span class="Fz(22px) Mstart(2px)"><i class="fas fa-play-circle"></i></span>}
          {playing && <span class="Fz(22px) Mstart(2px)"><i class="fas fa-pause-circle"></i></span>}
          <Link to={{pathname: `/${artistName}/${id}`}} class="Mstart(20px) Fz(14px) Op(0)">{title}</Link>
          {/* <span class="Fl(end) Mend(10px) Fz(14px) H(30px) Ai(c) Mt(2px)">{formatTime(duration)}</span> */}
        </div>
        <span class={'D(f) Fl(end) Mend(10px) H(30px) Ai(c) Mt(2px) ' + (hover ? 'Op(1)' : 'Op(0)')}>
          <AlbumPanel isOwner={isOwner} title={title} liked={liked} like={this.like} unlike={this.unlike}
            delete={this.delete} artistName={artistName} id={id}/>
        </span>
        <span>
          <img class="W(30px) H(30px) Mend(10px) My(2px) " src={coverUrl} alt=""/>
          <Link to="/song/detail" class="Td(n):h C(black) Fz(14px) Mb(4px)"> {title}</Link>
        </span>


      </td>
    </tr>;
  }
}
