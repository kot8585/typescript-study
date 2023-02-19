{
  /**
   * 💡 추상화 클래스 사용해보기
   *  공통적인 것은 추상 클래스에 구현하고, 자식들마다 구현하는 게 다른 메서드는 abstract 키워드를 사용하면 된다.
   */
  
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  //여기 abstract 키워드 추가!
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
        throw new Error('커피콩이 부족해요 🙏');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    } 

    private preheat() {
      console.log('heating up ...');
    }

    //여기 abstract 키워드 추가!
    //자식에 따라 다른 구현사항을 가지는 경우 abstract를 붙인다.
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