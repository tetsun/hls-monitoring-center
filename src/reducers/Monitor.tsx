import { MonitorAction } from '../actions/Monitor';
import { MonitorState } from '../types/Monitor';
import {
  START_MONITOR_REQUEST,
  START_MONITOR_FAILURE,
  START_MONITOR_SUCCESS,
  STOP_MONITOR } from '../constants/Monitor';

const initialState: MonitorState = {
  mediaPlaylists: new Array<string>(),
  error: '',
  isPlaying: false,
  isFetchting: false,
};

export function monitor(state: MonitorState = initialState, action: MonitorAction): MonitorState {
  switch (action.type) {
    case START_MONITOR_REQUEST:
      return { ...state, isFetchting: true };
    case START_MONITOR_FAILURE:
      return { ...state, isFetchting: false, error: action.error };
    case START_MONITOR_SUCCESS:
      return { ...state, isFetchting: false, isPlaying: true, mediaPlaylists: action.mediaPlaylists, error: '' };
    case STOP_MONITOR:
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}
