{
  /**
 * Mapped Type
 * => 타입을 빙글빙글 돌면서 여러가지 변형된 타입을 만들어낼 수 있다. 
 */
  //예제 1️⃣ 
  type Video = {
    title: string;
    author: string;
  }

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for ...in
    /**
     * T의 key들을 순회하면서 "Key?: Key의 타입"으로 만든다. 
     */
  };
  type MappedVideoOptional = Optional<Video> //아래의 VideoOptional과 같음

  type VideoOptional = {
    title?: string;
    author?: string;
  }

  // 이제는 optional이기에 모든 Key들을 주지 않아도 된다.
  type Animal = {
    name: string;
    age: number;
  }
  const animal: Optional<Animal> = {
    name: 'dog', // 모든 Key들을 주지 않아도 된다.
  }

  //예제 2: mapped type을 이용하여 readOnly로 만들어보자 
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  }

  //예제 3 : Mapped Type 활용해보기
  //TODO: 1. https://dev.to/mattzgg_94/typescript-use-mapped-type-to-implement-a-proxy-4im2 읽어보기
  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
  }

  //TODO: 다시 한번 보기. 이해가 안가.
  function proxify<T extends object>(o: T): Proxify<T> {
    const result = {} as Proxify<T>;
    for(let key in o) {
      let rawValue = o[key];
      result[key] = {
        get: () => rawValue,
        set: (value) => {
          rawValue = value; //변수에 넣었는데 이게 어떻게 가능한거지,,?
        },
      };
    }
    return result;
  }

  let props = {rooms: 4};
  let proxifiedProps = proxify(props);
  proxifiedProps.rooms.set(5);
  console.log(proxifiedProps.rooms.get());
}