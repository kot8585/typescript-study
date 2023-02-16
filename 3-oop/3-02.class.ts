/**
 * static 사용
 * 클래스 안에 있는 어떤 속성값을 사용하지 않을때 static을 사용할 수 있다. 
 * 각 인스턴스마다 따로 할당할 필요 없는 필드에다가도 쓴다
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  class CoffeeMaker {
    //❗️static 추가
    static BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    refill(coffeeBeans: number) {
      this.coffeeBeans += coffeeBeans;
    }

    makeCoffee(shots: number): CoffeeCup{
    if(this.coffeeBeans - (shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) < 0){
      throw new Error('커피콩이 부족해요 🙏');
    }
    this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
  }

  const coffeeMaker = new CoffeeMaker(32);
  const coffee = coffeeMaker.makeCoffee(2);
  console.log(coffee);

  const machine = CoffeeMaker.makeMachine(14);
  console.log(machine);
}