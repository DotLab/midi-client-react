import React from 'react';
import {Link} from 'react-router-dom';

export default class TrackSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {trackId, artistName, coverUrl, title, likeCount, commentCount} = this.props;

    return <div class="D(f) Mt(20px) Pos(r)">
      <Link to={{pathname: `/${artistName}/${trackId}`}}> <img class="H(50px) W(50px)" src={coverUrl} alt=""/></Link>
      <div class="Mstart(10px)">
        <Link to={{pathname: `/${artistName}`}} class="Td(n):h"><div class="Fz(14px) C(#999999)">{artistName}</div></Link>
        <Link to={{pathname: `/${artistName}/${trackId}`}} class="Td(n):h"><div class="Fz(14px) C(black)">{title}</div></Link>
        <div class="Fz(12px) C(#999999)">
          {/* <span class="Mend(16px)"><i class="Mend(4px) Fz(10px) fas fa-play"></i> 52.6k</span> */}
          <span class="Mend(16px)"><i class="Mend(4px) fas fa-heart"></i> {likeCount}</span>
          <span class="Mend(16px)"><i class="Mend(4px) fas fa-comment"></i> {commentCount}</span>
        </div>
      </div>
    </div>;
  }
}
