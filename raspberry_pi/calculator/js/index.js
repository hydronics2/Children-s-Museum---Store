/*
Globals and helper functions
*/

let input = []
let element1 = []
let element2 = []
let element3 = []
var element2Expr = ''
var element3Expr = ''
var currentElement = 1;
const isNumber = s => !isNaN(parseFloat(s))
const isOperator = s => '+-*/^#()'.includes(s)
//const exprElement = document.getElementById('expr')
const exprElement1 = document.getElementById('expr1')
const exprElementOperator2 = document.getElementById('exprOperator2')
const exprElement2 = document.getElementById('expr2')
const exprElementOperator3 = document.getElementById('exprOperator3')
const exprElement3 = document.getElementById('expr3')
const resultElement = document.getElementById('result')

/*
UI code
*/

function buttonClick(e) {
  //console.log("key pressed");
  var audioUrl = "audio/finger_tap.mp3";
  var audio = new Audio(audioUrl);
  audio.play();

  if (e.target.tagName != 'BUTTON') return
  let token = e.target.textContent
  //console.log(token)
  if (token == '=') {
    var audioUrl = "audio/beep.mp3";
    var audio = new Audio(audioUrl);
    audio.play();
    let result
    if (element1.length == 0) {
      result = 0
    } else {
      if(element2Expr != '' && element2.length != 0){
        var temp1 = ''
        temp1 = element1
        temp1.push(element2Expr)
        var temp2 = temp1.concat(element2)
        console.log(temp2)
      } else {
        result = evalMath(element1)
      }
      if(element3Expr != '' && element3.length != 0){
        console.log(element3)
        temp2.push(element3Expr)
        input = temp2.concat(element3)
        result = evalMath(input)
      } else {
        result = evalMath(temp2)
      }
      // var temp1 = element1.concat(element2)
      // temp1.push(element3Expr)
      // var input = temp1.concat(element3)
      // result = evalMath(input)
      // Our 7-segment result font can't display exponent
      const displayE = '<span style="font-family:monospace;">$&</span>'
      result = result.toString().replace(/e[\+-]/, displayE)
      console.log(element1)
      console.log(element2)
      console.log(element3)

    }
    resultElement.innerHTML = "= " + result
  } else if (token == 'AC') {
    input = []
    element1 = []
    element2 = []
    element3 = []
    element2Expr = ''
    element3Expr = ''
    currentElement = 1
    resultElement.innerHTML = 0
    exprElementOperator2.innerHTML = '&nbsp;'
    exprElementOperator3.innerHTML = '&nbsp;'
    updateExpr(input)
  } else if (token == 'DEL') {
    input.pop()
    updateExpr(input)
  } else if ( token == '+' || token == '-'){
    console.log(currentElement)
    if(currentElement == 1){
      if(token == '+'){
        exprElementOperator2.innerHTML = '+'
        element2Expr = '+'
      }else{
        exprElementOperator2.innerHTML = '-'
        element2Expr = '-'
      }
      currentElement++;
    } else if(currentElement == 2 && element2.length != 0){
      if(token == '+'){
        exprElementOperator3.innerHTML = '+'
        element3Expr = '+'
      }else{
        exprElementOperator3.innerHTML = '-'
        element3Expr = '-'
      }
      currentElement++;
    } else if(currentElement == 3){
      console.log("doing nothing")
    }
  } else {
    if(currentElement == 1){
      element1.push(token)
      console.log("pushing element 1")
      exprElement1.textContent = element1.join('')
    }
    if(currentElement == 2){
      element2.push(token)
      console.log("pushing element 2")
      exprElement2.textContent = element2.join('')
    }
    if(currentElement == 3){
      element3.push(token)
      console.log("pushing element 3")
      exprElement3.textContent = element3.join('')
    }
    //input.push(token)
    //updateExpr(input)
    resultElement.innerHTML = "= "
  }
   //console.log(input)
}
document.getElementById('calculator').addEventListener('click', buttonClick)

function updateExpr(input) {
  if (input.length == 0) {
    exprElement1.innerHTML = '&nbsp;'
    exprElement2.innerHTML = '&nbsp;'
    exprElement3.innerHTML = '&nbsp;'
  } else {
    //exprElement.textContent = input.join('')
    //exprElement1.textContent = element1.join('')
  }
}

function keyboardHandler(e) {
   //console.log(e)
  const buttonMap = {
    'Backspace': 'del',
    '.': 'decimal',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0',
    '+': 'plus',
    '-': 'minus',
    'x': 'multiply',
    '*': 'multiply',
    '/': 'divide',
    '^': 'pow',
    '(': 'left-paren',
    ')': 'right-paren',
    'Enter': 'equals',
    '=': 'equals',
    'c': 'ac'
  }
  const id = buttonMap[e.key]
  //console.log(id)
  if (id){
    //if(id != 'plus'){
    document.getElementById(id).click();
    //}
  }
}

window.addEventListener('keydown', keyboardHandler)

/*
Parsing code

Shunting-Yard, RPN evaluator and test cases
*/

// Performs preprocessing then evaluates the input
function evalMath(input) {
  console.log(input)
  const expr = input.map(token => {
    if (token == 'x') return '*'
    if (token == '÷') return '/'
    return token
  }).reduce((acc, curr, index) => {
    // Concat adjacent non-operator characters
    if(acc.length > 0 && !isOperator(curr) && !isOperator(acc[acc.length-1])) {
      acc[acc.length-1] += curr
    } else {
      acc.push(curr)
    }
    return acc
  }, [])
  // console.log(expr)
  return evalRpn(shuntingYard(expr))
}

// Takes expr (array of tokens) and returns RPN
// Detects unary minus and converts it to another operator
function shuntingYard(expr) {
  const precedence = {
    '#': 1, // internal op for unary minus
    '^': 2,
    '*': 3,
    '/': 3,
    '+': 4,
    '-': 4
  }
  const stack = []
  const output = []

  expr.forEach((token, index) => {
    // console.log(stack, token)
    if (isNumber(token)) {
      output.push(token)
    } else if (token == '(') {
      stack.push(token)
    } else if (token == ')') {
      while (stack[stack.length-1] && stack[stack.length-1] != '(') {
        output.push(stack.pop())
      }
      stack.pop()
    } else if (isOperator(token)) {
      // Detect unary minus
      const prevToken = expr[index-1]
      if (token == '-' && !isNumber(prevToken)) {
        token = '#'
      }
      // If stack is not empty and last token on stack is an operator THEN
      // Shunting-Yard definition says to check
      // lastOperator is left-asso AND lastOperator LESS THAN OR EQUAL operator
      // OR lastOperator is right-asso AND lastOperator LESS THAN operator
      // console.log('PRECEDENCE', stack.slice(-1)[0], precedence[stack.slice(-1)[0]])
      // console.log('PRECEDENCE', token, precedence[token])
      while (isOperator(stack[stack.length-1]) && (
        token == '^' ? precedence[stack[stack.length-1]] < precedence[token] :
        precedence[stack[stack.length-1]] <= precedence[token]
      )) {
        output.push(stack.pop())
      }
      stack.push(token)
    }
  })

  while (stack.length > 0) {
    output.push(stack.pop())
  }

  return output
}

// Takes RPN and returns result of evaluation
function evalRpn(expr) {
  // By using curried functions, we can eval operators of any arity using a while loop
  const operator = {
    '#': a => -a, // internal op for unary minus
    '+': b => a => a + b,
    '-': b => a => a - b,
    '*': b => a => a * b,
    '/': b => a => a / b,
    '^': b => a => Math.pow(a, b)
  }
  const stack = []

  expr.forEach(token => {
    if (isNumber(token)) {
      stack.push(parseFloat(token))
    } else {
      // console.log(stack, token)
      let result = operator[token]
      while (typeof result == 'function') result = result(stack.pop())
      stack.push(result)
    }
  })
  return stack[0]
}

// Tests
// I used these while writing the parser to verify correctness
// However, I've since changed some of my functions
// to receive and return arrays instead of strings, thus some tests will fail.
//
// const assert = condition => {
//   if (!condition) {
//     throw Error('Assertion Failed')
//   }
// }
// assert(evalMath(['5', '5', '-', '3']) == 52)
// assert(evalMath(['3', '2', '÷', '4']) == 8)
// assert(shuntingYard('3 + 4') == '3 4 +')
// assert(shuntingYard('- 2 + 8') == '2 # 8 +')
// assert(shuntingYard('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3') == '3 4 2 * 1 5 - 2 3 ^ ^ / +')
// assert(shuntingYard('0') == 0)
// assert(evalRpn('0') == 0)
// assert(evalRpn('2 # 8 +') == 6)
// assert(evalRpn('5 1 2 + 4 * + 3 -') == 14)
