{
  /**
   * Print Loading State
   * discriminated(공통적인 프로퍼티) 활용!
   */
  type LoadingState = {
    state: 'loading';
  };

  type SuccessState = {
    state: 'success';
    response: {
      body: string;
    };
  };

  type FailState = {
    state: 'fail';
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(status: ResourceLoadState) {
    switch(status.state){
      case 'loading':
        console.log('👀 loading...');
        return;
      case 'success':
        console.log(`😃 ${status.response.body}`);
        return;
      case 'fail':
        console.log(`😱 ${status.reason}`);
        return;
      default:
        throw new Error(`unknown state: ${status}`)
    }
  }

  printLoginState({ state: 'loading' }); // 👀 loading...
  printLoginState({ state: 'success', response: { body: 'loaded' } }); // 😃 loaded
  printLoginState({ state: 'fail', reason: 'no network' }); // 😱 no network
}
