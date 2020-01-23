import React from 'react';
import Lisa from './Lisa.jpg';
import AlbumSmall from './AlbumSmall';
import AlbumSong from './AlbumSong';
import {Link} from 'react-router-dom';

export default class AlbumDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="W(80%) Mx(a)">
      <div class="D(f) P(20px) My(20px)" style={{background: 'linear-gradient(#956E53, #70929c, transparent)'}}>
        <div class="W(70%)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
                <i class="fas fa-play"></i>
              </span>
              <div class="Mx(20px)">
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) My(4px) Fz(16px)">Lisa</div>
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) Fz(18px)">Gurenge</div>
              </div>
            </div>
            <span class="Fl(end) C(white)">6 months ago</span>
          </div>
          <div class="Mt(120px) H(100px) W(100px) bg-dark Bdrs(100%) D(f) Fxd(c) Jc(c) Ai(c)">
            <span class="C(white) Fz(30px)">5</span>
            <span class="C(white) Fz(14px) T(-2px)">TRACKS</span>
            <span class="C(#999999) Fz(14px)">17:23</span>
          </div>

        </div>
        <div class="Mstart(30px) W(30%)">
          <img class="H(100%) W(100%) " src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
        </div>
      </div>
      <div class="D(f)">
        <div class="W(70%) Miw(700px) Pend(30px) Bdends(s) Bdendw(1px) Bdendc(#f2f2f2)">

          <div class="D(f) Jc(sb) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Ai(b) Pb(10px)">
            <div class="Mt(10px) D(f)">
              <span data-toggle="tooltip" title="like" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-heart"></i></span>
              <span data-toggle="tooltip" title="download" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-download"></i></span>
              <span class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p) Pos(r)"><i class="fas fa-plus"></i></span>
              <select class="Pos(a) W(24px) H(24px) Op(0) Mstart(74px)" defaultValue="disabled">
                <option value="disabled" class="D(n)" disabled>---</option>
                <option>Add to playlist </option>
                <option>Add to collection </option>
              </select>
            </div>
            <div>
              <span class="Fz(14px) C(#999999)"><i class="Mend(2px) fas fa-heart"></i> 34k</span>
            </div>
          </div>
          <div class="D(f) Mt(20px)">
            <div>
              <img class="H(120px) W(120px)" src={Lisa} alt=""/>
              <div class="Mt(10px)">Lisa</div>
              <span data-toggle="tooltip" title="338 followers" class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-user-friends"></i> 388</span>
              <span data-toggle="tooltip" title="338 tracks" class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-list"></i> 388</span>
              <button class="D(b) Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Follow</button>
            </div>
            <div class="Mstart(20px) W(100%)">
              <div>
                <div class="Mt(10px) Fw(600) Fz(16px)">Released date:</div>
                <div class="Fz(14px)">3 July 2019</div>
              </div>

              <table class="Mt(20px) table table-sm">
                <tbody>
                  <AlbumSong/>
                  <AlbumSong/>
                  <AlbumSong/>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <div class="Px(30px) Miw(380px)">

          <div class="C(#999999) Fz(16px) Mt(30px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Albums from this user</span>
            <Link to="/artist/albums" class="Fl(end) C(#999999) C(#999999):h Td(n):h">View all</Link>
          </div>
          <AlbumSmall/>
          <AlbumSmall/>

        </div>
      </div>


    </div>;
  }
}
