import React, {Component} from 'react';
import {View} from 'react-native';
import {array, object, string} from 'prop-types';

export default class Circle extends Component {
  render() {
    const diameter = this.props.diameter;
    const x = this.props.body.position.x - diameter / 2;
    const y = this.props.body.position.y - diameter / 2;

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: diameter,
          height: diameter,
          borderRadius: 25,
          backgroundColor: this.props.bgColor,
          borderWidth: 3,
          borderColor: this.props.borderColor,
        }}
      />
    );
  }
}

Circle.propTypes = {
  size: array,
  body: object,
  color: string,
};
