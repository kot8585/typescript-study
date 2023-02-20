/**
 * 목표 : 제네릭을 사용하는 좋은 예시를 알아보자.
 */

interface Employee {
  pay():void;
}

class FullTimeEmployee implements Employee {
  pay(): void {
      console.log('풀타입 급여 지급');
  }

  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay(): void {
      console.log('파트타임 급여 지급');
  }

  workPartTime() {}
}

//💩 세부적인 타입을 받아서 너무 광범위한 타입을 리턴하는 것은 좋지 않음 
//왜냐하면 세부적인 것을 쓰지 못하기 때문이지
function payBad(employee: Employee): Employee{
  employee.pay();
  return employee;
}

//❗️ 제네릭을 사용해서 전달받은 타입 그대로 리턴해줄 수 있다. 
function payGood<T extends Employee>(employee: T ):T {
  employee.pay();
  return employee;
}

 //함수 표현식에서의 제네릭 사용방법
  const pay = <T extends Employee>(employee: T): T => {return employee;}

const ellie = new FullTimeEmployee();
const bob = new PartTimeEmployee();

const ellieAfterPay = payBad(ellie);
const BobAfterPay = payBad(bob);
// ellieAfterPay.workFullTime() => 얘를 못써!!!

const ellieAfterPayGood = payGood(ellie);
ellieAfterPayGood.workFullTime();


//제네릭 예시 두번째 
const obj = {
  name: 'ellie',
  age: 20,
};

const obj2 = {
  animal: '🐴',
}

//❗️keyof : T 안에 있는 오브젝트의 타입 중 하나여야 한다.
//❗️T[K] : T[K]의 값 타입
function getValue<T, K extends keyof T>(object:T, key: K): T[K] {
  return object[key];
}

console.log(getValue(obj, 'name')); //ellie
console.log(getValue(obj, 'age'));  // 20
console.log(getValue(obj2, 'animal')); //🐴