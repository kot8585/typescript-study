{
  /** 목표 : 인터페이스를 통해 추상화 하는 방법  
   * 추상화 : 외부에서 어떤 형태로, 공통적으로 어떻게 이 클래스를 이용하게 할 것인지
   * 정말 필요한 함수만 노출함으로써 추상화를 할 수 있다. 
   */
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  //❗️인터페이스 추가
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
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

  const coffeeMaker = CoffeeMachine.makeMachine(32);
  coffeeMaker.refill(32);
  const coffee = coffeeMaker.makeCoffee(2);
  console.log(coffee);
}