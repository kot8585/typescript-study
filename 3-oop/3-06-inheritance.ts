{
  /**
   * 목표 : 1. 상속을 하는 방법 
   *       2. 생성자와 메서드를 오버라이딩 하는 방법
   */
  
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

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

  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23);
  const coffee = latteMachine.makeCoffee(1);//❗️상속을 하기 때문에 부모에 있는 것을 바로 사용가능하다. 
  console.log(coffee);
}