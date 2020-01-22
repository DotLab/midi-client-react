import React from 'react';

export default class TrackSmall extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="D(f) Mt(20px) Pos(r)">
      <img class="H(50px) W(50px)" src="https://beatsaver.com/cdn/3dbb/5c9ec42e4868d3f4cd18c0c23ada5dbcc558d402.jpg" alt=""/>
      <span class="H(100%) W(100%) Pos(a) Cur(p) Fz(10px) Op(1):h Op(0)">
        <div class="H(50px) W(50px) Fl(start) D(f) Jc(c) Ai(c)">
          <span class="C(white) W(30px) H(30px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)">
            <i class="fas fa-play"></i>
          </span>
        </div>
      </span>

      <div class="Mstart(10px)">
        <div class="Fz(14px) C(#999999)">Alu Kawaii</div>
        <div class="Fz(14px)">Love is War OP Full - Love Dramatic</div>
        <div class="Fz(12px) C(#999999)">
          <span class="Mend(16px)"><i class="Mend(4px) Fz(10px) fas fa-play"></i> 52.6k</span>
          <span class="Mend(16px)"><i class="Mend(4px) fas fa-thumbs-up"></i> 52.6k</span>
          <span class="Mend(16px)"><i class="Mend(4px) fas fa-comment"></i> 13</span>
        </div>
      </div>
    </div>;
  }
}
