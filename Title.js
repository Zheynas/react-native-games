import React, {PureComponent} from 'react';
import App from './App';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openId: 'title',
    };
  }

  renderTitle = () => {
    return (
      <View style={styles.titleContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({openId: 'Game'});
            }}>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text>Score</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.openId === 'title' ? this.renderTitle() : <App />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 15,
    width: 200,
    height: 60,
    backgroundColor: 'pink',
  },
});
