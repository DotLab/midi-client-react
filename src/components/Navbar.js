import React from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';

const INPUT_STYLE = 'H(30px) Bdrs(4px) W(100%) Fz(14px) Fw(400) P(12px) Bdc(t) Bgc(#24292e) C(black) Bgc(white):f O(n)';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.query = queryString.parse(props.location.search);

    this.state = {
      q: '',
      avatarUrl: '',
    };
  }

  async componentDidMount() {
    if (this.app.state.user) {
      this.setState(this.app.state.user);
    }
  }


  render() {
    return <div>
      <div class="W(100%) H(60px) bg-dark D(f) Jc(sa)">
        <div class="Lh(60px) C(white)">
          <span class="Fz(22px) Fw(600)">Scarletea</span>
          <span class="Mstart(8px) Fz(20px)">Midi</span>
          <Link class="Mstart(20px) C(white) Fz(16px)" to="/">Home</Link>
          <Link class="Mstart(20px) C(white) Fz(16px)" to="/library">Library</Link>
        </div>
        <div>
          <span class="Lh(60px) D(ib)">
            <form>
              <input class={INPUT_STYLE}/>
            </form>
          </span>
          <span>
            <Link to="/login" class="Bds(s) Bdw(1px) Bdrs(4px) Py(4px) Px(8px) Fz(16px) Mstart(20px) C(white) Td(n):h">Sign in</Link>
            <Link to="/register" class="Bgc(#e95689) Bdrs(4px) Py(4px) Px(8px) C(white):h Fz(16px) Mstart(20px) C(white) Td(n):h">Create account</Link>
          </span>
        </div>
      </div>
    </div>;
  }
}
