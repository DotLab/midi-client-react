import React from 'react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="D(f) Mt(20px)">
      <img class="H(40px) W(40px) Bdrs(100%)" src="https://avatarfiles.alphacoders.com/128/128507.jpg" alt=""/>
      <div class="W(100%) Mstart(10px)">
        <div class="C(#999999) Fz(14px)">
          <span>Gary </span>at
          <span> 0:09</span>
          <span class="Fl(end)">3 days ago</span>
        </div>
        <div class="Fz(16px)">
        comment
        </div>
      </div>
    </div>;
  }
}
