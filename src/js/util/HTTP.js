/**
* This source is from http://www.html5rocks.com/ko/tutorials/es6/promises/
* get is 1st but if post is needed, then I will create
**/
class HTTP {
  get(url){
    return new Promise(function(resolve, reject) {
    // 일반적인 XHR 작업들을 수행합니다.
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // onload는 404 등의 상황에서도 호출됩니다.
      // 따라서, 상태를 체크합니다.
      if (req.status == 200) {
        // 응답 텍스트로 promise를 해결(resolve)합니다.
        resolve(req);
      }
      else {
        // 그렇지 않으면 의미 있는 에러가 되길 바라며
        // 상태 텍스트와 함께 거부(reject)합니다.
        reject(Error(req.statusText));
      }
    };

    // 네트워크 에러를 처리합니다.
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // 요청(request)를 생성합니다.
    req.send();
  });
  }
}
export default HTTP;
