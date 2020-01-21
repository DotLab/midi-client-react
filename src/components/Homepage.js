import React from 'react';
import MidiOverview from './MidiOverview';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      newStart: 0,
      newLength: -2 * 400,
      chartStart: 0,
      chartLength: -2 * 400,
    };

    this.newSlideRight = this.newSlideRight.bind(this);
    this.newSlideLeft = this.newSlideLeft.bind(this);
    this.chartSlideRight = this.chartSlideRight.bind(this);
    this.chartSlideLeft = this.chartSlideLeft.bind(this);
  }

  newSlideRight() {
    if (this.state.newStart - 400 < this.state.newLength) {
      return;
    }
    const newStart = this.state.newStart - 400;
    this.setState({newStart});
  }

  newSlideLeft() {
    if (this.state.newStart + 400 > 0) {
      return;
    }
    const newStart = this.state.newStart + 400;
    this.setState({newStart});
  }

  chartSlideRight() {
    if (this.state.chartStart - 400 < this.state.chartLength) {
      return;
    }
    const chartStart = this.state.chartStart - 400;
    this.setState({chartStart});
  }

  chartSlideLeft() {
    if (this.state.chartStart + 400 > 0) {
      return;
    }
    const chartStart = this.state.chartStart + 400;
    this.setState({chartStart});
  }


  render() {
    const midiOverviews = [MidiOverview, MidiOverview, MidiOverview, MidiOverview, MidiOverview, MidiOverview, MidiOverview];
    const {newStart, chartStart} = this.state;

    return <div class="W(80%) Mx(a)">
      <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(lightgray) Bdbw(1px)">
        <div class="Fz(20px) My(6px)">New Music Now</div>
        <div class="Fz(14px) C(gray)">The latest hits</div>
        <div class="D(f)">
          <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.newSlideLeft}><i class="fas fa-angle-left"></i></span>
          <div class="W(700px) Ov(h)">
            <div class="Trsdu(1s) D(f) Pos(r)" style={{left: newStart + 'px'}}>
              {midiOverviews.map((midi, i) => <MidiOverview key={midi._id} id={midi._id}/>)}
            </div>
          </div>
          <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.newSlideRight}><i class="fas fa-angle-right"></i></span>
        </div>
      </div>

      <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(lightgray) Bdbw(1px)">
        <div class="Fz(20px) My(6px)">Recently played</div>
        <div class="D(f)">
          <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.chartSlideLeft}><i class="fas fa-angle-left"></i></span>
          <div class="W(700px) Ov(h)">
            <div class="Trsdu(1s) D(f) Pos(r)" style={{left: chartStart + 'px'}}>
              {midiOverviews.map((midi, i) => <MidiOverview key={midi._id} id={midi._id}/>)}
            </div>
          </div>
          <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.chartSlideRight}><i class="fas fa-angle-right"></i></span>
        </div>
      </div>

      <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(lightgray) Bdbw(1px)">
        <div class="Fz(20px) My(6px)">Scarletea Midi Charts</div>
        <div class="Fz(14px) C(gray)">The most played tracks on Scarletea Midi this week</div>
        <div class="D(f)">
          <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.chartSlideLeft}><i class="fas fa-angle-left"></i></span>
          <div class="W(700px) Ov(h)">
            <div class="Trsdu(1s) D(f) Pos(r)" style={{left: chartStart + 'px'}}>
              {midiOverviews.map((midi, i) => <MidiOverview key={midi._id} id={midi._id}/>)}
            </div>
          </div>
          <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.chartSlideRight}><i class="fas fa-angle-right"></i></span>
        </div>
      </div>

      <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(lightgray) Bdbw(1px)">
        <div class="Fz(20px) My(6px)">Recommended for today</div>
        <div class="Fz(14px) C(gray)">Inspired by your recent activity</div>
        <div class="D(f)">
          <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.chartSlideLeft}><i class="fas fa-angle-left"></i></span>
          <div class="W(700px) Ov(h)">
            <div class="Trsdu(1s) D(f) Pos(r)" style={{left: chartStart + 'px'}}>
              {midiOverviews.map((midi, i) => <MidiOverview key={midi._id} id={midi._id}/>)}
            </div>
          </div>
          <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.chartSlideRight}><i class="fas fa-angle-right"></i></span>
        </div>
      </div>

      <div class="My(20px) Pb(30px) Bdbs(s) Bdbc(lightgray) Bdbw(1px)">
        <div class="Fz(20px) My(6px)">New releases for you</div>
        <div class="Fz(14px) C(gray)">Brand new music from artists you love</div>
        <div class="D(f)">
          <span class="Fz(30px) Lh(200px) Mend(20px)" onClick={this.chartSlideLeft}><i class="fas fa-angle-left"></i></span>
          <div class="W(700px) Ov(h)">
            <div class="Trsdu(1s) D(f) Pos(r)" style={{left: chartStart + 'px'}}>
              {midiOverviews.map((midi, i) => <MidiOverview key={midi._id} id={midi._id}/>)}
            </div>
          </div>
          <span class="Fz(30px) Lh(200px) Fl(end) Mstart(20px)" onClick={this.chartSlideRight}><i class="fas fa-angle-right"></i></span>
        </div>
      </div>

    </div>;
  }
}
