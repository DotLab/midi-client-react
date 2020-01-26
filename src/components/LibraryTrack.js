import React from 'react';

import {Link} from 'react-router-dom';


export default class LibraryTrack extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {id, title, artistName, coverUrl} = this.props;

    return <div class="Mb(60px) D(ib) Mend(20px)">
      <Link to={{pathname: `/${artistName}/${id}`}} ><img class="W(160px) H(160px)" src={coverUrl} alt=""/></Link>
      <Link to={{pathname: `/${artistName}/${id}`}} class="Fz(12px) C(black) C(black):h Td(n):h"><div class="Fz(16px) Mt(4px)">{title}</div></Link>
      <Link to={{pathname: `/${artistName}/all`}} class="Fz(12px) C(#999999) C(black):h Td(n):h">{artistName}</Link>
    </div>;
  }
}
