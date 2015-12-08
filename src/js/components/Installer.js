import React from 'react'


export default class Installer extends React.Component {
  constructor(){
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(e){
    this.props.bookService.install().then(function(){
      //move to Entry!
      console.log("success");
    }, function(err){
      console.log(err);
      alert("에러");
    })
  }
  render() {
    return (
      <div>
        It is  installer : <span><button onClick={this.clickHandler}>download</button></span>
      </div>
    )
  }
}
