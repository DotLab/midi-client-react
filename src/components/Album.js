import React from 'react';
import {Link} from 'react-router-dom';
import AlbumSong from './AlbumSong';

export default class Album extends React.Component {
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
                <Link to="/detail" class="D(ib) Td(n):h C(black) Fz(16px)">Catch the moment</Link>
                <span class="C(gray) Fz(14px) Mstart(4px)"> Album · 2019</span>
              </div>
            </div>
            <div class="Fl(end)">
                6 months ago
            </div>
          </div>
          <div class="Mt(10px) H(60px) Bds(s) ">
              canvas
          </div>
          <table class="My(10px) table table-hover table-sm table-bordered">
            <tbody>
              <AlbumSong/>
              <AlbumSong/>
              <AlbumSong/>
            </tbody>
          </table>
          {/* <div class="My(10px)">
            <div class="H(30px) Bds(s) Bdw(1px) Bdc(lightgray)">
              <span>
                <img class="W(20px) H(20px) Mx(4px) Mb(4px)" src={Lisa} alt=""/>
                <span class="Fz(14px) Mb(4px)"> Unlasting</span>
              </span>
              <span class="Fl(end) Fz(14px) Mend(8px) C(gray) Lh(30px)">
                <i class="Cur(p) fas fa-play"></i>
                <span class="Mx(8px)">43</span>
              </span>

            </div>
          </div>
         */}
          <div class="Mt(10px)">
            <i class="Mend(20px) Cur(p) fas fa-thumbs-up"></i>
            <i class="Mend(20px) Cur(p) fas fa-download"></i>
            <i class="Pt(4px) Pos(a) fas fa-plus"></i>
            <select class="Pos(r) W(20px) Op(0)" defaultValue="disabled">
              <option value="disabled" class="D(n)" disabled>---</option>
              <option>Add to playlist </option>
              <option>Add to collection </option>
            </select>
          </div>
        </div>
      </div>
    </div>;
  }
}
