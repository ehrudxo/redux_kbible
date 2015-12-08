var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions ={
  updateContents : function(bookInfo,bookService){
    bookInfo.text = bookService.getText( bookInfo );
    AppDispatcher.handleViewAction({
      actionType : AppConstants.UPDATE_CONTENTS,
      bookInfo : bookInfo
    })
  }
}
module.exports = AppActions;
