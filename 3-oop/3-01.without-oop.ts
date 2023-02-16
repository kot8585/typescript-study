//절차지향적으로 커피기계 만들기 - 커피콩은 공통적으로 있고 샷 개수를 받아서 다르게 할거임 
{
  const BEANS_GRAM_PER_SHOT: number = 7;
  let coffeeBeans = 32;

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  function makeCoffee(shots: number): CoffeeCup{
    if(coffeeBeans - (shots * BEANS_GRAM_PER_SHOT) < 0){
      throw new Error('커피콩이 부족해요 🙏');
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  const coffee = makeCoffee(2);
  console.log(coffee);
  
}