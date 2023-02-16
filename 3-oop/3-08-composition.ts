/**
 * ❗️상속의 문제점 
 * 수직적으로 관계가 형성됌. 부모 클래스를 수정하게 되면 모든 자식 클래스에 영향을 미침. 
 * 오직 하나의 클래스만 상속할 수 있다.
 
 * ❗️상속보다는 Composition을 쓰자
 * ❗️컴포지션이란? 공통되는 속성들을 가지는 클래스를 만들고 이를 재사용하는 것 
  
 * 여기서 한번 더 리팩토링을 해보자
   -> 지금의 구조는 CheapMilkSteamer와 CandySugarMixer를 직접 다른 클래스에서 사용하고 있기 때문에 비싼 milkSteamer나 사탕이 아닌 흑설탕Mixer를 이용해서 machine를 만들고 싶다면 또 다른 CoffeeMachine를 만들어주어야 한다. 
   -> 그렇다면 milkSteamer와 sugarMixer를 인터페이스로 해서 클래스의 의존성을 낮추면 훨씬 더 간편하게 CoffeeMachine을 만들 수 있지 않을까? 
   -> 3-09.interface에서 구현할거야.
 */
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
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

  // 컴포지션 만들기 : 우유 거품기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log('Steaming some milk...')
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  //컴포지션 : 설탕 제조기 
  class CandySugarMixer {
    private getSugar() {
      console.log('Getting some sugar from candy');
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      }
    }
  }

  class CaffeLatteMachine extends CoffeeMachine{
    //❗️컴포지션을 생성자에 주입받았어
    constructor(beans: number, public readonly serialNumber: string, private milkFrother: CheapMilkSteamer){
      super(beans); 
    }


    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      //❗️이제는 제조기를 통해서 makeMilk를 부르기만 하면 커피를 만들 수 있지!!! 와하하하핳
      return this.milkFrother.makeMilk(coffee);
    }
  }
  

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(
      coffeeBeans: number, 
      private sugarMixer: CandySugarMixer) {
      super(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      //❗️ 얘도 컴포지션을 써줬지. 이제는 getSugar를 직접할 필요없고 호출을 하기만 하면 알아서 설탕을 가져와서 커피를 만들어주ㄱ지
      return this.sugarMixer.addSugar(coffee); 
    }
  }

  //❗️ 이제는 SweetCoffeeMachine이랑 CaffeLatteMachine을 상속받지 않고 composition을 통해서 달콤한 라떼를 만들수 잇당
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: CheapMilkSteamer,
      private sugar: CandySugarMixer,
    ){
      super(beans);
    }

    // 굿뜨
    makeCoffee(shots: number): CoffeeCup {
        const coffee = super.makeCoffee(shots);
        const caffeLatte = this.milk.makeMilk(coffee);
        return this.sugar.addSugar(caffeLatte);
    }
  }

  const cheapMilkSteamer = new CheapMilkSteamer();
  const candySugar = new CandySugarMixer();
  const sweetMachine = new SweetCoffeeMachine(12, candySugar);
  const latteMachine = new CaffeLatteMachine(12, 'ss', cheapMilkSteamer);

}
