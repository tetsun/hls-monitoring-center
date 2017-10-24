import Monitor, { Props } from '../components/Monitor';
import * as actions from '../actions/Monitor';
import { State } from '../types';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ monitor: state }: State): Props {
  return {
    mediaPlaylists: state.mediaPlaylists,
    error: state.error,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.MonitorAction>): Props {
  return {
    startMonitor: (masterPlaylist: string) => dispatch(actions.startMonitorIfNeeded(masterPlaylist)),
    stopMonitor:  () => dispatch(actions.stopMonitor()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
