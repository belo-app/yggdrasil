export function combinations<Input, Output = [Input, Input]>(
  values: Input[],
  mapper: (a: Input, b: Input) => Output = (a, b) => [a, b] as Output
): Output[] {
  const result: Output[] = [];
  for (const value1 of values) {
    const index = values.indexOf(value1) + 1;
    for (const value2 of values.slice(index)) {
      result.push(mapper(value1, value2));
    }
  }
  return result;
}
