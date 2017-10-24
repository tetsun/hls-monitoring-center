import * as React from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonToolbar,
  FormGroup,
  ControlLabel, 
  Form } from 'react-bootstrap';
import MonitorBlock from './MonitorBlock';
import './Monitor.css';

export interface Props {
  mediaPlaylists?: Array<string>;
  error?: string;
  startMonitor?: (masterPlaylist: string) => void;
  stopMonitor?: () => void;
}

class Monitor extends React.Component<Props, Object> {

  private input: HTMLInputElement;
  private columns: HTMLInputElement;
  
  constructor(props: Props) {
    super(props);
    this.onClickStartButton = this.onClickStartButton.bind(this);
    this.onClickStopButton  = this.onClickStopButton.bind(this);
  }

  render() {
    const { mediaPlaylists = new Array<string>(), error = '' } = this.props;
    const blockNum = mediaPlaylists.length;
    
    let blockList = [];
    for (let i = 0; i < blockNum; i++) {
      blockList.push(
        <Col sm={12 / parseInt(this.columns.value, 10)} className="monitorBlock" key={mediaPlaylists[i]}>
          <p>{mediaPlaylists[i]}</p>
          <MonitorBlock mediaPlaylist={mediaPlaylists[i]} />
        </Col>
      );
    }

    return (
      <Grid className="monitor">
        <Row>
          <Col sm={12} className="monitorBar">
            <Form>
              <Col sm={8}>
                <FormGroup>
                  <ControlLabel>M3U8</ControlLabel>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=""
                    ref={c => this.input = c as HTMLInputElement}
                  />
                </FormGroup>
              </Col>
              <Col sm={4}>
                <FormGroup>
                  <ControlLabel>Columns</ControlLabel>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue="2"
                    min="1"
                    max={Math.max(1, mediaPlaylists.length)}
                    ref={c => this.columns = c as HTMLInputElement}
                    onChange={this.onClickStartButton}
                  />
                </FormGroup>
              </Col>
              <Col sm={12}>
                <ButtonToolbar>
                  <Button bsStyle="primary" className="startButton" onClick={this.onClickStartButton}>Start</Button>
                  <Button bsStyle="danger" className="stopButton"  onClick={this.onClickStopButton}>Stop</Button>
                </ButtonToolbar>
              </Col>
            </Form>
            <p>{error}</p>
          </Col>
        </Row>
        <Row className="monitorBlocks">
          <Col sm={12}>
            {blockList}
          </Col>
        </Row>
      </Grid>
    );
  }
  
  onClickStartButton() {
    Array.prototype.forEach.call(document.querySelectorAll('video'), (video: HTMLVideoElement) => {
      video.play();
    });
    const { startMonitor = () => { return; } } = this.props;
    startMonitor(this.input.value);
  }
  
  onClickStopButton() {
    Array.prototype.forEach.call(document.querySelectorAll('video'), (video: HTMLVideoElement) => {
      video.pause();
    });
    const { stopMonitor = () => { return; } } = this.props;
    stopMonitor();
  }
}

export default Monitor;
