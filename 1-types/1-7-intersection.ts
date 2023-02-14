{
  /**
   * Intersection Types: And
   */
  type Student = {
    name: string;
    score: number;
  }

  type Worker = {
    employeeId: number;
    work: () => void;
  }

  
  function internWork(person: Student & Worker) {
    console.log(person.name, person.employeeId, person.work); //다 사용가능!
  }

  internWork({
    name: 'ellie',
    score: 1,
    employeeId: 123,
    work: () => {},
  })
}