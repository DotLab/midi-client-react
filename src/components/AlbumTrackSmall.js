import React from 'react';
import {Link} from 'react-router-dom';


export default class AlbumTrackSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <tr>
      <td class="Bdts(n) Bdbs(s) Bdbw(1px) Bdbc(#dee2e6)">
        <span>
          <img class="W(20px) H(20px) Mx(4px) Mb(4px)" src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
          <Link to="/song/detail" class="Td(n):h C(black) Fz(14px) Mb(4px)"> Unlasting</Link>
        </span>
        <span class="Fl(end) Fz(14px) Mend(8px) C(#999999) Lh(30px)">
          <i class="Cur(p) fas fa-play"></i>
          <span class="Mx(8px)">43</span>
        </span>
      </td>
    </tr>;
  }
}
