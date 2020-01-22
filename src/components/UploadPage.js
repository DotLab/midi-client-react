import React from 'react';
const MAX_SIZE = 31457280;
const INPUT_STYLE = 'W(100%) H(30px) Fz(16px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)';


export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;

    this.state = {
      inputKey: '',
      buffers: [1],
      fileNames: [],
      fileSizes: [],

      pictureUrl: 'a',
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
    const {buffers, pictureUrl} = this.state;
    return <div class="W(80%) Mx(a) My(80px) Miw(800px)">
      {!buffers.length && <div class=" D(ib) W(100%) Miw(600px) Ta(c) H(400px) shadow p-2 round">
        <div class="Py(80px)">
          <label class="Fz(22px)">Upload your tracks and albums here</label>
          <div class="Fz(12px) Pstart(40px) My(20px) Pos(r)">
            <input class="Cur(p) Pos(a) Op(0) W(300px) H(40px)"
              key={this.state.inputKey} multiple type="file" name="file"
              accept=".WAV, .FLAC, .AIFF, .ALAC, .OGG, .MP2, .MP3, .AAC, .AMR, .WMA"
              onChange={this.onFileChange}/>
            <button class="Bgc(#ec84a2) Miw(300px) Fz(20px) C(white) Bdc(t) Bdrs(4px) Py(10px)">Choose files to upload</button>
          </div>
          <div class="Mt(140px) Fz(16px)">
          Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.
          </div>
        </div>
      </div>}

      {buffers.length !== 0 && <div class="shadow p-2 round">
        <div class="D(f) P(20px) Pos(r)">
          {!pictureUrl && <div class="H(260px) W(260px)" style={{background: 'linear-gradient(135deg, #956E53, #70929c)'}} ></div>}
          <button class="Pos(a) Mt(200px) Mstart(40px) Px(8px) Bdrs(4px) Bdc(t)"><i class="Mend(4px) fas fa-camera"></i> Upload image</button>
          {pictureUrl && <img class="H(260px) W(260px)" src="https://avatarfiles.alphacoders.com/144/144488.jpg" alt=""/>}

          <div class="W(60%) Mstart(20px)">
            <div>
              <div class="Fz(16px) Fw(600) Mb(8px)">Title <span class="C(#cf0000)">*</span></div>
              <input class={INPUT_STYLE} placeholder="Name your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(16px) Fw(600) Mb(8px)">Tags</div>
              <input class={INPUT_STYLE} placeholder="Add tags to describe the genre and mood of your track"/>
            </div>

            <div class="Mt($m-control)">
              <div class="Fz(16px) Fw(600) Mb(8px)">Description</div>
              <textarea class="W(100%) H(160px) Fz(16px) O(n) Bdrs(4px) Bdc(#ccc) Bdw(1px) Px(6px) Py(2px)" placeholder="Describe your track"/>
            </div>

            <div class="Mt(40px) Fl(end)">
              <span class="Fz(12px) Fw(600)">By uploading, you confirm that your sounds comply with our
              Terms of Use and you don't infringe anyone else's rights.</span>
            </div>

            <div class="Mt(10px) Fl(end)">
              <span class="Fz(16px) Mx(20px) Cur(p)" onClick={() => this.setState({buffers: [], fileNames: [], fileSizes: []})}>Cancel</span>
              <button class="Bdc(t) Bdrs(4px) Px(8px) Bgc(#ec84a2) C(white) Fz(14px) Mt(10px) H(28px)">Save</button>
            </div>
          </div>

        </div>
      </div>}
    </div>;
  }
}
