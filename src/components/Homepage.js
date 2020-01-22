import React from 'react';
import MusicScroll from './MusicScroll';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
  }

  render() {
    return <div class="W(80%) Mx(a)">
      <MusicScroll/>
      <MusicScroll/>
      <MusicScroll/>
    </div>;
  }
}
