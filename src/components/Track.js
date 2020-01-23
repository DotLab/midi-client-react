import React from 'react';

import {Link} from 'react-router-dom';
import TrackPanel from './TrackPanel';


export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <div class="Mb(60px)">
      <div class="D(f)">
        <Link to="/detail"><img class="W(160px) H(160px) shadow p-1 rounded" src="http://st.cdjapan.co.jp/pictures/l/14/09/VVCL-1220.jpg" alt=""/></Link>
        <div class="W(100%) Mstart(20px)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(40px) H(40px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                <span class="Fz(14px)"><i class="fas fa-play"></i></span>
              </span>
              <div class="Mstart(10px)">
                <Link to="/artist/all" class="D(b) Td(n):h Fz(14px) C(#999999)">Lisa</Link>
                <Link to="/detail" class="D(b) Td(n):h C(black) Fz(16px)">Catch the moment</Link>
              </div>
            </div>
            <div class="Fl(end)">
                6 months ago
            </div>
          </div>
          <div class="My(34px) Bdbs(s) Bdbw(1px) Bdbc(lightgray) H(20px)">
            <span class="Fl(end) bg-dark Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div>
          <TrackPanel/>

        </div>
      </div>
    </div>;
  }
}
