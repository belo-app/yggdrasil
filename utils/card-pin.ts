export const createRandomPin = (length = 4) => {
  let pin = "";
  for (let counter = 1; counter <= length; counter++) {
    pin = pin + Math.floor(Math.random() * 10).toString();
  }
  return pin;
};
