import React from 'react';

import {Link} from 'react-router-dom';


export default class FollowingArtist extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <div class="Mx(20px) D(ib) Mb(60px) W(160px)">
      <Link to="/artist/all"><img class="H(160px) H(160px)" src="https://avatarfiles.alphacoders.com/878/87813.png" alt=""/></Link>
      <Link to="/artist/all" class="D(f) Jc(c) My(10px) Td(n):h"><div class="C(black)">Lisa</div></Link>
    </div>;
  }
}
