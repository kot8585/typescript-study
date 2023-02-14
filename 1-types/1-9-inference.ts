{
  /**
   * Type inference : 타입 추론 
   * ❗️원시타입을 변수에 할당하는 간단한 것들은 타입추론을 이용해도 되지만 복잡한 함수의 경우 타입을 직접 명시해주는게 좋음 
   */
  
  let text = 'hello';
  // text = 1; //타입스크립트가 text의 타입을 처음으로 할당한 string으로 추론하기 때문에 number를 넣으면 에러가 난다. 

  //default 값을 할당해줄 때도 type inference가 일어난다.
  function print(message = 'hello') {
    console.log(message);
  }
}