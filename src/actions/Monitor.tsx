import { Dispatch } from 'react-redux';
import * as constants from '../constants/Monitor';
import { MonitorState } from '../types/Monitor';
const m3u8Parser = require('m3u8-parser');

export interface StartMonitorRequest {
  type: constants.START_MONITOR_REQUEST;
}

export interface StartMonitorFailure {
  type: constants.START_MONITOR_FAILURE;
  error: string;
}

export interface StartMonitorSuccess {
  type: constants.START_MONITOR_SUCCESS;
  mediaPlaylists: Array<string>;
}

export interface StopMonitor {
  type: constants.STOP_MONITOR;
}

export type MonitorAction = StartMonitorRequest | StartMonitorFailure | StartMonitorSuccess | StopMonitor;

export function startMonitorRequest(): StartMonitorRequest {
  return {
    type: constants.START_MONITOR_REQUEST,
  };
}

export function startMonitorFailure(): StartMonitorFailure {
  return {
    type: constants.START_MONITOR_FAILURE,
    error: 'Start Monitor Failure',
  };
}

export function startMonitorSuccess(mediaPlaylists: Array<string>): StartMonitorSuccess {
  return {
    type: constants.START_MONITOR_SUCCESS,
    mediaPlaylists: mediaPlaylists,
  };
}

function startMonitor(masterPlaylist: string): any {
  return (dispatch: Dispatch<MonitorAction>) => {
    dispatch(startMonitorRequest());
    return fetch(masterPlaylist)
      .then(res => res.text())
      .then(body => {
        const baseUrl = masterPlaylist.substr(0, masterPlaylist.lastIndexOf('/') + 1);
        const parser = new m3u8Parser.Parser();
        let mediaPlaylists = new Array<string>();
        parser.push(body);
        parser.end();
        if (parser.manifest.playlists) {
          parser.manifest.playlists.forEach((playlist: any) => {
            mediaPlaylists.push(baseUrl + playlist.uri);
          });
        } else {
          mediaPlaylists.push(masterPlaylist);
        }
        dispatch(startMonitorSuccess(mediaPlaylists));
      })
      .catch(() => {
        dispatch(startMonitorFailure());
      });
  }; 
}

export function startMonitorIfNeeded(masterPlaylist: string): any {
  return (dispatch: Dispatch<MonitorAction>, getState: () => MonitorState)  => {
    if (getState().isFetchting) {
      return Promise.resolve();
    } else {
      return dispatch(startMonitor(masterPlaylist));
    }
  };
}

export function stopMonitor() {
  return {
    type: constants.STOP_MONITOR,
    isPlaying: false,
  };
}
