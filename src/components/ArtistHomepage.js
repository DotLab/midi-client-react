import React from 'react';
import Lisa from './Lisa.jpg';
import {Link} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS} from './utils';

export default class ArtistHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {tab} = this.props;

    return <div class="W(80%) Mx(a)">
      <div class="Py(20px)">
        <div class="Pos(r) D(f) Fxd(c) Fl(start) W(100%) Py(20px)">
          <img class="W(300px) H(300px) Op(0.5)" src={Lisa} alt="lisa"/>
          <div class="Pos(a) Pt(120px)">
            <div class="Fz(50px) Px(20px) Fw(b) C(white)">Lisa</div>
            <div>
              <button class="btn btn-success W(90px) Px(20px) Mx(20px)">Play</button>
              <button class="btn btn-secondary W(90px) Px(20px) Mx(20px) My(20px)">Follow</button>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(lightgray)">
        <Link to="/artist/all" class={'Pend(20px) Cur(p) Td(n):h Py(9px) Bdbc(black):h Bdbs(s):h Bdbw(2px) ' + (tab === ALL ? 'C(black) Bdbs(s)' : 'C(gray)')}>All</Link>
        <Link to="/artist/popular" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(black):h Bdbs(s):h Bdbw(2px) ' + (tab === POPULAR ? 'C(black) Bdbs(s)' : 'C(gray)')}>Popular tracks</Link>
        <Link to="/artist/tracks" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(black):h Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C(black) Bdbs(s)' : 'C(gray)')}>Tracks</Link>
        <Link to="/artist/albums" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(black):h Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C(black) Bdbs(s)' : 'C(gray)')}>Albums</Link>
      </div>
      <div class="D(f)">
        <div class="Py(40px) W(70%) Pend(20px) Bdends(s) Bdendc(lightgray) Bdendw(1px)">
          <span class="Fz(22px)">Recent</span>
          <div class="D(f)">
            <Link to="/detail"><img class="W(160px) H(160px) shadow p-2 rounded" src="http://st.cdjapan.co.jp/pictures/l/05/32/SVWC-70233.jpg" alt=""/></Link>
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
        </div>
        <div class="P(30px)">
          <span class="D(ib) C(gray) Pend(20px)">
            <div class="Fz(14px)">Followers</div>
            <div class="Fz(20px)">387</div>
          </span>
          <span class="D(ib) C(gray) Px(20px) Bdstarts(s) Bdstartw(1px) Bdstartc(lightgray) Bdends(s) Bdendw(1px) Bdendc(lightgray)">
            <div class="Fz(14px)">Followers</div>
            <div class="Fz(20px)">387</div>
          </span>
          <span class="D(ib) C(gray) Px(20px)">
            <div class="Fz(14px)">Tracks</div>
            <div class="Fz(20px)">387</div>
          </span>
          <div class="My(20px)">
            <i class="fas fa-globe-americas"></i> Official Website
          </div>
        </div>
      </div>

    </div>;
  }
}
