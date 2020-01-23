import React from 'react';
import {Link} from 'react-router-dom';

export default class MidiOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      playing: false,
    };
    this.play = this.play.bind(this);
  }

  play(e) {
    e.preventDefault();
    const playing = !(this.state.playing);
    this.setState({playing});
  }


  render() {
    const {playing} = this.state;

    return <div class="H(250px) My(10px) Mend(20px) D(ib)">
      <div class="H(74%) W(180px) Pos(r)">
        <img class="H(100%) W(100%) Pos(a)" src="https://i.scdn.co/image/ab67616d0000b2737e9406db1ab512c89440ba0e" alt=""/>
        <span class="H(100%) W(100%) Cur(p) Pos(a) D(f) Jc(c) Ai(c) Fz(18px) Op(1):h Op(0)">
          <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
            {!playing && <span onClick={this.play}><i class="fas fa-play"></i></span>}
            {playing && <span onClick={this.play}><i class="fas fa-pause"></i></span>}
          </span>
        </span>
      </div>
      <div>
        <Link to="/detail" class="Td(n):h C(black):h C(black) Mt(6px) Px(4px) Cur(p) Fz(14px) Fw(b)">New Dance Now</Link>
        <Link to="/album/detail" class="Td(n):h C(black):h D(b) Mt(6px) Px(4px) Cur(p) Fz(12px) C(#999999)">Main Room</Link>
      </div>
    </div>;
  }
}
