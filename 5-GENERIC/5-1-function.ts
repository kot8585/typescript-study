/**
 * 목표: 제네릭의 사용방법에 대해 알아보자
 * 제네릭을 사용하면 컴파일 시간에 타입을 보장받을 수 있다. 
 */
{
  function checkNotNull<T>(arg: T | null): T {
    if(arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  //제네릭이 아닌ㄴ any를 쓰게되면 result에 any라고 뜨기 때문에 타입 안정성이 떨어짐
  function checkNotNullAny(arg: any | null): any {
    if(arg == null) {
      throw new Error('not valid number!');
    }
    return arg;
  }

  const result = checkNotNull(123);
  console.log(result);
  checkNotNull(null);
  //boolean 타입이라고 직접 써준이유는 안써주면 true라고 나타나서 boolean타입이라는걸 더 잘 알려주기 위함임 
  const boal: boolean = checkNotNull(true);

}