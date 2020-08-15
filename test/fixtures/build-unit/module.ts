export default function defaultFunction(): string[] {
  const returnStringArr: string[] = ['MyModule', 'MyModule', 'MyModule'];
  return returnStringArr;
}

export function numArr(num: number): number[] {
  const arr: number[] = [];
  let c = 0;
  while (c < num) {
    arr.push(c);
    c++;
  }
  return arr;
}
