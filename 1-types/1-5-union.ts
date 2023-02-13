{
  /**
   * Union Types: OR
   */
  type Direction = 'left' | 'right' | 'up' | 'down';
  function move(direction:Direction){
    console.log(direction);
  }
  move('down'); //위의 4가지 중 하나만 넣을 수 있다. 

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  //❗️function: login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };
  type FailState = {
    reason: string;
  }
  type LoginState = SuccessState | FailState;
  function login(): LoginState{
    return {
      response: {
        body: 'logged in!',
      }
    }
  }

  // state에 따라 분기처리 하기
  function printLoginState(state: LoginState) {
    if('response' in state) {
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}