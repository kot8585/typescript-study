{
  /**
   * Enum
   * 자바스크립트에서는 없고 타입 스크립트 자체적으로 제공
   */

  //JavaScript : freeze를 통해 ENUM과 최대한 비슷하게 구현할 수 있다.
  const DAYS_ENUM = Object.freeze({"MONDAY": 0, "TUESDAY": 1,})

  // 맨 앞의 글자만 대문자로 적는다.  
  enum Days {
    Monday, // 값을 정하지 않으면 default 값은 0
    Tuesday, // 1
    Wednesday = 'wd',
  }
  console.log(Days.Monday); //0

  // ❗️ 타입스크립트에서 Enum의 문제점은 Enum 타입의 변수에 아무 숫자나 할당이 가능하다는 것이다.
  // 👏따라서 Enum보다는 Union 타입을 활용하는게 좋다
  // Enum을 꼭 사용해야 되는 경우의 예시는 native에서 Union이 지원안되는 경우이다. 그 외에는 없었대.
  let day: Days = Days.Tuesday;
  day = 10;

  type DaysOfUnion = 'Monday' | 'Tuesday' | 'Wednesday';
  }