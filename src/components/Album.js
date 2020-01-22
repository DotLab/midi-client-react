import React from 'react';
import {Link} from 'react-router-dom';
import AlbumSongSmall from './AlbumSongSmall';

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
              <span class="C(white) W(40px) H(40px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                <span class="Fz(14px)"><i class="fas fa-play"></i></span>
              </span>
              <div class="Mstart(10px)">
                <Link to="/artist/all" class="D(b) Td(n):h Fz(14px) C(#999999)">Lisa</Link>
                <Link to="/detail" class="D(ib) Td(n):h C(black) Fz(16px)">Catch the moment</Link>
                <span class="C(#999999) Fz(14px) Mstart(4px)"> Album · 2019</span>
              </div>
            </div>
            <div class="Fl(end)">
                6 months ago
            </div>
          </div>
          <div class="My(34px) Bdbs(s) Bdbw(1px) Bdbc(lightgray) H(20px)">
            <span class="Fl(end) bg-dark Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div>
          <table class="My(10px) table table-hover table-sm table-bordered">
            <tbody>
              <AlbumSongSmall/>
              <AlbumSongSmall/>
              <AlbumSongSmall/>
            </tbody>
          </table>

          <div class="Mt(10px) D(f)">
            <span data-toggle="tooltip" title="like" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-thumbs-up"></i></span>
            <span data-toggle="tooltip" title="download" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-download"></i></span>
            <span class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p) Pos(r)"><i class="fas fa-plus"></i></span>
            <select class="Pos(a) W(24px) H(24px) Op(0) Mstart(74px)" defaultValue="disabled">
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
