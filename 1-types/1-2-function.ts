{
 //javascript ๐ฉ
 function jsAdd(num1, num2) {
  return num1 + num2;
 } 

 //TypeScript ๐๐ผ
  function add(num1:number, num2: number): number {
  return num1 + num2;
 } 

  //Javascript ๐ฉ
  function jsFetchNum(id) {
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //TypeScript ๐๐ผ
  function fetchNum(id: string): Promise<number>{
    //code ...
    //code ...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  //Javascript ๐ฉ => TypeScript 
  //Optional ? : ์ ๋ฌํ์ง ์์ผ๋ฉด undefined๋ก ์ค์ 
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