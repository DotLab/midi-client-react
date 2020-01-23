import React from 'react';
import {onChange} from '../utils';

const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bds(s) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';


export default class SettingProfile extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      oldPassword: '',
      newPassword: '',
      passwordConfirm: '',
    };

    this.onChange = onChange.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  checkPasswordMatch() {
    return (this.state.newPassword === this.state.passwordConfirm);
  }

  async changePassword(e) {
    e.preventDefault();
    this.props.changePassword({oldPassword: this.state.oldPassword, newPassword: this.state.newPassword});
  }

  render() {
    return <div>
      <div class="Lh(60px) Fz(22px) Bdbs(s) Bdbc(#f2f2f2) Bdw(t)">Change password</div>
      <form class="Maw(300px) Px(12px) Bdrs($bdrs-panel) My(30px)">
        <div>
          <span class="Fz(14px) Fw(600)">Old password</span>
          <input class={INPUT_STYLE} type="password" name="oldPassword" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <span class="Fz(14px) Fw(600)">New password</span>
          <input class={INPUT_STYLE} type="password" name="newPassword" onChange={this.onChange} required/>
        </div>
        <div class="Mt($m-control)">
          <span class="Fz(14px) Fw(600)">Confirm new password</span>
          <input class={INPUT_STYLE} type="password" name="passwordConfirm" onChange={this.onChange} required/>
        </div>

        <button class="C(white) D(b) Bgc($pink) Bgc(black):h Py(4px) Mt($m-control) Bdrs($bdrs-control) Bdc(t)" disabled={!this.checkPasswordMatch()} onClick={this.changePassword}>Update pasword</button>
      </form>
    </div>;
  }
}
