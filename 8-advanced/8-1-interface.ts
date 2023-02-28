/**
 * 목표 : Type과 Interface의 차이점을 알아볼 것이다. 
 
  - 기술적 측면 
  공통점 1 : 둘 다 Object로 정의가 가능하다.
  공통점 2 : 둘 다 클래스로 구현이 가능하다.
  공통점 3 : 둘다 확장이 가능하다.
  
  차이점 1 : 오직 Interface만 결합(merge)이 가능하다.
  차이점 2 : 오직 Type aliases만 computed properties를 사용할 수 있다.
  차이점 3 : 오직 Type aliases만 Union Type이 가능하다.
 */
{
  type PositionType = {
    x: number;
    y: number;
  }

  interface PositionInterface {
    x: number;
    y: number;
  }

  //공통점 1 : 둘 다 Object로 정의가 가능하다.
  const obj1: PositionType = {
    x: 1,
    y: 1,
  }

  const obj2: PositionInterface = {
    x: 1,
    y: 1,
  };

  //공통점 2 : 둘 다 클래스로 구현이 가능하다.
  class Pos1 implements PositionType {
    x: number;
    y: number;
  };

  class Pos2 implements PositionInterface {
    x: number;
    y: number;
    z: number; //❗️ interface merge
  };

  //공통점 3 : 둘다 확장이 가능하다. 
  interface ZPositionInterface extends PositionInterface {
    z: number;
  }

  //type은 intersection을 통해 가능하다.
  type ZPositionType = PositionType & {z: number};

  //❗️차이점 1 : 오직 Interface만 결합(merge)이 가능하다.
  // 만약 동일한 명의 인터페이스를 한번 더 정의할 시 모든 속성을 다 써주어야한다.
  interface PositionInterface {
    z: number;
  }

  // 차이점 2 : Type aliases는 computed properties를 사용할 수 있다.
  type Person = {
    name: string,
    age: number,
  }
  type Name = Person['name']; //string

  // 차이점 3 : Type aliases는 Union Type이 가능하다.

}