import React from 'react';

import {Link} from 'react-router-dom';


export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <div class="Mb(60px)">
      <div class="D(f)">
        <Link to="/detail"><img class="W(160px) H(160px) shadow p-1 rounded" src="http://st.cdjapan.co.jp/pictures/l/05/32/SVWC-70233.jpg" alt=""/></Link>
        <div class="W(100%) Mstart(20px)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(40px) H(40px) D(f) Jc(c) Ai(c) P(4px) Bgc(black) Bdrs(100%)">
                <span class="Fz(14px)"><i class="fas fa-play"></i></span>
              </span>
              <div class="Mstart(10px)">
                <Link to="/artist/all" class="D(b) Td(n):h Fz(14px) C(gray)">Lisa</Link>
                <Link to="/detail" class="D(b) Td(n):h C(black) Fz(16px)">Catch the moment</Link>
              </div>
            </div>
            <div class="Fl(end)">
                6 months ago
            </div>
          </div>
          <div class="Mt(10px) H(60px) Bds(s) ">
              canvas
          </div>
          <div class="Mt(10px)">
            <i class="Mend(20px) Cur(p) fas fa-thumbs-up"></i>
            <i class="Mend(20px) Cur(p) fas fa-download"></i>
            <i class="Pt(4px) Pos(a) fas fa-plus"></i>
            <select class="Pos(r) W(20px) Op(0)" defaultValue="disabled">
              <option value="disabled" class="D(n)" disabled>---</option>
              <option>Add to playlist </option>
              <option>Add to collection </option>
            </select>
            <span class="Fl(end) Cur(p) Fz(14px)"><i class="Mend(6px) fas fa-play"></i> 32</span>
          </div>
        </div>
      </div>
    </div>;
  }
}
