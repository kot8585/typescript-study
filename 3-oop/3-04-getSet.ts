/**
 * 목표 : getter, setter를 쓸때의 장점, 쓰는 방법 
 * 
 */

{
  class User {
    firstName: string;
    lastName: string;
    //❗️이렇게 fullName을 필드로 박아넣었을때의 문제점은 firstName이나 lastName이 변경되면 업데이트 되지 않음 
    // 그래서 getter, setter로 쓸것이야
    fullName: string;

    constructor(firstName: string, lastName: string, fullName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = fullName;
    }
  }


  class UserVersion2 {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    //❗️오홍. 생성자의 파라미터 앞에 접근제어자를 써주면 멤버변수로 알아서 선언이 된대!
    constructor(private firstName: string, private lastName: string){
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  const user = new UserVersion2('dream', 'coding');
  //❗️ 사용할때는 변수명만 쓰면 됌. "()"안붙여도 됌
  console.log(user.fullName);
}