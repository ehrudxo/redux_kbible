import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

export function updateContents ( bookInfo ){
  return {
    actionType : AppConstants.UPDATE_CONTENTS,
    bookInfo : bookInfo
  }
}
