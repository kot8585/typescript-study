/**
 * 목표: 인터페이스를 통해 좀더 유연한 구조를 만들어보자
 * 장점 : 테스트 코드를 작성하기 쉽다는 장점도 있다. 
 
 * 주의사항 : 오버엔지니어링을 하지 말것. 간단한 구조라면 상속이 충분할 수 있음  

 * 🌟 interface(인터페이스)는 일종의 "통신규약"이다.
   🌟composition(컴포지션)이란, 기능을 따로 때어내 "클래스화"하여 다른 클래스에 조립시키는 일종의 Function handling이다.
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

  //➕ 인터페이스 추가
  interface MilkSteamer {
   makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  //➕ 인터페이스 추가
  interface SugarMixer {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker{
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    //❗️인터페이스를 주입받도록 바꾸었다.
    constructor(coffeeBeans: number, 
      private milkSteamer: MilkSteamer, 
      private sugarMixer: SugarMixer) {
      this.coffeeBeans = coffeeBeans;
      this.milkSteamer = milkSteamer;
      this.sugarMixer = sugarMixer;
    }

    static makeMachine(coffeeBeans: number, milkSteamer: MilkSteamer, sugarMixer: SugarMixer): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans, milkSteamer, sugarMixer);
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
      const basicCoffee = this.extract(shots);
      const sugarAdded = this.sugarMixer.addSugar(basicCoffee);
      return this.milkSteamer.makeMilk(sugarAdded);
    }
  }

  // 컴포지션 만들기 : 우유 거품기
  class CheapMilkSteamer implements MilkSteamer{
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
  class CandySugarMixer implements SugarMixer{
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

  class NoSugarMixer implements SugarMixer{
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  const sweetCaffeLatteMachine = CoffeeMachine.makeMachine(24, new CheapMilkSteamer(), new CandySugarMixer());
  sweetCaffeLatteMachine.makeCoffee(2);

  //❗️이제는 인자를 바꿔주기만 하면 다양한 머신을 만들 수 있다. 
  const noSugarCaffeeLatteMachine = CoffeeMachine.makeMachine(24, new CheapMilkSteamer(), new NoSugarMixer());

}
