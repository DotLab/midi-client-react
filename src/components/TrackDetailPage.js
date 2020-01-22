import React from 'react';
import SongComment from './SongComment';
import Comment from './Comment';
import Lisa from './Lisa.jpg';

export default class TrackDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="W(80%) Mx(a)">
      <div class="D(f) P(20px) My(20px)" style={{background: 'linear-gradient(#FdAB9F, #70929c, transparent)'}}>
        <div class="W(70%)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) Bgc(black) Bdrs(100%)">
                <i class="fas fa-play"></i>
              </span>
              <div class="Mx(20px)">
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) My(4px) Fz(16px)">Lisa</div>
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) Fz(18px)">Gurenge</div>
              </div>
            </div>
            <span class="Fl(end)">6 months ago</span>
          </div>
          <div class="Mt(60px) Bdbs(s) Bdbw(1px) Bdbc(lightgray) H(26px)">
            <span class="Fl(end) Bgc(black) Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div>
          <SongComment/>
          <SongComment/>
        </div>
        <div class="Mstart(30px) W(30%)">
          <img class="H(100%) W(100%) " src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
        </div>
      </div>
      <div class="D(f)">
        <div class="W(70%) Miw(700px) Pend(30px) Bdends(s) Bdendw(1px) Bdendc(#f2f2f2)">
          <div class="H(40px) Bgc(#f2f2f2) D(f) Ai(c)">
            <div class="D(ib) Mend(6px) H(100%) W(44px)" style={{background: 'linear-gradient(#e95689, #f9aac6)'}}></div>
            <input class="H(28px) Bdc(t) Bdrs(4px) P(4px) W(100%) Mend(6px)" placeholder="Write a comment"/>
          </div>

          <div class="D(f) Jc(sb) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Ai(b) Pb(10px)">
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
            <div>
              <span class="Fz(14px) Mend(20px) C(#999999)"><i class="Fz(12px) Mend(2px) fas fa-play"></i> 34k</span>
              <span class="Fz(14px) C(#999999)"><i class="Mend(2px) fas fa-thumbs-up"></i> 34k</span>
            </div>
          </div>
          <div class="D(f) Mt(20px)">
            <div>
              <img class="H(120px) W(120px)" src={Lisa} alt=""/>
              <div class="Mt(10px)">Lisa</div>
              <span data-toggle="tooltip" title="338 followers" class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-user-friends"></i> 388</span>
              <span data-toggle="tooltip" title="338 tracks" class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-list"></i> 388</span>
              <button class="D(b) Bdc(t) Bdrs(4px) Px(8px) Bgc(#e95689) C(white) Fz(14px) Mt(10px) H(28px)">Follow</button>
            </div>
            <div class="Mstart(20px) W(100%)">
              <div>
                <div class="Fw(600) Fz(16px)">Released by:</div>
                <div class="Fz(14px)">Sony music</div>
                <div class="Mt(10px) Fw(600) Fz(16px)">Released date:</div>
                <div class="Fz(14px)">3 July 2019</div>
                <div class="Mt(14px) Fz(16px) C(#999999) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Py(4px)">12 comments</div>
              </div>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
            </div>
          </div>

        </div>

        <div class="Px(30px) Miw(400px)">
          <div class="C(#999999) Fz(16px) Py(4px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Related tracks</span>
            <span class="Fl(end)">View all</span>
          </div>
          <div class="D(f) Mt(20px)">
            <img class="H(50px) W(50px)" src="https://beatsaver.com/cdn/3dbb/5c9ec42e4868d3f4cd18c0c23ada5dbcc558d402.jpg" alt=""/>
            <div class="Mstart(10px)">
              <div class="Fz(14px) C(#999999)">Alu Kawaii</div>
              <div class="Fz(14px)">Love is War OP Full</div>
              <div class="Fz(12px) C(#999999)">
                <span class="Mend(12px)"><i class="Mend(2px) Fz(10px) fas fa-play"></i> 52.6k</span>
                <span class="Mend(12px)"><i class="Mend(2px) fas fa-thumbs-up"></i> 52.6k</span>
                <span class="Mend(12px)"><i class="Mend(2px) fas fa-comment"></i> 13</span>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>;
  }
}
