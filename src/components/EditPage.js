import React from 'react';
import {Link} from 'react-router-dom';
import {ALBUMS, BASIC, TRACKS, NONE, ALT_ROCK, AMBIENT, CLASSICAL, COUNTRY, DANCE, DANCEHALL, DEEPHOUSE, DISCO, DRUM, DUBSTEP,
  ELECTRONIC, FOLK, HIP, HOUSE, INDIE, JAZZ, LATIN, METAL, PIANO, POP, RNB, REGGAE, REGGAETON,
  ROCK, SOUNDTRACK, TECH, TRANCE, TRAP, TRIPHOP, WORLD, TRACK, ALBUM, EP, SINGLE} from './utils';

import {onChange} from '../utils';
import EditAlbumTrack from './EditAlbumTrack';
const MAX_SIZE = 31457280;
const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';


export default class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;


    this.state = {
      inputKey: '',

      coverUrl: null,
      coverBuffer: null,
      title: '',
      type: '',
      genre: '',
      tags: '',
      description: '',
    };

    this.onChange = onChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
    this.editTracks = this.editTracks.bind(this);
  }

  async componentDidMount() {
    const track = await this.app.trackDetail({trackId: this.props.match.params.trackId});
    this.setState(track);
  }

  onCoverChange(e) {
    if (!e.target.files[0]) return;

    const size = e.target.files[0].size;

    if (size > MAX_SIZE) {
      console.log('file too large');
      return;
    }
    const fr = new FileReader();
    fr.onload = (e) => {
      const binary = e.target.result;
      const coverBuffer = btoa(binary);
      this.uploadCover({coverBuffer});
    };
    fr.readAsBinaryString(e.target.files[0]);
  }

  async uploadCover({coverBuffer}) {
    const coverUrl = await this.app.uploadCover({token: this.app.state.token, buffer: coverBuffer});
    console.log(coverUrl);
    this.setState({coverUrl});
  }

  async editTracks(e) {
    e.preventDefault();
    const {coverUrl, title, type, genre, tags, description} = this.state;
    console.log(this.state.title);
    await this.app.editTracks({token: this.app.state.token, trackId: this.props.match.params.trackId,
      coverUrl, title, type, genre, tags, description});
  }

  render() {
    const {type} = this.props;
    const {tab, coverUrl, title, genre, tags, description} = this.state;

    return <div class="W(80%) Mx(a) My(80px) Miw(800px) Py(10px)">
      <div class="shadow p-2 round">
        {type === ALBUMS && <div class="Fw(b) Mx(20px) My(20px) Py(8px) Px(20px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
          <span onClick={() => this.setState({tab: BASIC})} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === BASIC ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Basic</span>
          <span onClick={() => this.setState({tab: TRACKS})} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Tracks</span>
        </div>}

        {(type === TRACKS || tab === BASIC) && <div class="D(f) Px(20px) Py(10px) Pos(r)">
          {!coverUrl && <div class="H(260px) W(260px)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
          <button class="Pos(a) Mt(200px) Mstart(40px) Px(8px) Bdrs(4px) Bdc(t)"><i class="Mend(4px) fas fa-camera"></i> Upload image</button>
          {coverUrl && <img class="H(260px) W(260px)" src={coverUrl} alt=""/>}

          <div class="W(60%) Mstart(20px)">
            <div>
              <div class="Fz(14px) Fw(600) Mb(4px)">Title <span class="C(#cf0000)">*</span></div>
              <input name="title" value={title} onChange={this.onChange} class={INPUT_STYLE} placeholder="Name your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Type</div>
              <select disabled name="type" value={type} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value="invalid" disabled class="D(n)"></option>
                <option value={TRACK}>Track</option>
                <option value={ALBUM}>Album</option>
                <option value={EP}>EP</option>
                <option value={SINGLE}>Single</option>
              </select>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Genre</div>
              <select name="genre" value={genre} onChange={this.onChange} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value={NONE}>None</option>
                <option value={ALT_ROCK}>Alternative Rock</option>
                <option value={AMBIENT}>Ambient</option>
                <option value={CLASSICAL}>Classical</option>
                <option value={COUNTRY}>Country</option>
                <option value={DANCE}>Dance &amp; EDM</option>
                <option value={DANCEHALL}>Dancehall</option>
                <option value={DEEPHOUSE}>Deep House</option>
                <option value={DISCO}>Disco</option>
                <option value={DRUM}>Drum &amp; Bass</option>
                <option value={DUBSTEP}>Dubstep</option>
                <option value={ELECTRONIC}>Electronic</option>
                <option value={FOLK}>Folk &amp; Singer-Songwriter</option>
                <option value={HIP}>Hip-hop &amp; Rap</option>
                <option value={HOUSE}>House</option>
                <option value={INDIE}>Indie</option>
                <option value={JAZZ}>Jazz &amp; Blues</option>
                <option value={LATIN}>Latin</option>
                <option value={METAL}>Metal</option>
                <option value={PIANO}>Piano</option>
                <option value={POP}>Pop</option>
                <option value={RNB}>R&amp;B &amp; Soul</option>
                <option value={REGGAE}>Reggae</option>
                <option value={REGGAETON}>Reggaeton</option>
                <option value={ROCK}>Rock</option>
                <option value={SOUNDTRACK}>Soundtrack</option>
                <option value={TECH}>Techno</option>
                <option value={TRANCE}>Trance</option>
                <option value={TRAP}>Trap</option>
                <option value={TRIPHOP}>Triphop</option>
                <option value={WORLD}>World</option>
              </select>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Tags</div>
              <input name="tags" value={tags} onChange={this.onChange} class={INPUT_STYLE} placeholder="Add tags to describe the genre and mood of your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Description</div>
              <textarea name="description" value={description} onChange={this.onChange} class="W(100%) H(160px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" placeholder="Describe your track"/>
            </div>

            <div class="Mt(40px) Fl(end)">
              <span class="Fz(12px) Fw(600)">By uploading, you confirm that your sounds comply with our
              Terms of Use and you don't infringe anyone else's rights.</span>
            </div>

            <div class="Mt(10px) Fl(end)">
              <Link to={{pathname: `/${this.props.match.params.userName}/${this.props.match.params.trackId}`}} class="Fz(16px) Mx(20px) Td(n):h C(black) C($pink):h">Cancel</Link>
              <button onClick={this.editTracks} class="Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Save changes</button>
            </div>
          </div>

        </div>}

        {(type === ALBUMS && tab === TRACKS) && <div class="Px(20px) Py(10px)">
          <table class="My(10px) table table-sm table-bordered">
            <tbody>
              <EditAlbumTrack/>
              <EditAlbumTrack/>
              <EditAlbumTrack/>
            </tbody>
          </table>

        </div>}
      </div>
    </div>;
  }
}
