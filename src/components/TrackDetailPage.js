import React from 'react';
import TrackComment from './TrackComment';
import Comment from './Comment';
import Lisa from './Lisa.jpg';
import TrackSmall from './TrackSmall';
import AlbumSmall from './AlbumSmall';
import {Link} from 'react-router-dom';
import TrackPanel from './TrackPanel';

export default class TrackDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      playing: false,
    };
    this.play = this.play.bind(this);
  }

  play(e) {
    e.preventDefault();
    const playing = !(this.state.playing);
    this.setState({playing});
  }


  render() {
    const {playing} = this.state;

    return <div class="W(80%) Mx(a)">
      <div class="D(f) P(20px) My(20px)" style={{background: 'linear-gradient(#956E53, #70929c, transparent)'}}>
        <div class="W(70%)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)" onClick={this.play}>
                {!playing && <span><i class="fas fa-play"></i></span>}
                {playing && <span vvvvvvvvvvv><i class="fas fa-pause"></i></span>}
              </span>
              <div class="Mx(20px)">
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) My(4px) Fz(16px)">Lisa</div>
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) Fz(18px)">Gurenge</div>
              </div>
            </div>
            <span class="Fl(end) C(white)">6 months ago</span>
          </div>
          <div class="Mt(60px) Bdbs(s) Bdbw(1px) Bdbc(lightgray) H(26px)">
            <span class="Fl(end) bg-dark Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div>
          <TrackComment/>
          <TrackComment/>
        </div>
        <div class="Mstart(30px) W(30%)">
          <img class="H(100%) W(100%) " src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
        </div>
      </div>
      <div class="D(f)">
        <div class="W(70%) Miw(700px) Pend(30px) Bdends(s) Bdendw(1px) Bdendc(#f2f2f2)">
          <div class="H(40px) Bgc(#f2f2f2) D(f) Ai(c)">
            <div class="D(ib) Mend(6px) H(100%) W(44px)" style={{background: 'linear-gradient(#956E53, #70929c)'}}></div>
            <input class="H(28px) Bdc(t) Bdrs(4px) P(4px) W(100%) Mend(6px)" placeholder="Write a comment"/>
          </div>

          <div class="D(f) Jc(sb) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Ai(b) Pb(10px)">
            <TrackPanel/>
            <div>
              <span class="Fz(14px) Mend(20px) C(#999999)"><i class="Fz(12px) Mend(2px) fas fa-play"></i> 34k</span>
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
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
            </div>
          </div>

        </div>

        <div class="Px(30px) Miw(380px)">
          <div class="C(#999999) Fz(16px) Py(4px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Related tracks</span>
            <Link to="/track/related" class="C(#999999) Td(n):h C(black):h"><span class="Fl(end)">View all</span></Link>
          </div>
          <TrackSmall/>
          <TrackSmall/>
          <TrackSmall/>
          <TrackSmall/>

          <div class="C(#999999) Fz(16px) Mt(30px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>In albums</span>
            <Link to="/track/related" class="C(#999999) Td(n):h C(black):h"><span class="Fl(end)">View all</span></Link>
          </div>
          <AlbumSmall/>

        </div>
      </div>


    </div>;
  }
}
