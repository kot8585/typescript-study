{
  /**
   * ๐ก ๋คํ์ฑ 
   * ์คํ์ด ๋ค์ด๊ฐ๋ ์ปคํผ๋ฅผ ๋ง๋ค๊ฒ์ด๋ค. 
   * โ๏ธ๋คํ์ฑ์ ์ฅ์ ์ ๋์ผํ ๊ท๊ฒฉ์ ๊ฐ์ง๊ณ  ์๊ธฐ ๋๋ฌธ์ ์ธ๋ถ์์ ๊ฐ๋จํ๊ฒ api๋ฅผ ๋ถ๋ฅผ์ ์๋ค. 
   */
  
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    isSweet?: boolean;
  }

  //โ๏ธ์ธํฐํ์ด์ค ์ถ๊ฐ
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    refill(coffeeBeans: number) {
      if(coffeeBeans < 0){
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += coffeeBeans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if(this.coffeeBeans - (shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) < 0){
        throw new Error('์ปคํผ์ฝฉ์ด ๋ถ์กฑํด์ ๐');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    } 

    private preheat() {
      console.log('heating up ...');
    }

    private extract(shots: number): CoffeeCup {
      console.log(`pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      }
    }

    makeCoffee(shots: number): CoffeeCup{
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine{
    constructor(beans: number, public readonly serialNumber: string){
      super(beans); //โ๏ธ์์์์ ์์ฑ์๋ฅผ ์ฐ๋ ค๋ฉด super๋ฅผ ๋ถ๋ฌ์ผ ํจ
    }

    private steamMilk(): void {
      console.log('Steaming some milk...')
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); //โ๏ธ๋ถ๋ชจ์ ํจ์๋ฅผ ๊ฐ์ ธ์์ ๋ฐ๊ฟ์ค ๊ฒ์ด๋ค
      this.steamMilk();
        return {
          ...coffee,
          hasMilk: true,
        }
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        isSweet: true,
      }
    }
  }

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMachine(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, '2'),
    new SweetCoffeeMachine(16),
  ];

  //๐ฅฐ์ด๋ค ํด๋์ค์ธ์ง ์๊ดํ์ง ์๊ณ  forEach๋ฅผ ๋ถ๋ฅผ์ ์์ง!!
  machines.forEach(machine => {
    console.log('-------------');
    machine.makeCoffee(1);
  })
}