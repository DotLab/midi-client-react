import React from 'react';

export default class TrackPanel extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    const isOwner = true;

    return <div class="Mt(10px) D(f)">
      <span data-toggle="tooltip" title="like" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-heart"></i></span>
      <span data-toggle="tooltip" title="add to next up" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-plus"></i></span>
      {isOwner && <span data-toggle="tooltip" title="edit" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-pen"></i></span>}
      {isOwner && <span data-toggle="tooltip" title="delete" class="Bds(s) Bdw(1px) Bdc(lightgray) Px(8px) Fz(12px) Py(2px) Bdrs(4px) Mend(6px) Cur(p)"><i class="fas fa-trash"></i></span>}
    </div>;
  }
}
