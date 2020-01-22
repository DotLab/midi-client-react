import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="D(f) Mt(20px) Pos(r)">
      <img class="H(50px) W(50px)" src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
      <div class="Mstart(10px)">
        <div class="Fz(14px) C(#999999)">Lisa</div>
        <Link to="/album/detail"><div class="Fz(14px)">Gurenge</div></Link>
        <div class="Fz(12px) C(#999999)">
          <span class="Mend(16px)">Album · 2019</span>
        </div>
      </div>
      <span class="H(100%) Pos(a) Cur(p) Fz(10px) Op(1):h Op(0)">
        <div class="H(50px) W(50px) Fl(start) D(f) Jc(c) Ai(c)">
          <span class="C(white) W(30px) H(30px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
            <i class="fas fa-play"></i>
          </span>
        </div>
      </span>
    </div>;
  }
}
