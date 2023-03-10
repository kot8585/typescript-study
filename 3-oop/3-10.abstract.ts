{
  /**
   * ๐ก ์ถ์ํ ํด๋์ค ์ฌ์ฉํด๋ณด๊ธฐ
   *  ๊ณตํต์ ์ธ ๊ฒ์ ์ถ์ ํด๋์ค์ ๊ตฌํํ๊ณ , ์์๋ค๋ง๋ค ๊ตฌํํ๋ ๊ฒ ๋ค๋ฅธ ๋ฉ์๋๋ abstract ํค์๋๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.
   */
  
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //์ฌ๊ธฐ abstract ํค์๋ ์ถ๊ฐ!
  abstract class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
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

    //์ฌ๊ธฐ abstract ํค์๋ ์ถ๊ฐ!
    //์์์ ๋ฐ๋ผ ๋ค๋ฅธ ๊ตฌํ์ฌํญ์ ๊ฐ์ง๋ ๊ฒฝ์ฐ abstract๋ฅผ ๋ถ์ธ๋ค.
    protected abstract extract(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup{
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine{
    constructor(beans: number, public readonly serialNumber: string){
      super(beans); 
    }

    private steamMilk(): void {
      console.log('Steaming some milk...')
    }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true,
      }
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
      }
    }
  }

  const machines: CoffeeMaker[] = [
    new CaffeLatteMachine(16, '1'),
    new SweetCoffeeMachine(16),
    new CaffeLatteMachine(16, '2'),
    new SweetCoffeeMachine(16),
  ];

  machines.forEach(machine => {
    console.log('-------------');
    machine.makeCoffee(1);
  })
}