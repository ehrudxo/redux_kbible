import React from 'react'
import {render} from 'react-dom'
import { Router, Route, HashLocation,Redirect } from 'react-router'
import BookApp from './components/BookApp'
import BookText from './components/BookText'
import BookList from './components/BookList'
import ChapterList from './components/ChapterList'
import Installer from './components/Installer'
import Dummy from './components/Dummy'
/**
* variables
**/
var el = document.getElementById('main');

/**
* start source code here
**/
render((
  <Router location={HashLocation}>
    <Route path='/' component={BookApp}>
      <Route path='shma/:book/:chapter' components={{bookText:BookText,chapterList:ChapterList}}/>
      <Route path='search' components={{bookList:BookList}}/>
      <Route path='search/:book' components={{chapterList:ChapterList}}/>
      <Route path='install' components={{installer:Installer}}/>
    </Route>
  </Router>
), el);

//<Route path='/read' components={{bookText:BookText,bookService:bookService}}/>
//<Route path='/install' components={{installer:Installer,bookService:bookService}}/>
