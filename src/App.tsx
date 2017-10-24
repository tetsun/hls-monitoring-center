import * as React from 'react';
import { Provider } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import Monitor from './containers/Monitor';
import store from './configureStore';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>HLS MONITORING CENTER</Navbar.Brand>
            </Navbar.Header>
          </Navbar>
          <Monitor />
        </div>
      </Provider>
    );
  }
}

export default App;
