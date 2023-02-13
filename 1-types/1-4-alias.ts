{
  /**
   * type alias : 내가 원하는 타입을 만들 수 있다. 
   * 원시타입도 가능할 뿐만 아니라 커스텀 객체, 문자열까지 다양한 타입 모두 가능
   */
  type Text = string;
  const name: Text = 'ellie';
  const address: Text = 'korea';
  type Student = {
    name: string;
    age: number;
  }
  const student: Student = {
    name: 'ellie',
    age: 12,
  }

  /**
   * String Literal Types
   */
  type Name = 'name';
  let ellieName: Name;
  ellieName = 'name'; //'name'만 할당할 수 있다. 
}