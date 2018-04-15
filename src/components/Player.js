import React, { Component } from 'react';

class Player extends Component {
  render() {
    var herostyle= {
        width:300/this.props.size.width,
        height:300/this.props.size.height
       };
    return (
        <img src="hero.png" style={herostyle} alt="hero"/>
    );
  }
}

export default Player;
