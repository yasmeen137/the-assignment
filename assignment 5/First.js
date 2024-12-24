// Array destructuring to extract elements
// ES6+ Feature: Array Destructuring
// Destructuring allows extracting values from arrays and assigning them to variables in a single statement.
const numbers = [1, 2, 3, 4, 5];
const [first, second, , fourth] = numbers; // Skipping the third element by leaving the position blank
console.log(`First: ${first}, Second: ${second}, Fourth: ${fourth}`);
// Output: First: 1, Second: 2, Fourth: 4

// Using the spread operator to merge arrays
// ES6+ Feature: Spread Operator
// The spread operator (`...`) expands elements of an array or object, making it easy to merge or copy.
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2]; // Combines `array1` and `array2` into a new array
console.log(`Merged Array: ${mergedArray}`);
// Output: Merged Array: 1,2,3,4,5,6

// Using the spread operator to merge objects
const obj1 = { name: 'Abdullah', age: 30 };
const obj2 = { job: 'Engineer', city: 'egypt' };
const mergedObj = { ...obj1, ...obj2 }; // Combines properties of `obj1` and `obj2` into a new object
console.log(`Merged Object:`, mergedObj);
// Output: Merged Object: { name: 'Abdullah', age: 30, job: 'Engineer', city: 'egypt' }


// ES6+ Feature: Arrow Functions
// Arrow functions provide a concise way to write functions with implicit `return` for single-line expressions.
// `Array.prototype.filter` is used to create a new array containing only elements that match the condition.
const filterEvenNumbers = (arr) => arr.filter(num => num % 2 !== 0);
// `num => num % 2 !== 0` is a condition that checks if a number is odd (not divisible by 2)
const filteredArray = filterEvenNumbers(numbers);
console.log(`Filtered Odd Numbers: ${filteredArray}`);
// Output: Filtered Odd Numbers: [1, 3, 5]
