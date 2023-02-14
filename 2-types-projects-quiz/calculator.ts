//🐥 My Code
function calculate(type: string, first: number, second: number): number {
  switch(type) {
    case 'add':
      return first + second;
    case 'substract':
      return first - second;
    case 'multiply':
      return first * second;
    case 'divide':
      return first / second;
    case 'remainder':
      return first % second;
    default:
      throw new Error('타입이 없어요');
  }
}

//🥰 Ellie's Code : Command 타입도 만들어주었다!
type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
function ellieCalculate(command: Command, a: number, b: number): number {
  switch(command) {
    //이하 같음
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
