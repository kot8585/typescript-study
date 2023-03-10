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

  //ð typeì ìì± íìë ì§ì í  ì ìë¤. 
  type Name = Animal['name']; // string
  const text: Name = 'hello';

  type Person = {
    name: string;
    gender: Animal['gender'];//'male' | 'female'
  }

  //ð typeì keyë¤ì ì¬ì©ê°ë¥ 
  type Keys = keyof Animal; // 'name' | 'age' | 'gender'

}