import React from 'react';
import Lisa from './Lisa.jpg';
import Track from './Track';
import Album from './Album';
import TrackSmall from './TrackSmall';
import {Link} from 'react-router-dom';
import {ALL, POPULAR, TRACKS, ALBUMS, LIKES, FOLLOWING} from './utils';

export default class ProfilePage extends React.Component {
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
              <button class="Bdc(t) Bdrs(4px) Bgc(#ec84a2) C(white) C(white):h W(90px) Px(20px) Mx(20px)">Play</button>
              <button class="Bdc(t) Bdrs(4px) W(90px) Px(20px) Mx(20px) My(20px)">Follow</button>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
      <div class="Fw(b) W(100%) Py(8px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
        <Link to="/profile/all" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALL ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>All</Link>
        <Link to="/profile/popular" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === POPULAR ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>Popular tracks</Link>
        <Link to="/profile/tracks" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>Tracks</Link>
        <Link to="/profile/albums" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === ALBUMS ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>Albums</Link>
        <Link to="/profile/likes" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === LIKES ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>Likes</Link>
        <Link to="/profile/following" class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc(#ec84a2):h C(#ec84a2):h  Bdbs(s):h Bdbw(2px) ' + (tab === FOLLOWING ? 'C(#ec84a2) Bdbs(s)' : 'C(gray)')}>Following</Link>
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

        {tab === LIKES && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
          <Album/>
          <Album/>
        </div>}

        {tab === FOLLOWING && <div class="Pt(40px) W(70%) Miw(700px) Pend(20px) Bdends(s) Bdendc(#f2f2f2) Bdendw(1px)">
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
