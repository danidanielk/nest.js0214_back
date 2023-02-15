// 매개변수가 없고 리턴값이 없는 함수
const A = () => {
  console.log(1);
};
A();

// 매개변수가 있고 리턴값이 없는 함수
const B = (num1, num2) => {
  console.log(num1 + num2);
};
B(1, 1);

// 매개변수가 없고 리턴값이 있는 함수.
const C = () => 3;
const D = C();
console.log(D);

// 매개변수가 있고 리턴값이 있는 함수.
const E = (num1, num2) => num1 + num2;
const F = E(2, 2);
console.log(F);
