import React from 'react';
import Lisa from './Lisa.jpg';
import Track from './Track';
import Album from './Album';
import TrackSmall from './TrackSmall';
import {Link} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS} from './utils';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      following: true,
    };
  }

  render() {
    const {tab} = this.props;
    const {following} = this.state;

    return <div class="W(80%) Mx(a)">
      <div class="Py(20px)">
        <div class="Pos(r) D(f) Fxd(c) Fl(start) W(100%) Py(20px)">
          <img class="W(300px) H(300px) Op(0.5)" src={Lisa} alt="lisa"/>
          <div class="Pos(a) Pt(120px)">
            <div class="Fz(50px) Px(20px) Fw(b) C(white)">Lisa</div>
            <div class="My(20px)">
              <button class="Bdc(t) Bdrs(4px) Bgc(#6c757d) C(white) C(white):h W(90px) Px(20px) Mx(20px)">Play</button>
              {following && <button class="Bgc($pink) Bdc(t) C(white) Bdrs(4px) W(90px) Px(20px) Mx(20px)">Follow</button>}
              {!following && <button class="btn btn-outline-secondary Bgc(b) Bdrs(4px) Bdc($pink) Bgc($pink):h Bdc($pink):h C(white) C(white):h Px(20px) Py(2px) Mx(20px)">Unfollow</button>}
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to="/profile/all" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALL ? 'C($pink) Bdbs(s)' : 'C(gray)')}>All</Link>
        <Link to="/profile/popular" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === POPULAR ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Popular tracks</Link>
        <Link to="/profile/tracks" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Tracks</Link>
        <Link to="/profile/albums" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Albums</Link>
      </div>
      <div class="D(f)">
        {tab === ALL && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <div class="Fz(22px) Mb(20px)">Recent</div>
          <Track/>
          <Track/>
          <Track/>
          <Track/>
          <Track/>
        </div>}

        {tab === POPULAR && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <Track/>
          <Track/>
          <Track/>
          <Track/>
          <Track/>
        </div>}

        {tab === TRACKS && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <Track/>
          <Track/>
          <Track/>
          <Track/>
          <Track/>
        </div>}

        {tab === ALBUMS && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <Album/>
          <Album/>
        </div>}

        <div class="P(30px) Miw(400px)">
          <span class="D(ib) C(#999999) Pend(20px)">
            <div class="Fz(14px)">Followers</div>
            <div class="Fz(20px)">387</div>
          </span>
          <span class="D(ib) C(#999999) Px(20px) Bdstarts(s) Bdstartw(1px) Bdstartc(#f2f2f2) Bdends(s) Bdendw(1px) Bdendc(lightgray)">
            <div class="Fz(14px)">Followers</div>
            <div class="Fz(20px)">387</div>
          </span>
          <span class="D(ib) C(#999999) Px(20px)">
            <div class="Fz(14px)">Tracks</div>
            <div class="Fz(20px)">387</div>
          </span>

          <div class="C(#999999) Fz(16px) My(20px) Py(4px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Likes</span>
            <Link to="/likes" class="Fl(end) C(#999999) C(#999999):h Td(n):h">View all</Link>
          </div>
          <TrackSmall/>
          <TrackSmall/>

        </div>
      </div>

    </div>;
  }
}
