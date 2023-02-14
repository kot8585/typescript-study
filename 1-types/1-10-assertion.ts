{
  /**
   * Type Assertions 
   * 리턴되는 타입을 자바스크립트는 절대 알 수 없지만 내부적으로 결과 타입이 확실한 경우일때 사용
   * ❗️꼭 필요한 경우가 아니면 사용하지 말것
   */
  function jsStrFunc(): any {
    return 'hello';
  }
  const result = jsStrFunc();
  //다음의 두가지 방법으로 string의 length 함수 사용가능해짐 
  console.log((result as string).length);
  console.log((<string>result).length);

  //정말정말정말 확실한 경우 ! 표를 사용할 수도 있음 
  const button = document.querySelector('class')!;
  button.nodeValue; 
}