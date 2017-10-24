import * as React from 'react';
import * as Hls from 'hls.js';

export interface Props {
  mediaPlaylist?: string;
}

class MonitorBlock extends React.Component<Props, Object> {

  private video: HTMLVideoElement;

  render() {
    return (
      <div className="hlsjs">
        <video ref={c => this.video = c as HTMLVideoElement} />
      </div>
    );
  }
  
  componentDidMount() {
    const mediaPlaylist = this.props.mediaPlaylist;
    if ( !mediaPlaylist ) { return; }
    
    const hls = new Hls();
    hls.loadSource(mediaPlaylist);
    hls.attachMedia(this.video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.video.play();
    });
  }
}

export default MonitorBlock;
