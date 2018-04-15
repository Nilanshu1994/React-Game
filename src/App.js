import React, { Component } from 'react';
import './App.css';
import Player from './components/Player';
import Enemy from './components/Enemy';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      size : {height: 10,width:10},
      playerPosition:45,
      enemyPosition:[0],
      moves:0,
      }
    }

  componentDidMount(){
      const height = prompt("Enter the height of the box");
      const width = prompt("Enter the width of the box");
      if(height && width) this.setup(height,width);
      else this.setup(10,10);
      document.body.addEventListener('keydown',(e)=> this.keymap(e));
    }

  setup(height,width){
    const enemycount = (height*width) > 4 ? (height*width)/4 : 1;
    const middle = width * Math.floor(height/2) - Math.floor(width/2);
    var enemies = [];
       for(var i =0;i<enemycount;i++){
         var random = Math.floor(Math.random()*height*width);
         if(random === middle || enemies.includes(random)){
           i--;
           continue;
         }
         else enemies.push(random);
       }
 this.setState({
        size:{height:height,width:width},
        playerPosition:middle,
        enemyPosition: enemies
      });  
  }

  collision(){
    if (this.state.enemyPosition.includes(this.state.playerPosition)){
      var enemyarray = this.state.enemyPosition.filter((item) =>{
        return item !== this.state.playerPosition;
      });
      this.setState({enemyPosition : enemyarray});
      if(this.state.enemyPosition.length < 1){
        alert(`sorry game over
        Number of moves : ${this.state.moves}
        press ok to restart`);
        this.setup(this.state.size.height,this.state.size.width);
      }
    }  
  }

  keymap(e){
    this.setState({moves:this.state.moves+1})
    var plpos = parseInt(this.state.playerPosition,10);
    var row = parseInt(this.state.size.height,10);
    var col = parseInt(this.state.size.width,10);
    if(e.keyCode === 68 || e.keyCode === 39) //d
    {   
      if((plpos%col)!== (col-1))
      this.setState({playerPosition:plpos+1});
    } 
    else if(e.keyCode === 83 || e.keyCode === 40) //s
    {   
      if(plpos < (col*(row-1)))
        this.setState({playerPosition:plpos+col});
        
    }
    else if(e.keyCode === 65 || e.keyCode === 37) //a
    {
      if((plpos%col)!== 0)
        this.setState({playerPosition:plpos-1});
    }
    else if(e.keyCode === 87 || e.keyCode === 38) // w
    {
      if(plpos>(col-1))
        this.setState({playerPosition:plpos-col});  
    }
    this.collision();
  }

  render() {
    var boxstyle = {
      height:300/this.state.size.height,
      width:300/this.state.size.width
    };
    var box = [];
    var playerpos = this.state.playerPosition;
    var enemypos = this.state.enemyPosition;
    for(var j = 0;j<this.state.size.height*this.state.size.width;j++){
        box[j] = <div className="square" key={j} style={boxstyle}></div>;
      }
    box[playerpos] = <div className="square" key={playerpos} style={boxstyle}><Player size={this.state.size}/></div>;

    for(var obj of enemypos){
      box[obj] = <div className="square" key={obj} style={boxstyle}><Enemy size={this.state.size}/></div>;
     }
    return (
      <div className="App">
         {box}
      </div>
    );
  }
}

export default App;
