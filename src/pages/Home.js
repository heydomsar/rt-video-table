import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import ShowTable from '../components/ShowTable';

class Home extends Component {
  render() {
    const styles = {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'start',
        justifyContent: 'center'
      },
    };

    return (
        <div>
          <AppBar title="Rooster Teeth" />
          <div style={styles.wrapper}>
            <ShowTable />
          </div>
        </div>
    )
  }
}

export default Home;
