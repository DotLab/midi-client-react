import React from 'react';
import {Link} from 'react-router-dom';

export default class TrackOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      playing: false,
      audio: new Audio(this.props.trackUrl),
    };
    this.play = this.play.bind(this);
  }

  componentWillUnmount() {
    if (this.state.audio) {
      this.state.audio.pause();
    }
  }

  play(e) {
    e.preventDefault();
    const playing = !(this.state.playing);
    if (this.state.audio) {
      if (!this.state.playing) {
        this.state.audio.play();
      } else {
        this.state.audio.pause();
      }
      this.setState({playing});
    }
  }

  render() {
    const {playing} = this.state;
    const {id, title, artistName, coverUrl} = this.props;

    return <div class="H(250px) My(10px) Mend(20px) D(ib)">
      <div class="H(74%) W(180px) Pos(r)">
        <img class="H(100%) W(100%) Pos(a)" src={coverUrl} alt=""/>
        <Link to={{pathname: `/${artistName}/${id}`}}>
          <span class="H(100%) W(100%) Cur(p) Pos(a) D(f) Jc(c) Ai(c) Fz(18px) Op(1):h Op(0)">
            <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)" onClick={this.play}>
              {!playing && <span><i class="fas fa-play"></i></span>}
              {playing && <span><i class="fas fa-pause"></i></span>}
            </span>
          </span>
        </Link>
      </div>
      <div>
        <Link to={{pathname: `/${artistName}/${id}`}} class="Td(n):h C(black):h C(black) Mt(6px) Px(4px) Cur(p) Fz(14px) Fw(b)">{title}</Link>
        <Link to={{pathname: `/${artistName}/all`}} class="Td(n):h C(black):h D(b) Mt(6px) Px(4px) Cur(p) Fz(12px) C(#999999)">{artistName}</Link>
      </div>
    </div>;
  }
}
