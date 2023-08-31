import Calculator, { PI } from "./calculator.js";

const calc = new Calculator();

calc.add(10).substract(5).result();
calc.add(3).multiply(4).divide(6).result();
calc.hasil = 7;
console.log(`nilai sekarang: ${calc.nilai}`);
calc.multiply(2).multiply(PI).result();
calc.hasil = 7;
calc.square().multiply(PI).result();
calc.hasil = 4;
calc.exponent(3).result;
calc.squareRoot().result;
