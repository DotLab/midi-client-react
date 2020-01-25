import React from 'react';
import {formatDate, formatTime} from '../utils';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      hoveringComment: false,
    };

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(e) {
    e.preventDefault();
    this.props.deleteComment({commentId: this.props.id});
  }

  render() {
    const {commentAuthorName, commentAuthorAvatarUrl, body, date, timestamp, colors, isOwner} = this.props;
    const {hoveringComment} = this.state;
    console.log(isOwner);

    return <div class="D(f) Mt(20px)" onMouseEnter={() => this.setState({hoveringComment: true})} onMouseLeave={() => this.setState({hoveringComment: false})}>
      {commentAuthorAvatarUrl && <img class="H(40px) W(40px) Bdrs(100%)" src={commentAuthorAvatarUrl} alt=""/>}
      {!commentAuthorAvatarUrl && <div class="D(ib) H(40px) W(40px) Bdrs(100%)" style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
              rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}/>}
      <div class="W(90%) Mstart(10px)">
        <div class="C(#999999) Fz(14px)">
          <span>{commentAuthorName} </span>at
          <span> {formatTime(timestamp)}</span>
          <span class="Fl(end)">{formatDate(date)}</span>
        </div>
        <div class="Fz(16px)">
          <span>{body}</span>
          {isOwner && <span onClick={this.deleteComment} class={'Fl(end) Fz(14px) Cur(p) ' + (hoveringComment ? 'Op(1)' : 'Op(0)')}><i class="fas fa-trash"></i> </span>}
        </div>
      </div>
    </div>;
  }
}
