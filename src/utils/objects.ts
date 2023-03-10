export function removeUndefinedValues<T extends Record<any, any>>(
  object_: Partial<T>
): T {
  return Object.keys(object_).reduce(
    (object, key) =>
      object_[key] !== undefined ? { ...object, [key]: object_[key] } : object,
    {}
  ) as T;
}

export function removeFalsyValues(object_: Record<any, any>) {
  return Object.keys(object_).reduce(
    (object, key) =>
      object_[key] ? { ...object, [key]: object_[key] } : object,
    {}
  );
}

export function replaceElement<Type>(
  object: Type[],
  newElement: Type,
  condition: (a: Type, b: Type) => boolean
) {
  return object.map((value: Type) =>
    condition(value, newElement) ? newElement : value
  );
}

export function mergeArrays<Type>(
  objectA: Type[],
  objectB: Type[],
  condition: (a: Type, b: Type) => boolean
) {
  return objectA.map((value: Type) => {
    const newElement = objectB.find((element: Type) =>
      condition(element, value)
    );
    return newElement ?? value;
  });
}
