/**
 * ๐ฅ Error์ ๋ํด
 * ๋ค๋ฅธ ์ธ์ด์์๋ Exception ํด๋์ค์ด์ง๋ง ์๋ฐ์คํฌ๋ฆฝํธ๋ Error๋ฅผ ์ฌ์ฉํ๋ค. 
 */

/**
 * 1๏ธโฃ switch๋ฌธ์์๋ ๋ค์๊ณผ ๊ฐ์ด ์ปดํ์ผ ๋จ๊ณ์์ error๋ฅผ ์๋ ค์ค ์ ์๋ค. 
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
        const invalid: never = direction; //โ๏ธ ์ถ๊ฐ!!
        throw new Error(`unknown direction: ${direction}`);
    }
  }
}

/**
 * 2๏ธโฃ ๐try-catch๋ ์ด๋์ ํด์ผํ ๊น๐
 *    - ์ ์ฒ๋ฆฌํ  ์ ์๋ ๊ณณ์์!! ์! ๋ฐ์ํ ์๋ฌ๋ฅผ ๊ฐ์ง๊ณ  ์๋ฏธ์๋ ์ผ์ ํ  ์ ์๋ ๊ณณ์์
 *    - ์์ ์์๋ UserService๊ฐ ์๋ App์์ ๋ ์๋ฏธ์๋ ๊ฒ์ ํ  ์ ์์
 *    - ์๋ฏธ์์ด try-catch๋ฅผ ํ๋ ๊ฒ์ ์ข์ง ์์ 
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
3๏ธโฃ ๐Error State : ์ธ์  Error๋ฅผ ์ฐ๊ณ  ์ธ์  Error State๋ฅผ ์จ์ผํ ๊น?๐
  - Typescript์์์ catch()๋ ์ด๋ ํ ํ์์ ๋ณด๋ ์ ๋ฌ๋์ง ์๋ anyํ์์ด๊ธฐ์ instanceOf๋ฅผ ์ฌ์ฉํ  ์ ์๋ค. 
 
 3-1. ErrorState
  - ๊ทธ๋์ ์์ ๊ฐ๋ฅํ Error๋ throw๋ฅผ ๋จ๋ฐํ์ง ์๊ณ  ErrorState๋ฅผ ๋ง๋ค๊ธฐ
  - ErrorState๋ฅผ ๋ง๋ค๋ฉด ์ฌ์ฉํ๋ ์ชฝ์์ "reason"์ผ๋ก ์๋ง๊ฒ ์๋ฌ๋ฅผ ์ฒ๋ฆฌํ  ์ ์๊ธฐ ๋๋ฌธ.
 
 3-2. throw Error
    - ์์ํ  ์ ์๋ ๊ฒ๋ค์ throw Error๋ฅผ ์ฐ๊ธฐ

 3-3. ์ถ๊ฐ์ ์ธ ๊ฒ๋ค (https://academy.dream-coding.com/courses/player/typescript/lessons/533)
 - ์ฌ์ฉํ๋์์ ๊ด์ฌ๋์ ํ์์ ๋ฐ๋ผ์, State๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.
 - ์ด ํจ์๋ฅผ ์ฌ์ฉํ๋ ์ฌ๋์ด ์๊ณ  ์ถ์๊ฒ์(return) ๋ฌด์์ธ๊ฐ? ๋ด๊ฐ ๊ผญ ๋ฌด์์ ์๋ ค์ค์ผ ํ๋๊ฐ? ์ ๋ํ ๋๋ต์ ๋ฐ๋ผ errorState๋ฅผ ๋ฆฌํดํ ์ง throw error๋ฅผ ํ ์ง ๊ฒฐ์ ํ๊ธฐ
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