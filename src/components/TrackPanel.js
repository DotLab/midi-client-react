import React from 'react';

export default class TrackPanel extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const {isOwner, signedUrl, liked} = this.props;
    return <div class="Mt(10px) D(f)">
      {!liked && <span onClick={this.props.like} data-toggle="tooltip" title="like" class="Bds(s) C($pink):h Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-heart"></i></span>}
      {liked && <span onClick={this.props.unlike} data-toggle="tooltip" title="liked" class="Bds(s) C($pink) Bdw(1px) Bdc(lightgray) Bdc($pink):h Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-heart"></i></span>}
      <a download href={signedUrl} data-toggle="tooltip" title="download" class="C(black) C($pink):h Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-download"></i></a>
      <span data-toggle="tooltip" title="add to next up" class="Bds(s) C($pink):h Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-plus"></i></span>
      {isOwner && <span data-toggle="tooltip" title="edit" class="Bds(s) C($pink):h Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-pen"></i></span>}
      {isOwner && <span data-toggle="tooltip" title="delete" class="Bds(s) C($pink):h Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-trash"></i></span>}
    </div>;
  }
}
