{
  /**
   * condition에 따라 type이 결정된다. 
   */
  type Check<T> = T extends string? boolean : number;

  type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends Function
  ? 'function'
  : 'object';

  type T0 = TypeName<string>; //'string'
  type T1 = TypeName<()=>void> //'function'
}