import React from 'react'

export default class BookText extends React.Component {
  parseObject(books){
    var rtn ="<div>";
    for(let i in books){
      rtn += "<div key='"+i+"'>"+i+"절:"+books[i]["t"]+"</div>";
    }
    rtn +="</div>"
    return { __html: rtn };
  }
  render() {
        return (
      <div>
        <div className="content"
          dangerouslySetInnerHTML={this.parseObject(this.props.text)}
        />
      </div>
    )
  }
}
