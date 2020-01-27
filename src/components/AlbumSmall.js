import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {id, artistName, coverUrl, title, releaseDate} = this.props;

    return <div class="D(f) Mt(20px) Pos(r)">
      <img class="H(60px) W(60px)" src="https://a-v2.sndcdn.com/assets/images/playlist-cover-bg_small-1e402003.png" alt=""/>
      <Link to={{pathname: `/${artistName}/album/${id}`}}><img class="H(50px) W(50px) Pos(a) Start(5px) B(5px)" src={coverUrl} alt=""/></Link>
      <div class="Mstart(10px)">
        <Link to={{pathname: `/${artistName}/all`}} class="Td(n):h"><div class="Fz(14px) C(#999999)">{artistName}</div></Link>
        <Link to={{pathname: `/${artistName}/album/${id}`}} class="C(black) C(black):h Td(n):h"><div class="Fz(14px)">{title}</div></Link>
        <div class="Fz(12px) C(#999999)">
          <span class="Mend(16px)">Album · {new Date(releaseDate).getYear() + 1900}</span>
        </div>
      </div>
    </div>;
  }
}
