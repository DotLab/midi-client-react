import React from 'react';
import TrackOverview from './TrackOverview';

export default class MusicScroll extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      start: 0,
      length: -2 * 400,
    };

    this.slideRight = this.slideRight.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
  }

  slideRight() {
    if (this.state.start - 400 < this.state.length) {
      return;
    }
    const start = this.state.start - 400;
    this.setState({start});
  }

  slideLeft() {
    if (this.state.start + 400 > 0) {
      return;
    }
    const start = this.state.start + 400;
    this.setState({start});
  }


  render() {
    const {listings, title, description} = this.props;
    const {start} = this.state;

    return <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(#f2f2f2) Bdbw(1px)">
      <div class="Fz(20px) My(6px)">{title}</div>
      <div class="Fz(14px) C(#999999)">{description}</div>
      <div class="D(f)">
        <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.slideLeft}><i class="fas fa-angle-left"></i></span>
        <div class="W(700px) Ov(h)">
          <div class="Trsdu(1s) D(f) Pos(r)" style={{left: start + 'px'}}>
            {listings.map((track, i) => <TrackOverview key={track._id} id={track._id} title={track.title} artistName={track.artistName}
              coverUrl={track.coverUrl} trackUrl={track.trackUrl}/>)}
          </div>
        </div>
        <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.slideRight}><i class="fas fa-angle-right"></i></span>
      </div>


    </div>;
  }
}
