import React from 'react';

import {Link} from 'react-router-dom';


export default class LibraryTrack extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <div class="Mb(60px) D(ib) Mend(20px)">
      <Link to="/detail"><img class="W(160px) H(160px)" src="http://st.cdjapan.co.jp/pictures/l/14/09/VVCL-1220.jpg" alt=""/></Link>
      <div class="Fz(16px) Mt(4px)">Gurenge</div>
      <Link to="/artist/all" class="Fz(12px) C(#999999) C(black):h Td(n):h">Lisa</Link>
    </div>;
  }
}
