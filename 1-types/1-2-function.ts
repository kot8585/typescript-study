{
 //javascript 💩
 function jsAdd(num1, num2) {
  return num1 + num2;
 } 

 //TypeScript 👍🏼
  function add(num1:number, num2: number): number {
  return num1 + num2;
 } 

  //Javascript 💩
  function jsFetchNum(id) {
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //TypeScript 👍🏼
  function fetchNum(id: string): Promise<number>{
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //Javascript 💩 => TypeScript 
  //Optional ? : 전달하지 않으면 undefined로 설정
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName('Steve', 'Kobs');
  printName('Ellie');
  
  //Default parameter 
  function printMessage(message: string = 'default message'){
    console.log(message);
  }
  printMessage('')

  //Rest Parameter
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a+b);
  }

  console.log(addNumbers(1, 2 ,3, 4))
}