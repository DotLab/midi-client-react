import React from 'react';
import MusicScroll from './MusicScroll';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      newReleases: [],
      popular: [],
      recent: [],
    };
  }

  async componentDidMount() {
    // const newReleases = await this.app.newReleases();
    // const popular = await this.app.popular();
    // this.setState({newReleases, popular});
    // if (this.app.state.token) {
    //   const recent = await this.app.recent({token: this.app.state.token});
    //   this.setState({newReleases, recent});
    // }
  }

  render() {
    return <div class="W(80%) Mx(a)">
      <MusicScroll/>
      <MusicScroll/>
      <MusicScroll/>
    </div>;
  }
}
