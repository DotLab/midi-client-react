import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumSong extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      hover: false,
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
    const {hover, playing} = this.state;

    return <tr>
      <td class="Bdts(n)! Bdbs(s) Bdbw(1px) Bdbc(#dee2e6) Pos(r) Bgc(#f2f2f2):h">
        <div class="W(100%) Pos(a) Op(1):h Op(0)" onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false})} onClick={this.play}>
          {!playing && <span class="Fz(22px) Mstart(2px)"><i class="fas fa-play-circle"></i></span>}
          {playing && <span class="Fz(22px) Mstart(2px)"><i class="fas fa-pause-circle"></i></span>}
          <span class="D(f) Fl(end) Mend(10px) H(30px) Ai(c) Mt(2px)">
            <span data-toggle="tooltip" title="like" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Py(2px) Fz(12px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-heart"></i></span>
            <span data-toggle="tooltip" title="download" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Py(2px) Fz(12px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-download"></i></span>
            <span class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Py(2px) Fz(12px) Bdrs(4px) Mend(6px) Cur(p) Pos(r)"><i class="fas fa-plus"></i></span>
            <select class="Pos(a) W(24px) H(24px) Op(0) Mstart(74px)" defaultValue="disabled">
              <option value="disabled" class="D(n)" disabled>---</option>
              <option>Add to playlist </option>
              <option>Add to collection </option>
            </select>
          </span>
        </div>
        <span>
          <img class="W(30px) H(30px) Mend(10px) My(2px) " src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
          <Link to="/song/detail" class="Td(n):h C(black) Fz(14px) Mb(4px)"> Unlasting</Link>
        </span>

        <span class={'Fl(end) Fz(14px) Mend(8px) C(#999999) Lh(30px) ' + (hover ? 'Op(0)' : 'Op(1)') }>
          <i class="Cur(p) fas fa-play"></i>
          <span class="Mx(8px)">43</span>
        </span>

      </td>
    </tr>;
  }
}
