import React, { Component } from 'react';

class Enemy extends Component {
  render() {
    var enemystyle= {
        width:300/this.props.size.width,
        height:300/this.props.size.height
        }
    return (
        <img src="enemy.png" style={enemystyle} alt="enemy"/>
    );
  }
}

export default Enemy;
