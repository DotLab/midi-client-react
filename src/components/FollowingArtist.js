import React from 'react';

import {Link} from 'react-router-dom';


export default class FollowingArtist extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    const {avatarUrl, artistName} = this.props;

    return <div class="Mx(20px) D(ib) Mb(60px) W(160px)">
      <Link to={{pathname: `/${artistName}/all`}}><img class="H(160px) H(160px)" src={avatarUrl} alt=""/></Link>
      <Link to={{pathname: `/${artistName}/all`}} class="D(f) Jc(c) My(10px) Td(n):h"><div class="C(black)">{artistName}</div></Link>
    </div>;
  }
}
