import React from 'react';
import {Router,Link} from 'react-router';

export default class BookList extends React.Component{
  constructor(){
    super();
    this.listChapter = this.listChapter.bind(this);
  }
  listChapter(){
    var chapterElems = [];
    for(let i=1;i<=this.props.chapterSize;i++){
      chapterElems.push(React.createElement(Link,{"to" :"/shma/"+this.props.book+"/"+i,"key":i},i));
    }
    return chapterElems;
  }

  render(){
    return(
      <div className="books">
        {this.listChapter()}
      </div>
    );
  }
}
