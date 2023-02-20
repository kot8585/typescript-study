interface Either<L, R> {
  left: () => L;
  right: () => R;
}

class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R){}

  //얘는 왜 메서드에 제네릭 안써줬지?
  left(): L{
    return this.leftValue;
  }

  right(): R {
    return this.rightValue;
  }
}

const either: Either<number, string> = new SimpleEither(4, 'ellie');
console.log(either.left());
either.right();

//오. object도 넣을 수 있음. 타입에 name까지 나오네 호호
const wow = new SimpleEither({name: 'ellie'}, 'hello');
console.log(wow.left().name);