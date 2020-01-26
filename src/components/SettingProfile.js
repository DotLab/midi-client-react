import React from 'react';
import {onChange} from '../utils';
import ReactMarkdown from 'react-markdown';

const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bds(s) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';
const MAX_SIZE = 1048576;

export default class SettingProfile extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      displayName: '',

      overview: '',
      preview: false,
    };

    this.onChange = onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  async componentDidMount() {
    const userInfo = await this.props.userInfo();
    this.setState(userInfo);
  }

  async onFileChange(e) {
    if (!e.target.files[0]) return;
    const size = e.target.files[0].size;

    if (size > MAX_SIZE) {
      console.log('zip too large');
      return;
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      const binary = e.target.result;
      const buffer = btoa(binary);
      this.props.uploadAvatar({buffer});
    };
    fr.readAsBinaryString(e.target.files[0]);
  }

  async updateProfile(e) {
    e.preventDefault();
    this.props.updateProfile({displayName: this.state.displayName,
      overview: this.state.overview});
    const userInfo = await this.props.userInfo();
    this.setState(userInfo);
  }

  render() {
    const {displayName, overview, preview} = this.state;
    const {avatarUrl} = this.props;
    const hasAvatar = avatarUrl.length !== 0;

    return <div class="W(80%)">
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(#f2f2f2) Bdw(t) W(100%)">Public profile</div>
      <div class="D(f) Jc(sb)">
        <form class="W(64%) Px(12px) Bdrs($bdrs-panel) My(30px)">
          <div class="W(100%)">
            <span class="Fz(14px) Fw(600)">Display name</span>
            <input class={INPUT_STYLE} name="displayName" value={displayName} onChange={this.onChange} required/>
          </div>

          <div class="Mt($m-control)">
            <span class="Fz(14px) Fw(600)">Overview</span>
            <div>
              <span class={'Fz(14px) Cur(p) Mend(20px) ' + (preview ? '' : 'Fw(600)')} onClick={() => this.setState({preview: false})}>Edit</span>
              <span class={'Fz(14px) Cur(p) ' + (preview ? 'Fw(600)' : '')} onClick={() => this.setState({preview: true})}>Preview changes</span>
            </div>
            {!preview && <textarea class="Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px) W(100%) H(180px)" placeholder="Add an overview..." name="overview"
              onChange={this.onChange} value={overview}/>}
            {preview &&
              <div class="Bds(s) Bdw(2px) Bdc(lightgray) Px(10px) Py(10px) Mt(10px) W(maxc) Fz(14px)">
                <ReactMarkdown source={overview}/>
              </div>}
          </div>

          <button class="C(white) D(b) Bgc($pink) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" onClick={this.updateProfile}>Update profile</button>
        </form>
        <div class="W(30%) My(20px) Pos(r)">
          {!hasAvatar && <div class="H(260px) W(260px)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
          {hasAvatar && <img class="H(200px) Pos(a) Bdrs(4px) shadow p-3 rounded" src={avatarUrl} alt="1"/>}
          <span class="Fz(14px) Pos(a) Bgc(black) C(white) T(200px) Mstart(20px) Py(4px) Px(10px) Bdrs(8px)"><i class="fas fa-pen Mend(4px)"></i> Edit</span>
          <input class="Pos(a) H(260px) W(260px) Op(0) T(0)" type="file" name="file" onChange={this.onFileChange}/>
        </div>
      </div>
    </div>;
  }
}
