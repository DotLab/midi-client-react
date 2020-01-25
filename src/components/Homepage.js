import React from 'react';
import MusicScroll from './MusicScroll';
import {NEW_RELEASES, TRENDING, FAVORED, DEFAULT_LIMIT, FAVORED_DESCRIPTION, NEW_DESCRIPTION, TRENDING_DESCRIPTION} from './utils';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      newReleases: [],
      trending: [],
      favored: [],
    };
  }

  async componentDidMount() {
    const newReleases = await this.app.newReleases({limit: DEFAULT_LIMIT});
    const trending = await this.app.trending({limit: DEFAULT_LIMIT});
    this.setState({newReleases, trending});
    if (this.app.state.token) {
      const favored = await this.app.favored({token: this.app.state.token});
      this.setState({newReleases, favored});
    }
  }

  render() {
    const {newReleases, trending, favored} = this.state;

    return <div class="W(80%) Mx(a)">
      <MusicScroll title={NEW_RELEASES} description={NEW_DESCRIPTION} listings={newReleases}/>
      {favored && <MusicScroll title={FAVORED} description={FAVORED_DESCRIPTION} listings={favored}/>}
      <MusicScroll title={TRENDING} description={TRENDING_DESCRIPTION} listings={trending}/>
    </div>;
  }
}
