import React, { Component } from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from './pages/Home';
import Store from './Store';

useStrict(true);

class App extends Component {

  componentWillMount() {
    Store.loadData();
  }

  render() {
    return (
      <Provider store={Store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Home />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
