import React from 'react';
import TrackComment from './TrackComment';
import Comment from './Comment';
import Lisa from './Lisa.jpg';
import TrackSmall from './TrackSmall';
import AlbumSmall from './AlbumSmall';
import {Link} from 'react-router-dom';
import TrackPanel from './TrackPanel';
import {formatDate, onChange, DEFAULT_LIMIT} from '../utils';
import Track from './Track';

export default class TrackDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.state = {
      trackId: this.props.match.params.trackId,
      playing: false,
      artistId: null,
      artistName: '',
      artistAvatarUrl: null,
      title: '',
      coverUrl: '',
      colors: [[223, 244, 228], [116, 76, 55], [80, 66, 50]],
      trackUrl: '',
      releaseDate: null,
      avatarUrl: null,
      comment: '',
      followingCount: 0,
      trackCount: 0,
      commentCount: 0,
      comments: [],
    };

    this.onChange = onChange.bind(this);
    this.play = this.play.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  async componentDidMount() {
    const track = await this.app.trackDetail({trackId: this.props.match.params.trackId});
    this.setState(track);
    if (this.app.state.user) {
      this.setState({avatarUrl: this.app.state.user.avatarUrl});
    }
    const artist = await this.app.artistInfo({artistId: this.state.artistId});
    this.setState(artist);
    const comments = await this.app.trackCommentList({token: this.app.state.token, trackId: this.props.match.params.trackId, limit: DEFAULT_LIMIT});
    this.setState({comments});

    console.log(this.state);
  }

  async play(e) {
    e.preventDefault();
    const playing = !(this.state.playing);
    const audio = new Audio(this.state.trackUrl);
    audio.type = 'audio/midi';
    await audio.play();
    this.setState({playing});
  }

  handleComment(e) {
    e.preventDefault();
    if (!this.app.state.user) {
      this.app.saveUrl(this.props.location.pathname);
      this.props.history.push('/login');
    }
  }

  async createComment(e) {
    e.preventDefault();
    await this.app.createComment({token: this.app.state.token, trackId: this.state.trackId, comment: this.state.comment, timestamp: 0});
    const comments = await this.app.trackCommentList({token: this.app.state.token, trackId: this.props.match.params.trackId, limit: DEFAULT_LIMIT});
    this.setState({comments});
  }

  async deleteComment({commentId}) {
    await this.app.deleteComment({token: this.app.state.token, commentId});
    const comments = await this.app.trackCommentList({token: this.app.state.token, trackId: this.props.match.params.trackId, limit: DEFAULT_LIMIT});
    this.setState({comments});
  }

  render() {
    const {playing, artistName, artistAvatarUrl, title, coverUrl, colors, trackUrl, releaseDate, avatarUrl,
      comment, followingCount, trackCount, commentCount, comments} = this.state;

    return <div class="W(80%) Mx(a)">
      <audio autoPlay src="https://soundcloud.com/lea-190346201/sword-art-online-crossing-field-sao-op-1">

      </audio>
      <div class="D(f) P(20px) My(20px) Miw(800px)" style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
        rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}>
        <div class="W(70%)">
          <div class="D(f) Jc(sb)">
            <div class="D(f)">
              <span class="C(white) W(50px) H(50px) D(f) Jc(c) Ai(c) P(4px) bg-dark Bdrs(100%)" onClick={this.play}>
                {!playing && <span><i class="fas fa-play"></i></span>}
                {playing && <span><i class="fas fa-pause"></i></span>}
              </span>
              <div class="Mx(20px)">
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) My(4px) Fz(16px)">{artistName}</div>
                <div class="bg-dark C(white) Py(2px) Px(8px) W(maxc) Fz(18px)">{title}</div>
              </div>
            </div>
            <span class="Fl(end) C(white)">{formatDate(releaseDate)}</span>
          </div>
          <div class="Mt(60px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) H(26px)">
            <span class="Fl(end) bg-dark Mb(10px) Px(8px) C(lightgray) Fz(14px)">0:29</span>
          </div>
          {comments.map((comment) => <TrackComment key={comment._id} id={comment._id}
            commentAuthorId={comment.commentAuthorId} commentAuthorName={comment.commentAuthorName}
            commentAuthorAvatarUrl={comment.commentAuthorAvatarUrl} body={comment.body} date={comment.date}
            timestamp={comment.timestamp}/>)}
        </div>
        <div class="Mstart(30px) W(30%)">
          <img class="H(100%) W(100%) " src={coverUrl} alt=""/>
        </div>
      </div>
      <div class="D(f)">
        <div class="W(70%) Miw(700px) Pend(30px) Bdends(s) Bdendw(1px) Bdendc(#f2f2f2)">
          <div class="H(40px) Bgc(#f2f2f2) D(f) Ai(c)">
            {!avatarUrl && <div class="D(ib) Mend(6px) H(100%) W(44px)" style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
              rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}/>}
            {avatarUrl && <img class="Mend(6px) H(100%) W(44px)" src={avatarUrl} alt="avatar"/>}
            <form class="W(100%)" onSubmit={this.createComment}>
              <input name="comment" value={comment} onChange={this.onChange} onFocus={this.handleComment} class="O(n) H(28px) Bdc(t) Bdrs(4px) P(4px) W(90%) Mend(6px)" placeholder="Write a comment"/>
              <button class="D(ib) Op(0)" type="submit" onClick={this.createComment}/>
            </form>
          </div>

          <div class="D(f) Jc(sb) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Ai(b) Pb(10px)">
            <TrackPanel/>
            <div>
              <span class="Fz(14px) Mend(20px) C(#999999)"><i class="Fz(12px) Mend(2px) fas fa-play"></i> 34k</span>
              <span class="Fz(14px) C(#999999)"><i class="Mend(2px) fas fa-heart"></i> 34k</span>
            </div>
          </div>
          <div class="D(f) Mt(20px)">
            <div>
              {!artistAvatarUrl && <div class="D(ib) H(120px) W(120px)" style={{background: `linear-gradient(135deg, rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.6), 
              rgba(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}, 0.5), rgba(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]}, 0.5))`}}/>}
              {artistAvatarUrl && <img class="H(120px) W(120px)" src={artistAvatarUrl} alt=""/>}

              <div class="Mt(10px)">{artistName}</div>
              <span data-toggle="tooltip" title={`${followingCount} followers`} class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-user-friends"></i> {followingCount}</span>
              <span data-toggle="tooltip" title={`${trackCount} tracks`} class="Mend(10px) Fz(14px) C(#999999)"><i class="fas fa-list"></i> {trackCount}</span>
              <button class="D(b) Bdc(t) Bdrs(4px) Px(8px) Bgc($pink) C(white) Fz(14px) Mt(10px) H(28px)">Follow</button>
            </div>
            <div class="Mstart(20px) W(100%)">
              <div>
                <div class="Mt(10px) Fw(600) Fz(16px)">Released date:</div>
                <div class="Fz(14px)">{formatDate(releaseDate)}</div>
                <div class="Mt(14px) Fz(16px) C(#999999) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2) Py(4px)">comments</div>
              </div>
              {comments.map((comment) => <Comment key={comment._id} id={comment._id}
                commentAuthorId={comment.commentAuthorId} commentAuthorName={comment.commentAuthorName}
                commentAuthorAvatarUrl={comment.commentAuthorAvatarUrl} body={comment.body} date={comment.date}
                timestamp={comment.timestamp} colors={colors} isOwner={comment.isOwner} deleteComment={this.deleteComment}/>)}

            </div>
          </div>

        </div>

        <div class="Px(30px) Miw(380px)">
          <div class="C(#999999) Fz(16px) Py(4px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>Related tracks</span>
            <Link to="/track/related" class="C(#999999) Td(n):h C(black):h"><span class="Fl(end)">View all</span></Link>
          </div>
          <TrackSmall/>
          <TrackSmall/>
          <TrackSmall/>
          <TrackSmall/>

          <div class="C(#999999) Fz(16px) Mt(30px) Bdbs(s) Bdbw(1px) Bdbc(#f2f2f2)">
            <span>In albums</span>
            <Link to="/track/related" class="C(#999999) Td(n):h C(black):h"><span class="Fl(end)">View all</span></Link>
          </div>
          <AlbumSmall/>

        </div>
      </div>


    </div>;
  }
}
