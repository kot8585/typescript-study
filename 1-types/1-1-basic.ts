{
  /** 
  * Javascript type
    * Primitive: number, strung, boolean, bigint, symbol, null, undefined
    * Object: function, array, ...
  */

  //number
  const num:number = -6

  //string
  const str: string = 'hello';

  //boolean 
  const boal: boolean = false;

  //undefined : 값이 없는지 있는지 아직 결정되지 않음
  let name: undefined; //💩 이런식으로 써버리면 undefined밖에 할당할 수 없기떄문에 쓰지 않음 
  let age: number | undefined; //👍🏼
  age = undefined;
  age = 1;

  function find(): number | undefined { //찾았거나 찾지 못했을때의 리턴값을 이런식으로 많이 사용
    return 
  }

  //null : 값이 없음을 나타냄
  let person: null; //💩
  let person2: string | null; //👍🏼 값이 있을수도 있고 없을수도 있다. 

  //unknown:💩 어떤 데이터가 담길지 알 수 없음.  
  let notSure: unknown = 0;

  //any: 💩 어떤 것도 담길 수 있음 
  let anything: any = 0

  //void: 생략가능 
  function print() {
    console.log('hello');
    return;
  }
  let unusable: void = undefined; //💩
  
  //never: 절대 리턴할 수 없음. 보통은 이 에러가 발생하면 나는 리턴할 계획이 전혀 없어!라는 것을 표현
  function throwError(message: string): never {
    //never안에서는 보통 이런식으로 짠다. throw나 while(true)
    throw new Error(message);

    while(true) {}
  } 

  //object
  let obj: object; //💩
  function acceptSomeObject(obj: object) {}
}