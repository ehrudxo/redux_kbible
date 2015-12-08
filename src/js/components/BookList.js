import React from 'react';
import {Router,Link} from 'react-router';

export default class BookList extends React.Component{
  constructor(){
    super();
    this.listBook = this.listBook.bind(this);
  }
  listBook(){
    var bookElems = [];
    for(let i=0;i<this.props.books.length;i++){
      let book = this.props.books[i];
      bookElems.push(React.createElement(Link,{"to" :"/search/"+book,"key":book+i},book));
    }
    return bookElems;
  }
  render(){
    return(
      <div className="books">
      {this.listBook()}
      </div>
    );
  }
}
