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
      collapsed: false,
    };

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    if (this.app.state.user) {
      this.setState(this.app.state.user);
    }
  }

  async logout() {
    await this.app.userLogOut();
  }

  render() {
    const {collapsed} = this.state;
    const loggedIn = this.app.state.user;
    let avatarUrl = '';
    if (this.app.state.user) {
      avatarUrl = this.app.state.user.avatarUrl;
    }

    return <div>
      <div class="W(100%) H(60px) bg-dark D(f) Jc(sa)">
        <div class="Lh(60px) C(white)">
          <Link to="/" class="C(#ec84a2) C(#ec84a2):h Td(n):h">
            <span class="Fz(22px) Fw(600)">Scarletea</span>
            <span class="Mstart(8px) Fz(20px)">Midi</span>
          </Link>
          <Link class="Mstart(20px) Td(n):h C(white) C($pink):h Fz(16px)" to="/">Home</Link>
          {this.app.state.user && <Link class="Mstart(20px) Td(n):h C(white) C($pink):h Fz(16px)" to="/you/library/likes">Library</Link>}
        </div>
        <div>
          <span class="Lh(60px) D(ib)">
            <form>
              <input class={INPUT_STYLE}/>
            </form>
          </span>
          {!loggedIn && <span>
            <Link to="/login" class="Bds(s) Bdw(1px) Bdrs(4px) Py(4px) Px(8px) Fz(16px) Mstart(20px) C(white) C($pink):h Td(n):h">Sign in</Link>
            <Link to="/register" class="Bds(s) Bdw(1px) Bdrs(4px) Py(4px) Px(8px) C($pink):h Fz(16px) Mstart(20px) C($pink) Td(n):h">Create account</Link>
          </span>}
          {loggedIn && <div class="D(ib) Pos(r)">
            <div>
              <Link to="/upload" class="Bds(s) Bdw(1px) Bdrs(4px) Mend(20px) Py(4px) Px(8px) Fz(16px) Mstart(20px) C(#ec84a2) C(#ec84a2):h Td(n):h">Upload</Link>
              {!avatarUrl && <span onClick={() => this.setState({collapsed: true})}><i class="fas fa-user Mx(4px) C(white)"></i></span>}
              {avatarUrl && <img class="W(30px) H(30px) Bdrs(4px) Mx(4px)" src={avatarUrl} alt="avatar"></img>}
              <span onClick={() => this.setState({collapsed: true})}><i class="fas fa-caret-down C(white)"></i></span>
            </div>
            <ul class={'Pos(a) D(b) W(30px) Px(4px) H(34px) T(0) End(-2px) Mt(40px) Bdc(t) ' + (collapsed ? 'Op(1)' : 'Op(0)')} onMouseLeave={() => this.setState({collapsed: false})}>
              <Link to={{pathname: `/${this.app.state.user.userName}/all`}} class="D(b) Td(n):h C(white):h bg-dark C(white) Fz(16px) W(120px) Px(10px) Py(2px)">Profile</Link>
              <Link to="/you/library/likes" class="D(b) Td(n):h C(white):h bg-dark C(white) Fz(16px) W(120px) Px(10px) Py(2px)">Likes</Link>
              <Link to="/you/library/following" class="D(b) Td(n):h C(white):h bg-dark C(white) Fz(16px) W(120px) Px(10px) Py(2px)">Following</Link>

              <Link to="/settings/profile" class="D(b) Td(n):h C(white):h bg-dark C(white) Fz(16px) W(120px) Px(10px) Py(2px)">Settings</Link>
              <li onClick={this.logout} class="D(b) C(white):h Cur(p) Bgc(#343a40) Bgc(black):h C(white) Fz(16px) W(120px) Px(10px) Py(2px)">Sign out</li>
            </ul>
          </div>
          }
        </div>
      </div>
    </div>;
  }
}
