import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="D(f) Mt(20px) Pos(r)">
      <img class="H(60px) W(60px)" src="https://a-v2.sndcdn.com/assets/images/playlist-cover-bg_small-1e402003.png" alt=""/>
      <Link to="/album/detail"><img class="H(50px) W(50px) Pos(a) Start(5px) B(5px)" src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/></Link>
      <div class="Mstart(10px)">
        <Link to="/artist/all" class="Td(n):h"><div class="Fz(14px) C(#999999)">Lisa</div></Link>
        <Link to="/album/detail" class="C(black) C(black):h Td(n):h"><div class="Fz(14px)">Gurenge</div></Link>
        <div class="Fz(12px) C(#999999)">
          <span class="Mend(16px)">Album · 2019</span>
        </div>
      </div>
    </div>;
  }
}
