import React from 'react'
import HTTP from './HTTP'
import LZString from 'lz-string'

const defaultBookUrl = './k_bible_1950_utf_kr.lz'

class BookService{
  constructor( props ){
      console.log("[bookService initiated]");
      this.initBible();
      this.bIndex = new BookIndex();
  }
  initBible(){
    try{
      this.bible = JSON.parse(LZString.decompressFromUTF16(localStorage.getItem("k_bible_1950")));
    }catch(e){
      this.bible = null;
    }
  }

  install() {
    const $ = new HTTP();
    return new Promise(function(resolve,reject){
      $.get(defaultBookUrl).then(function(req){
        localStorage.setItem( "k_bible_1950" , req.responseText );
        resolve();
      }, function(error){
        reject(Error(error));
      });
    });
  }
  getText(bookInfo = {book:'창세기',chapter:1}) {
    let book = this.bIndex.getBookAbbrev(bookInfo["book"]);
    return this.bible[book][bookInfo["chapter"]];
  }
  getBookIndex(){return this.bIndex;}
  getChapterSize(book){
    var objs = this.getChapter(book);
    var i = 0;
    while(true){
      i++;
      if(objs[i]){
      }else break;
    }
    i--;
    return i;
  }
  getChapter(bookName){
    if(this.bible){
      return this.bible[this.bIndex.getBookAbbrev(bookName)];
    }else return null;
  }
}
export default BookService;

class BookIndex{
  constructor(){
    this.books = ['창세기', '출애굽기', '레위기', '민수기', '신명기',
    '여호수아', '사사기', '룻기', '사무엘상', '사무엘하', '열왕기상',
    '열왕기하', '역대상', '역대하', '에스라', '느헤미아', '에스더', '욥기',
    '시편', '잠언', '전도서', '아가', '이사야',
    '예레미아', '예레미아 애가', '에스겔', '다니엘', '호세아', '요엘',
    '아모스', '오바댜', '요나', '미가', '나훔',
    '하박국', '스바냐', '학개', '스가랴', '말라기',
    '마태복음', '마가복음', '누가복음', '요한복음', '사도행전', '로마서',
    '고린도전서', '고린도후서', '갈라디아서', '에베소서', '빌립보서',
    '골로새서', '데살로니가전서', '데살로니가후서', '디모데전서', '디모데후서',
    '디도서', '빌레몬서', '히브리서', '야고보서', '베드로전서', '베드로후서',
    '요한1서', '요한2서', '요한3서', '유다서', '요한계시록'
    ];
    this.abbrevs = {'창세기':'창', '출애굽기':'출', '레위기':'레', '민수기':'민', '신명기':'신',
    '여호수아':'수', '사사기':'삿', '룻기':'룻', '사무엘상':'삼상', '사무엘하':'삼하', '열왕기상':'왕상',
    '열왕기하':'왕하', '역대상':'대상', '역대하':'대하', '에스라':'스', '느헤미아':'느', '에스더':'에', '욥기':'욥',
    '시편':'시', '잠언':'잠', '전도서':'전', '아가':'아', '이사야':'사',
    '예레미아':'렘', '예레미아 애가':'애', '에스겔':'겔', '다니엘':'단', '호세아':'호', '요엘':'욜',
    '아모스':'암', '오바댜':'옵', '요나':'욘', '미가':'미', '나훔':'나',
    '하박국':'합', '스바냐':'습', '학개':'학', '스가랴':'슥', '말라기':'말',
    '마태복음':'마', '마가복음':'막', '누가복음':'눅', '요한복음':'요', '사도행전':'행', '로마서':'롬',
    '고린도전서':'고전', '고린도후서':'고후', '갈라디아서':'갈', '에베소서':'엡', '빌립보서':'빌',
    '골로새서':'골', '데살로니가전서':'살전', '데살로니가후서':'살후', '디모데전서':'딤전', '디모데후서':'딤후',
    '디도서':'딛', '빌레몬서':'몬', '히브리서':'히', '야고보서':'약', '베드로전서':'벧전', '베드로후서':'벧후',
    '요한1서':'요일', '요한2서':'요이', '요한3서':'요삼', '유다서':'유', '요한계시록':'계'
    };
  }
  get getBooks(){
    return this.books;
  }
  getBookAbbrev( bookName ){
    return this.abbrevs[ bookName ];
  }
  getIndexOfBookName(bookName){
    for(var i=0,len=this.books.length;i<len;i++){
      if(this.books[i]===bookName) return i;
    }
    return 0;
  }
  getNextBook( bookName ){
    return this.books[this.getIndexOfBookName(bookName) +1];
  }
  getPrevBook( bookName ){
    if(this.getIndexOfBookName(bookName)==0){ return 0;
    }else{return this.books[this.getIndexOfBookName(bookName) -1];}
  }
}
