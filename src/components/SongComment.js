import React from 'react';

export default class SongComment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      hover: false,
    };
  }

  render() {
    const {hover} = this.state;

    return <div class="D(ib) W(20px)">
      <img class="H(20px) W(20px) " onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})} src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/>
      <div class={'Trsdu(700ms) Pt(10px) Bdstarts(s) Bdstartc(orangered) Bdstartw(1px) ' + (hover ? 'Op(1)' : 'Op(0)')}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}>
        <span class="C(orangered) Mx(6px) Fw(600) Fz(14px)">Bob</span>
        <span class="Fz(14px) C(white)">comment</span>
      </div>
    </div>;
  }
}
