import React, {PureComponent} from 'react';
import {StyleSheet, StatusBar, Dimensions, Button, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import Worm from './Worm';
import Circle from './Circle';

const {width, height} = Dimensions.get('screen');
const BALL_SIZE = Math.trunc(Math.max(width, height) * 0.085) / 4;
const WORM_SIZE = Math.trunc(Math.max(width, height) * 0.085) / 2;

const wormStartPoint = {
  x: width / 2,
  y: height / 2,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.startPoint = this._randomPoint();
    console.log('hi', this.startPoint);
    // create our dude
    const worm = this._createWorm();
    this.wormBoi = worm;
    // create our first ball
    const ball = this._createBall();
    this.firstBall = ball;
    // setup the world
    const {engine, world} = this._addObjectsToWorld(worm, ball);
    // keep track of our entities
    this.entities = this._getEntities(engine, world, worm, ball);
  }

  _randomPoint = () => {
    let random = Math.floor(Math.random() * 10);
    let gridXPart = width / 15;
    let gridYPart = height / 30;
    let x = Math.floor(random * 15);
    let y = Math.floor(random * 30);
    return {
      x: 10 + Math.floor(Math.random() * width - 20),
      y: 30 + Math.floor(Math.random() * height - 50),
    };
  };

  _resetBallPosition = () => {
    Matter.Body.setPosition(this.firstBall, this._randomPoint());
  };

  // physics for the engine
  _physics = (entities, {time}) => {
    let engine = entities['physics'].engine;
    // get rid of gravity, yo
    engine.world.gravity = {
      x: 0,
      y: 0,
    };
    Matter.Engine.update(engine, time.delta);
    return entities;
  };

  _moveWorm = (entities, {touches}) => {
    let move = touches.find(x => x.type === 'move');
    if (move) {
      const newPosition = {
        x: this.wormBoi.position.x + move.delta.pageX,
        y: this.wormBoi.position.y + move.delta.pageY,
      };
      Matter.Body.setPosition(this.wormBoi, newPosition);
    }

    return entities;
  };

  _getEntities = (engine, world, worm, ball) => {
    const entities = {
      physics: {
        engine,
        world,
      },
      worm: {
        body: worm,
        diameter: WORM_SIZE,
        bgColor: '#FF5877',
        borderColor: '#FFC1C1',
        renderer: Worm,
      },
      ball: {
        body: ball,
        diameter: BALL_SIZE,
        bgColor: '#458ad0',
        borderColor: '#56a4f3',
        renderer: Circle,
      },
    };

    return entities;
  };

  _addObjectsToWorld = (worm, ball) => {
    const engine = Matter.Engine.create({enableSleeping: false});
    const world = engine.world;

    Matter.World.add(world, [worm, ball]);

    return {
      engine,
      world,
    };
  };

  _createWorm = () => {
    const worm = Matter.Bodies.circle(
      wormStartPoint.x,
      wormStartPoint.y,
      WORM_SIZE,
    );
    return worm;
  };

  _createBall = () => {
    const ball = Matter.Bodies.circle(
      this.startPoint.x,
      this.startPoint.y,
      BALL_SIZE,
      {
        isStatic: true,
      },
    );
    return ball;
  };

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[this._physics, this._moveWorm]}
        entities={this.entities}>
        <View style={styles.header}>
          <Button
            onPress={this._resetBallPosition}
            title="Reset"
            color="#841584"
          />
        </View>
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
