{
  // Union을 사용할 때 공통적인 프로퍼티를 가지고 있음으로써
  // 좀 더 구분하기 쉽게 만든다.
  type SuccessState = {
    result: 'success'; //공통적인 프로퍼티를 추가해줬다.
    response: {
      body: string;
    };
  };
  type FailState = {
    result: 'fail';
    reason: string;
  }
  type LoginState = SuccessState | FailState;
  function login(): LoginState{
    return {
      result: 'success',
      response: {
        body: 'logged in!',
      }
    }
  }

  // state에 따라 분기처리 하기
  function printLoginState(state: LoginState) {
    // if('response' in state) {
    if(state.result === 'success'){
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}