//π₯ My Code
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
      throw new Error('νμμ΄ μμ΄μ');
  }
}

//π₯° Ellie's Code : Command νμλ λ§λ€μ΄μ£Όμλ€!
type Command = 'add' | 'substract' | 'multiply' | 'divide' | 'remainder';
function ellieCalculate(command: Command, a: number, b: number): number {
  switch(command) {
    //μ΄ν κ°μ
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('substract', 3, 1)); // 2
console.log(calculate('multiply', 4, 2)); // 8
console.log(calculate('divide', 4, 2)); // 2
console.log(calculate('remainder', 5, 2)); // 1
