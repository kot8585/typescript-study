{
  const obj = {
    name: 'ellie',
  }
  obj.name; // ellie
  obj['name'] //ellie

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  }

  //🌟 type의 속성 타입도 지정할 수 있다. 
  type Name = Animal['name']; // string
  const text: Name = 'hello';

  type Person = {
    name: string;
    gender: Animal['gender'];//'male' | 'female'
  }

  //🌟 type의 key들을 사용가능 
  type Keys = keyof Animal; // 'name' | 'age' | 'gender'

}