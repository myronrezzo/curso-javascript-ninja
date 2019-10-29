/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

(function(win, doc) {
  'use strict';

  var operations = ['+', '-', '*', '/'];
  var $visor = doc.querySelector('[data-js="txtDisplay"]');
  var $numbersButtons = doc.querySelectorAll('[data-js="numberButton"]');
  var $operationsButtons = doc.querySelectorAll('[data-js="operationButton"]');
  var $equalButton = doc.querySelector('[data-js="equalButton"]');
  var $ceButton = doc.querySelector('[data-js="ceButton"]');

  Array.prototype.forEach.call($numbersButtons, function(numButton) {
    numButton.addEventListener('click', handleNumberButtonClick, false);
  });

  Array.prototype.forEach.call($operationsButtons, function(operButton) {
    operButton.addEventListener('click', handleOperationButtonClick, false);
  });

  $equalButton.addEventListener('click', handleEqualButtonClick, false);

  $ceButton.addEventListener('click', handleCEButtonClick, false);



  function handleNumberButtonClick() {
    $visor.value = !visorHasOnlyZero() ? $visor.value + this.value : this.value;
  }

  function handleOperationButtonClick() {

    if (visorHasOnlyZero())
      return;

    removeLastCharIfItIsAnOperation();
    $visor.value += this.value;
  }

  function handleEqualButtonClick() {
    removeLastCharIfItIsAnOperation();
    resolveOperations();
  }

  function handleCEButtonClick() {
    $visor.value = 0;
  }


  function visorHasOnlyZero() {
    return $visor.value === '0';
  }

  function isLastPressedButtonAnOperation() {

    var lastCharInVisor = $visor.value.split('').pop();
    return operations.some(function(item) {
      return item === lastCharInVisor;
    });
  }

  function removeLastCharIfItIsAnOperation() {
    if (isLastPressedButtonAnOperation())
      $visor.value = $visor.value.slice(0, -1);
  }

  function resolveOperations() {
    //var allOperationsFromVisor = $visor.value;
    var visorFinalExpression = $visor.value;
    var allOperationsToDo = allOperationsFromVisorArray();
    allOperationsToDo.forEach( function(operator) {
      var nextOperationRegex = new RegExp('\\d+\\' + operator + '\\d+', 'g');
      visorFinalExpression = visorFinalExpression.replace(nextOperationRegex, doOperation(nextOperationRegex.exec(visorFinalExpression)[0], operator));
    });

    $visor.value = visorFinalExpression;
  }

  function allOperationsFromVisorArray() {
    var totalOperationsCounterRegex = /[+\-*/]/g;
    return $visor.value.match(totalOperationsCounterRegex);
  }

  function doOperation(operationString, operator) {
    var calc = {
      '+': function(a, b) { return Number(a) + Number(b); },
      '-': function(a, b) { return Number(a) - Number(b); },
      '*': function(a, b) { return Number(a) * Number(b); },
      '/': function(a, b) { return Number(a) / Number(b); },
    };

    /* console.log('operationString', operationString);
    console.log('operator', operator);
    console.log('calc[operator]', calc[operator]);
    console.log('operationString.split(operator)', operationString.split(operator));
    console.log('calc[operator].apply(operationString.split(operator))', calc[operator].apply(operationString.split(operator))); */
    return calc[operator].apply(calc, operationString.split(operator));
  }

})(window, document);
