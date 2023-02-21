//is가 뭐지?
//every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
//Array 살펴보기

//every 문서 보고 사용해보기 
type Student = {
  passed: boolean;
}

const students: Student[] = [
  {passed: true}, 
  {passed: false}, 
  {passed: true}, 
]

//❗️배열의 every는 자바스크립트라서 index, array를 전달하지 않아도 컴파일 에러가 발생하지 않는다. 
const result = students.every(student => {
  return student.passed;
});
console.log(result);

//{parameter} is {Type} : 어떠한 인자명은 어떠한 타입이다?
class Animal{}
class Cat extends Animal {
  isCat: boolean = true;
}

class Dog extends Animal {
  isDog: boolean = false;
}

const animals: Animal[] = [new Cat(), new Cat(), new Dog()];
function isCat(animal: Animal): animal is Cat {
  return (animal as Cat).isCat !== undefined;
}
animals.every<Cat>(isCat);