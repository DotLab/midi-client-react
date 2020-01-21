import React from 'react';

export default class MidiOverview extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }


  render() {
    return <div class="H(250px) My(10px) Mend(20px) D(ib)">
      <div class="H(74%) W(180px) Pos(r)">
        <img class="H(100%) W(100%) Pos(a)" src="https://i.scdn.co/image/ab67616d0000b2737e9406db1ab512c89440ba0e" alt=""/>
        <span class="H(100%) W(100%) Cur(p) Pos(a) D(f) Jc(c) Ai(c) Fz(18px) Op(1):h Op(0)">
          <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) Bgc(black) Bdrs(100%)">
            <i class="fas fa-play"></i>
          </span>
        </span>
      </div>
      <div>
        <div class="Mt(6px) Px(4px) Cur(p) Td(u):h Fz(14px) Fw(b)">New Dance Now</div>
        <span class="Mt(6px) Px(4px) Cur(p) Td(u):h Fz(12px) C(gray)">Main Room</span>
      </div>
    </div>;
  }
}
