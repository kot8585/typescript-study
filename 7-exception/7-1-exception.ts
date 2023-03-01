/**
 * 🔥 Error에 대해
 * 다른 언어에서는 Exception 클래스이지만 자바스크립트는 Error를 사용한다. 
 */

/**
 * 1️⃣ switch문에서는 다음과 같이 컴파일 단계에서 error를 알려줄 수 있다. 
 */
{
  function move(direction: 'up' | 'down' | 'left' | 'right' | 'he') {
    switch(direction) {
      case 'up': 
        position.y += 1;
        return;
      case 'down': 
        position.y -= 1;
        return;
      case 'left': 
        position.x -= 1;
        return;
      case 'right': 
        position.x += 1;
        return;
      default:
        const invalid: never = direction; //❗️ 추가!!
        throw new Error(`unknown direction: ${direction}`);
    }
  }
}

/**
 * 2️⃣ 🌟try-catch는 어디서 해야할까🌟
 *    - 잘 처리할 수 있는 곳에서!! 와! 발생한 에러를 가지고 의미있는 일을 할 수 있는 곳에서
 *    - 예제에서는 UserService가 아닌 App에서 더 의미있는 것을 할 수 있음
 *    - 의미없이 try-catch를 하는 것은 좋지 않음 
 */
{
  class NetworkClient {
    tryConnect(): void {
      throw new Error('no network!');
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
        this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try{
        this.userService.login();
      } catch (error) {
        //show dialog to user
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}

/**
3️⃣ 🌟Error State : 언제 Error를 쓰고 언제 Error State를 써야할까?🌟
  - Typescript에서의 catch()는 어떠한 타입정보도 전달되지 않는 any타입이기에 instanceOf를 사용할 수 없다. 
 
 3-1. ErrorState
  - 그래서 예상 가능한 Error는 throw를 남발하지 않고 ErrorState를 만들기
  - ErrorState를 만들면 사용하는 쪽에서 "reason"으로 알맞게 에러를 처리할 수 있기 때문.
 
 3-2. throw Error
    - 예상할 수 없는 것들에 throw Error를 쓰기

 3-3. 추가적인 것들 (https://academy.dream-coding.com/courses/player/typescript/lessons/533)
 - 사용하는자의 관심도와 필요에 따라서, State를 사용하면 된다.
 - 이 함수를 사용하는 사람이 알고 싶은것은(return) 무엇인가? 내가 꼭 무엇을 알려줘야 하는가? 에 대한 대답에 따라 errorState를 리턴할지 throw error를 할지 결정하기
 */
{
  type NetworkErrorState = {
    result: 'fail';
    reason: 'offline' | 'down' | 'timeout'
  }
  type SuccessState = {
    result: 'success';
  }

  type ResultState = SuccessState | NetworkErrorState;

  class NetworkClient {
    tryConnect(): ResultState {
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {}

    login() {
        this.client.tryConnect();
    }
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try{
        this.userService.login();
      } catch (error) {
        //show dialog to user
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run();
}