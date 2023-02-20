{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  }

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>; 

    constructor(private capacity: number){}

    get size() {
      return this._size;
    }

    push(value: T) {
      if(this.size === this.capacity) {
        throw new Error('Stack is full');
      }
      const node: StackNode<T> = {value, next: this.head}
      this.head = node;
      this._size++;
    }

    //❗️return값을 string | undefined으로 하는 것보다는 string을 무조건 리턴한다로 쓰는게 좋다. 
    // 왜냐하면 string | undefined로 쓴다면 사용하는 곳에서 계속 null체크를 해야되서 코드가 더러워지기 때문
    // string으로 내보내는 대신 error를 내보내줘서 사용하는 쪽에서 잘 사용할 수 있도록 해주기
    pop(): T {
      //❗️ === null 을 쓰게 되면 undefined는 안잡히고 null만 잡힘
      //null == undefined , null !== undefined이기 때문 
      //❗️ 따라서 ==로 체크하기
      // == null, == undefined 둘 다 되지만 보통 == null로 작성한다. 
      if(this.head == null) {
        throw new Error('Stack is empty');
      }

      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl<string>(10);
  stack.push('Ellie 1');
  stack.push('Bob 2');
  stack.push('Steve 3');
  while(stack.size !== 0) {
    console.log(stack.pop());
  }

  const stackNumber = new StackImpl<number>(10);
  stackNumber.push(1);
  stackNumber.push(2);
  stackNumber.push(3);
  while(stackNumber.size !== 0) {
    console.log(stackNumber.pop());
  }
}