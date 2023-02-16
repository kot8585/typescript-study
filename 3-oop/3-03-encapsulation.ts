{
  /**
   * 3-02에서의 클래스의 문제점은 coffeeBean의 개수를 외부에서 주입받기 때문에 마이너스 값을 넣을 수도 있음
   * 캡슐화를 해보자
   * 캡슐화를 하는 방법 : public, private, protected
   */
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  class CoffeeMaker {
    //❗️private 추가
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    //❗️이렇게 인스턴스를 생성해서 리턴해주는 함수가 있는 경우 생성자를 private으로 해주고 얘만 사용해도록 권장해주어야 함
    //만약에 다른 코드에서 생성자 막혀있으면 static함수가 있는지 보기!
    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    refill(coffeeBeans: number) {
      if(coffeeBeans < 0){
        throw new Error('value for beans should be greater than 0');
      }
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

  const coffeeMaker = CoffeeMaker.makeMachine(32);
  coffeeMaker.refill(32);
  const coffee = coffeeMaker.makeCoffee(2);
  console.log(coffee);
}