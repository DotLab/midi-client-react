import React from 'react';

import {onChange} from '../utils';
import {NONE, ALT_ROCK, AMBIENT, CLASSICAL, COUNTRY, DANCE, DANCEHALL, DEEPHOUSE, DISCO, DRUM, DUBSTEP,
  ELECTRONIC, FOLK, HIP, HOUSE, INDIE, JAZZ, LATIN, METAL, PIANO, POP, RNB, REGGAE, REGGAETON,
  ROCK, SOUNDTRACK, TECH, TRANCE, TRAP, TRIPHOP, WORLD, TRACK, ALBUM, EP, SINGLE} from './utils';

const MAX_SIZE = 31457280;
const INPUT_STYLE = 'W(100%) H(30px) Fz(14px) O(n) Bds(s) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';

export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      inputKey: '',
      buffers: [],
      fileNames: [],
      fileSizes: [],

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
    const {buffers, fileNames, fileSizes, coverUrl, title, type, genre, tags, description} = this.state;
    await this.app.uploadTracks({token: this.app.state.token, buffers, fileNames, fileSizes, coverUrl, title, type, genre, tags, description});
  }

  render() {
    const {inputKey, buffers, fileNames, coverUrl, title, tags, description} = this.state;

    return <div class="W(80%) Mx(a) My(80px) Miw(800px)">
      {fileNames.length !== 0 && <div class="Bdbs(s) Bdbc($pink)">
        {fileNames.map((name) => <div class="Fz(14px) Fw(600) Mend(10px)" key={name}>{name}</div>)}
      </div>}
      {!buffers.length && <div class=" D(ib) W(100%) Miw(600px) Ta(c) H(400px) shadow p-2 round">
        <div class="Py(80px)">
          <label class="Fz(22px) C(#999999)">Upload your tracks and/or albums here</label>
          <div class="Fz(12px) Pstart(40px) My(20px) Pos(r)">
            <input class="Cur(p) Pos(a) Op(0) W(300px) H(40px)"
              key={inputKey} multiple type="file" name="file"
              accept=".mid"
              onChange={this.onFileChange}/>
            <button class="Bgc($pink) Miw(300px) Fz(20px) C(white) Bdc(t) Bdrs(4px) Py(10px)">Choose files to upload</button>
          </div>
          <div class="Mt(140px) Fz(16px)">
          Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
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
              <input name="title" value={title} onChange={this.onChange} class={INPUT_STYLE} placeholder="Name your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(14px) Fw(600) Mb(4px)">Type</div>
              <select name="type" onChange={this.onChange} class="W(50%) H(30px) Fz(14px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" defaultValue="invalid">
                <option value="invalid" disabled class="D(n)"></option>
                <option value={TRACK}>Track</option>
                <option value={ALBUM}>Album</option>
                <option value={EP}>EP</option>
                <option value={SINGLE}>Single</option>
              </select>
            </div>

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
              <button onClick={this.uploadTracks} class="Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Save</button>
            </div>
          </div>

        </div>
      </div>}

    </div>;
  }
}
