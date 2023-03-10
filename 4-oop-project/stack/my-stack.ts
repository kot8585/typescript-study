/**
 * ๐ฅ ๋ด๊ฐ ์ง  stack ๊ตฌํ์ฝ๋ 
 */
{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  //โ๏ธ๋ฐ์ดํฐ๋ฅผ ๋ด๊ธฐ๋ง ํ๋ ๊ฒ์ class๊ฐ ์๋ type์ ํตํด ์ ์ํ  ์ ์๋ค. 
  class Node {
    constructor(public value:string, public prevNode:Node|null) {
      this.value = value;
      this.prevNode = prevNode;
    }
  }

  //์๋ฆฌ๋ ๊ทธ๋ฅ head ๋ณ์์๋ค๊ฐ ๋ด์๋๋ฐ... ๊ทธ๋ฌ๋ค. ๋ง๋คํ์๊ฐ ์์๊ตฌ๋. ํ๋ ์ญํ ์ด ์์ด
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
    //์ธํฐํ์ด์ค์์ readonly๋ก ์ ์ธํ๊ฒ์ ์ธ๋ถ์์ ๋ณ๊ฒฝํ ์ ์๋ ํ๋๋ผ๋ ๊ฑธ ์๋ ค์ฃผ๊ธฐ ์ํด์
    //โ๏ธprivate์ผ๋ก ์ค์ ์ธ๋ถ์์ get์ผ๋ก๋ง ์ ๊ทผํ  ์ ์๋๋ก ํ๊ธฐ
    size: number = 0; //=> Ellie : private _size: number;
    private head:Head = new Head();

    push(value: string) {
      const node = new Node(value, this.head.finalNode)
      this.head.finalNode = node;
      this.size++;
    }

    pop(): string {
      if(!this.head.finalNode) {
        throw new Error('๋ฐ์ดํฐ๊ฐ ์์ด์');
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

