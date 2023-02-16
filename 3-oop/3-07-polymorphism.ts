{
  /**
   * 💡 다형성 
   * 설탕이 들어가는 커피를 만들것이다. 
   * ❗️다형성의 장점은 동일한 규격을 가지고 있기 때문에 외부에서 간단하게 api를 부를수 있다. 
   */
  
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    isSweet?: boolean;
  }

  //❗️인터페이스 추가
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
        throw new Error('커피콩이 부족해요 🙏');
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
      super(beans); //❗️자식에서 생성자를 쓰려면 super를 불러야 함
    }

    private steamMilk(): void {
      console.log('Steaming some milk...')
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots); //❗️부모의 함수를 가져와서 바꿔줄 것이다
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

  //🥰어떤 클래스인지 상관하지 않고 forEach를 부를수 있지!!
  machines.forEach(machine => {
    console.log('-------------');
    machine.makeCoffee(1);
  })
}