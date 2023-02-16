{
  //Array
  const fruits: string[] = ['apple', 'banana'];
  const scores: Array<number> = [1, 3, 4];

  //❗️readonly : 메서드 안에서 값을 변경하지 못하도록 할때 사용
  // function printArray(fruits: readonly Array<number>) {}
  function printArray(fruits: readonly string[]) {}

  //Tuple
  let student: [string, number];
  student = ['name', 123];
  student[0] //name //이렇게 인덱스로 가져오는 것은 가독성이 좋지 않음.

  //❗️readonly 속성이 배열에서만 적용이 되기 때문에 튜플보다는 배열을 많이 사용한다. 
 

  //❗️그렇다면, 언제 튜플을 사용해야 할까? interface, type alias, class에서 사용. 
  // react의 useState가 잘 사용한 예제래.
  
}