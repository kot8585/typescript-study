/**
 * 🐥 내가 짠 stack 구현코드 
 */
{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  //❗️데이터를 담기만 하는 것은 class가 아닌 type을 통해 정의할 수 있다. 
  class Node {
    constructor(public value:string, public prevNode:Node|null) {
      this.value = value;
      this.prevNode = prevNode;
    }
  }

  //엘리는 그냥 head 변수에다가 담았는데... 그러네. 만들필요가 없었구나. 하는 역할이 없어
  class Head {
    private _finalNode:Node | null = null;
    
    set finalNode(node: Node|null){
      this._finalNode = node;
    }

    get finalNode():Node|null {
      return this._finalNode;
    }
  }

  class ArrayStack implements Stack {
    //인터페이스에서 readonly로 선언한것은 외부에서 변경할수 없는 필드라는 걸 알려주기 위해서
    //❗️private으로 줘서 외부에서 get으로만 접근할 수 있도록 하기
    size: number = 0; //=> Ellie : private _size: number;
    private head:Head = new Head();

    push(value: string) {
      const node = new Node(value, this.head.finalNode)
      this.head.finalNode = node;
      this.size++;
    }

    pop(): string {
      if(!this.head.finalNode) {
        throw new Error('데이터가 없어요');
      }
      const currentNode = this.head.finalNode;
      this.head.finalNode = currentNode.prevNode;
      this.size--;
      return currentNode.value;
    }

    getSize():number {
      return this.size;
    }
  }

  const arrayStack = new ArrayStack();
  arrayStack.push("ellie");
  arrayStack.push("bob");
  console.log(arrayStack.pop());
  console.log(arrayStack.pop());
}

