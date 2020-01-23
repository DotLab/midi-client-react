import React from 'react';
import {ALBUMS, BASIC, TRACKS} from './utils';
import EditAlbumTrack from './EditAlbumTrack';
const MAX_SIZE = 31457280;
const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';


export default class EditPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      inputKey: '',
      buffers: [1],
      fileNames: [],
      fileSizes: [],

      pictureUrl: 'a',
      tab: TRACKS,
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(e) {
    if (!e.target.files[0]) return;

    for (let i = 0; i < e.target.files.length; i++) {
      const name = e.target.files[i].name;
      const size = e.target.files[i].size;

      if (size > MAX_SIZE) {
        console.log('file too large');
        return;
      }

      const fr = new FileReader();
      fr.onload = (e) => {
        const binary = e.target.result;
        const buffer = btoa(binary);

        const buffers = this.state.buffers;
        buffers.push(buffer);
        const fileNames = this.state.fileNames;
        fileNames.push(name);

        this.setState({buffers, name, size: size});
      };
      fr.readAsBinaryString(e.target.files[i]);
    }
  }

  render() {
    const {type} = this.props;
    const {pictureUrl, tab} = this.state;

    return <div class="W(80%) Mx(a) My(80px) Miw(800px) Py(10px)">
      <div class="shadow p-2 round">
        {type === ALBUMS && <div class="Fw(b) Mx(20px) My(20px) Py(8px) Px(20px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
          <span onClick={() => this.setState({tab: BASIC})} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === BASIC ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Basic</span>
          <span onClick={() => this.setState({tab: TRACKS})} class={'Px(20px) Cur(p) Td(n):h Py(9px) Bdbc($pink):h C($pink):h  Bdbs(s):h Bdbw(2px) ' + (tab === TRACKS ? 'C($pink) Bdbs(s)' : 'C(gray)')}>Tracks</span>
        </div>}

        {(type === TRACKS || tab === BASIC) && <div class="D(f) Px(20px) Py(10px) Pos(r)">
          {!pictureUrl && <div class="H(260px) W(260px)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
          <button class="Pos(a) Mt(200px) Mstart(40px) Px(8px) Bdrs(4px) Bdc(t)"><i class="Mend(4px) fas fa-camera"></i> Upload image</button>
          {pictureUrl && <img class="H(260px) W(260px)" src="https://avatarfiles.alphacoders.com/144/144488.jpg" alt=""/>}

          <div class="W(60%) Mstart(20px)">
            <div>
              <div class="Fz(14px) Fw(600) Mb(4px)">Title <span class="C(#cf0000)">*</span></div>
              <input class={INPUT_STYLE} placeholder="Name your track"/>
            </div>

            {type === ALBUMS && <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Playlist type</div>
              <select class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option>Album</option>
                <option>EP</option>
                <option>Single</option>
              </select>
            </div>}

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Genre</div>
              <select class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value={'none'}>None</option>
                <option value={'Alternative'}>Alternative Rock</option>
                <option value={'Ambient'}>Ambient</option>
                <option value={'Classical'}>Classical</option>
                <option value={'Country'}>Country</option>
                <option value={'Dance'}>Dance &amp; EDM</option>
                <option value={'Dancehall'}>Dancehall</option>
                <option value={'Deep'}>Deep House</option>
                <option value={'Disco'}>Disco</option>
                <option value={'Drum'}>Drum &amp; Bass</option>
                <option value={'Dubstep'}>Dubstep</option>
                <option value={'Electronic'}>Electronic</option>
                <option value={'Folk'}>Folk &amp; Singer-Songwriter</option>
                <option value={'Hip'}>Hip-hop &amp; Rap</option>
                <option value={'House'}>House</option>
                <option value={'Indie'}>Indie</option>
                <option value={'Jazz'}>Jazz &amp; Blues</option>
                <option value={'Latin'}>Latin</option>
                <option value={'Metal'}>Metal</option>
                <option value={'Piano'}>Piano</option>
                <option value={'Pop'}>Pop</option>
                <option value={'R'}>R&amp;B &amp; Soul</option>
                <option value={'Reggae'}>Reggae</option>
                <option value={'Reggaeton'}>Reggaeton</option>
                <option value={'Rock'}>Rock</option>
                <option value={'Soundtrack'}>Soundtrack</option>
                <option value={'Techno'}>Techno</option>
                <option value={'Trance'}>Trance</option>
                <option value={'Trap'}>Trap</option>
                <option value={'Triphop'}>Triphop</option>
                <option value={'World'}>World</option>
              </select>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Tags</div>
              <input class={INPUT_STYLE} placeholder="Add tags to describe the genre and mood of your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Description</div>
              <textarea class="W(100%) H(160px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" placeholder="Describe your track"/>
            </div>

            <div class="Mt(40px) Fl(end)">
              <span class="Fz(12px) Fw(600)">By uploading, you confirm that your sounds comply with our
              Terms of Use and you don't infringe anyone else's rights.</span>
            </div>

            <div class="Mt(10px) Fl(end)">
              <span class="Fz(16px) Mx(20px) Cur(p)" onClick={() => this.setState({buffers: [], fileNames: [], fileSizes: []})}>Cancel</span>
              <button class="Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Save changes</button>
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
