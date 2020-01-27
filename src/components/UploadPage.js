import React from 'react';

import {onChange} from '../utils';
import {NONE, ALT_ROCK, AMBIENT, CLASSICAL, COUNTRY, DANCE, DANCEHALL, DEEPHOUSE, DISCO, DRUM, DUBSTEP,
  ELECTRONIC, FOLK, HIP, HOUSE, INDIE, JAZZ, LATIN, METAL, PIANO, POP, RNB, REGGAE, REGGAETON,
  ROCK, SOUNDTRACK, TECH, TRANCE, TRAP, TRIPHOP, WORLD, ALBUM, SINGLE} from './utils';
import Album from './Album';

const MAX_SIZE = 31457280;
const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bds(s) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';

export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.coverUpload = React.createRef();

    this.state = {
      existingAlbum: '',
      albums: [],

      inputKey: '',
      buffers: [],
      fileNames: [],
      fileSizes: [],

      albumTitle: '',
      coverUrl: null,
      coverBuffer: null,
      title: '',
      type: '',
      genre: '',
      tags: '',
      description: '',
    };

    this.onChange = onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
    this.uploadTracks = this.uploadTracks.bind(this);
  }

  async componentDidMount() {
    const albums = await this.app.getAllAlbums({token: this.app.state.token});
    this.setState({albums});
  }

  checkRequired() {
    const checkAlbum = this.state.type === SINGLE || (this.state.type === ALBUM && this.state.albumTitle.length !== 0);
    return this.state.coverUrl && this.state.title.length !== 0 && checkAlbum;
  }

  onFileChange(e) {
    if (!e.target.files[0]) return;
    if (e.target.files.length > 1) {
      this.setState({type: ALBUM});
    }

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

  async uploadTracks(e) {
    e.preventDefault();
    const {buffers, fileNames, fileSizes, coverUrl, title, albumTitle, type, genre, tags, description} = this.state;
    await this.app.uploadTracks({token: this.app.state.token, buffers, fileNames, fileSizes, coverUrl, title, albumTitle, type, genre, tags, description});
  }

  async onSelectAlbum(e) {
    /* eslint-disable-next-line no-invalid-this */
    this.setState({[e.target.name]: e.target.value});
    const coverUrl = this.app.getCoverUrl({albumTitle: e.target.value});
    this.setState({coverUrl});
    this.coverUpload.disabled = true;
  }


  render() {
    const {inputKey, existingAlbum, albums, buffers, fileNames, coverUrl, title, type, tags, description} = this.state;
    console.log(existingAlbum);

    return <div class="W(80%) Mx(a) My(80px) Miw(800px)">
      {fileNames.length !== 0 && <div class="Bdbs(s) Bdbc($pink)">
        {fileNames.map((name) => <div class="Fz(14px) Fw(600) Mend(10px)" key={name}>{name}</div>)}
      </div>}
      {!buffers.length && <div class=" D(ib) W(100%) Miw(600px) Ta(c) H(400px) shadow p-2 round">
        <div class="Py(80px)">
          <label class="Fz(22px) C(#999999)">Upload your Midi track here</label>
          <div class="Fz(12px) Pstart(40px) My(20px) Pos(r)">
            <input ref="coverUpload" class="Cur(p) Pos(a) Op(0) W(300px) H(40px)"
              key={inputKey} type="file" name="file"
              accept=".mp3, .mid, .wav"
              onChange={this.onFileChange}/>
            <button class="Bgc($pink) Miw(300px) Fz(20px) C(white) Bdc(t) Bdrs(4px) Py(10px)">Choose files to upload</button>
          </div>
          <div class="Mt(140px) Fz(16px)">
          Support file type: Midi
          </div>
        </div>
      </div>}

      {buffers.length !== 0 && <div class="shadow p-2 round">
        <div class="D(f) P(20px)">
          <div class="Pos(r)">
            {!coverUrl && <div class="H(260px) W(260px)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
            {coverUrl && <div><img class="H(260px) W(260px)" src={coverUrl} alt=""/></div>}
            <button class="Pos(a) T(200px) Mstart(40px) Px(8px) Bdrs(4px) Bdc(t) bg-dark C(white)"><i class="Mend(4px) fas fa-camera"></i> Upload image</button>
            <input class="Pos(a) T(0) H(260px) W(260px) Op(0)" type="file" onChange={this.onCoverChange} accept="image/png, image/jpeg, .jpg"/>
          </div>

          <div class="W(60%) Mstart(20px)">
            <div>
              <div class="Fz(14px) Fw(600) Mb(4px)">Title <span class="C(#cf0000)">*</span></div>
              <input required name="title" value={title} onChange={this.onChange} class={INPUT_STYLE} placeholder="Name your track"/>
            </div>

            {buffers.length === 1 && <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Type <span class="C(#cf0000)">*</span></div>
              <select required name="type" onChange={this.onChange} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value="invalid" disabled class="D(n)"></option>
                <option value={ALBUM}>Album</option>
                <option value={SINGLE}>Single</option>
              </select>
            </div>}

            {(buffers.length >= 1 && type === ALBUM) && <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Select from existing album or create new album <span class="C(#cf0000)">*</span></div>
              <select required name="existingAlbum" onChange={this.onChange} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value="invalid" disabled class="D(n)"></option>
                <option value="yes">Add to existing album</option>
                <option value="no">Create new album</option>
              </select>
            </div>}

            {type !== SINGLE && buffers.length >= 1 && existingAlbum === 'yes' && <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Select from albums <span class="C(#cf0000)">*</span></div>
              <select required name="albumTitle" onChange={this.onSelectAlbum} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value="invalid" disabled class="D(n)"></option>
                {albums.map((x) => <option key={x._id} value={x.title}>{x.title}</option>)}
              </select>
            </div>}

            {type !== SINGLE && buffers.length >= 1 && existingAlbum === 'no' && <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Album title <span class="C(#cf0000)">*</span></div>
              <input name="albumTitle" onChange={this.onChange} class={INPUT_STYLE} placeholder="Name your album"/>

            </div>}

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Genre</div>
              <select name="genre" onChange={this.onChange} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
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
              <span class="Fz(16px) Mx(20px) Cur(p)" onClick={() => this.setState({buffers: [], fileNames: [], fileSizes: []})}>Cancel</span>
              <button onClick={this.uploadTracks} disabled={!this.checkRequired()} class="Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Save</button>
            </div>
          </div>

        </div>
      </div>}

    </div>;
  }
}
