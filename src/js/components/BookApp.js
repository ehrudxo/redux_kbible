import React from 'react'
import {Link} from 'react-router'
import AppActions from '../actions/AppActions'
import AppStore from '../stores/AppStore'
import BookService from '../util/BookService'

class BookApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {book: '창세기', chapter: '1',text:''};
    this.update = this.update.bind(this);
    this.bookService = new BookService();
  }
  update(book=this.refs.book.value,chapter=this.refs.chapter.value){
    AppActions.updateContents({
      book: book,
      chapter : chapter
    },this.bookService);
    this.setState(AppStore.getBookInfo());
  }
  componentWillMount(){
    if(this.state.book && this.state.chapter)
      this.update(this.state.book,this.state.chapter);
  }
  componentDidMount(){
    if(this.props.params.book && this.props.params.chapter)
      this.update();
  }
  render(){
    return(
      <div>
        <div className="wrapper">
          성경 :
          <input ref="book" value={this.props.params.book} defaultValue={this.state.book} readOnly/> &nbsp;
          장 : <input ref="chapter" value={this.props.params.chapter} defaultValue={this.state.chapter} readOnly/>&nbsp;
          <Link to={`/search/`}>search</Link>
        </div>

        {(()=>{
         if(this.props.bookText) return React.cloneElement(this.props.bookText, {...this.state});
        })()}
        {(()=>{
         if(this.props.installer) return React.cloneElement(this.props.installer, {...this.state});
        })()}
        {(()=>{
         if(this.props.bookList) return React.cloneElement(this.props.bookList, {books : this.bookService.getBookIndex().books})
        })()}
        {(()=>{
         if(this.props.chapterList){
           return React.cloneElement(this.props.chapterList,
                                    {chapterSize : this.bookService.getChapterSize(
                                          this.props.params.book
                                    ),book : this.props.params.book
                                  });

         }
        })()}
      </div>
    )
  }
}
export default BookApp;
