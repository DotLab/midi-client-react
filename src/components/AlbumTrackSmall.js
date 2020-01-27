import React from 'react';
import {Link} from 'react-router-dom';


export default class AlbumTrackSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    const {id, coverUrl, title, artistName} = this.props;

    return <tr>
      <td class="Bdts(n) Bdbs(s) Bdbw(1px) Bdbc(#dee2e6)">
        <span>
          <img class="W(20px) H(20px) Mx(4px) Mb(4px)" src={coverUrl} alt=""/>
          <Link to={{pathname: `/${artistName}/${id}`}} class="Td(n):h C(black) Fz(14px) Mb(4px)"> {title}</Link>
        </span>
      </td>
    </tr>;
  }
}
