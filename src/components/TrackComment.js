import React from 'react';

export default class TrackComment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      hover: false,
    };
  }

  render() {
    const {commentAuthorName, commentAuthorAvatarUrl, body, timestamp, duration, colors, textColor, Pt} = this.props;
    const {hover} = this.state;
    const pos = timestamp / duration * 100;

    return <div class="Pos(a) D(ib) W(20px)" style={{left: `${pos}%`}}>
      {commentAuthorAvatarUrl &&<img class="D(b) H(20px) W(20px) " onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})} src={commentAuthorAvatarUrl} alt=""/>}
      {!commentAuthorAvatarUrl && <div class="H(20px) W(20px)" onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
              rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}/>}

      {/* <img class="H(20px) W(20px) " onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})} src="https://i1.sndcdn.com/artworks-EfwX4O5Coal6-0-t500x500.jpg" alt=""/> */}
      <div class={'Trsdu(700ms) W(maxc) Bdstarts(s) Bdstartc($pink-2) Bdstartw(1px) ' + (hover ? 'Op(1)' : 'Op(0)')} style={{paddingTop: Pt + 'px'}}
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}>
        <span class="C($pink-2) Mx(6px) Fw(600) Fz(14px)">{commentAuthorName}</span>
        <span class="Fz(14px) W(100%)" style={{color: textColor}}>{body}</span>
      </div>
    </div>;
  }
}
