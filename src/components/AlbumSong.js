import React from 'react';
import Lisa from './Lisa.jpg';
import {Link} from 'react-router-dom';


export default class AlbumSong extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <tr>
      <td>
        <span>
          <img class="W(20px) H(20px) Mx(4px) Mb(4px)" src={Lisa} alt=""/>
          <Link to="/song/detail" class="Td(n):h C(black) Fz(14px) Mb(4px)"> Unlasting</Link>
        </span>
        <span class="Fl(end) Fz(14px) Mend(8px) C(gray) Lh(30px)">
          <i class="Cur(p) fas fa-play"></i>
          <span class="Mx(8px)">43</span>
        </span>
      </td>
    </tr>;
  }
}
