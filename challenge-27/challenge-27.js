(function (win, doc) {
  'use strict';
  /*
  Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
  métodos semelhantes aos que existem no array, mas que sirvam para os
  elementos do DOM selecionados.
  Crie os seguintes métodos:
  - forEach, map, filter, reduce, reduceRight, every e some.

  Crie também métodos que verificam o tipo do objeto passado por parâmetro.
  Esses métodos não precisam depender de criar um novo elemento do DOM, podem
  ser métodos estáticos.

  Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
  no objeto, como nos exemplos abaixo:
  DOM.isArray([1, 2, 3]); // true
  DOM.isFunction(function() {}); // true
  DOM.isNumber('numero'); // false

  Crie os seguintes métodos para verificação de tipo:
  - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
  O método isNull deve retornar `true` se o valor for null ou undefined.
  */


  function DOM(htmlElement) {
    this.element = doc.querySelectorAll(htmlElement);
    this.element.registeredEvents = [];

    this.on = function(eventType, callback) {
      this.element.forEach(function(item) {
        item.addEventListener(eventType, callback, false);
      });

      this.element.registeredEvents.push({
        eventType: eventType,
        callback: callback,
      });

    };

    this.off = function() {
      this.element.registeredEvents.forEach(function(eventItem) {
        this.element.forEach(function(elementItem) {
          elementItem.removeEventListener(eventItem.eventType, eventItem.callback);
        });
      }, this);
    };

    this.get = function() {
      return this.element;
    };

    this.forEach = function(callback, thisArgs) {
      Array.prototype.forEach.call(this.element, callback, thisArgs);
    };

    this.map = function(callback, thisArgs) {
      return Array.prototype.map.call(this.element, callback, thisArgs);
    };

    this.filter = function(callback, thisArgs) {
      Array.prototype.filter.call(this.element, callback, thisArgs);
    };

    this.reduce = function(callback, initialValue) {
      Array.prototype.reduce.call(this.element, callback, initialValue);
    };

    this.reduceRight = function(callback, initialValue) {
      Array.prototype.reduceRight.call(this.element, callback, initialValue);
    };

    this.every = function(callback, thisArgs) {
      Array.prototype.every.call(this.element, callback, thisArgs);
    };

    this.some = function(callback, thisArgs) {
      Array.prototype.some.call(this.element, callback, thisArgs);
    };


  }

  DOM.whatTypeItIs = function (val) {
    return Object.prototype.toString.call(val).match(/^\[\w+?\s(\w+?)\]$/)[1];
  };

  DOM.isArray = function (val) {
    return DOM.whatTypeItIs(val) === "Array"
  }

  DOM.isObject = function (val) {
    return DOM.whatTypeItIs(val) === "Object"
  }

  DOM.isFunction = function (val) {
    return DOM.whatTypeItIs(val) === "Function"
  }

  DOM.isNumber = function (val) {
    return DOM.whatTypeItIs(val) === "Number"
  }

  DOM.isString = function (val) {
    return DOM.whatTypeItIs(val) === "String"
  }

  DOM.isBoolean = function (val) {
    return DOM.whatTypeItIs(val) === "Boolean"
  }

  DOM.isNull = function (val) {
    return (DOM.whatTypeItIs(val) === "Null" || DOM.whatTypeItIs(val) === "Undefined");
  }

  var $addEventButton = new DOM('[data-js="addEventButton"]');
  var $removeEventButton = new DOM('[data-js="removeEventButton"]');
  var $a = new DOM('[data-js="link"]');

  $addEventButton.on('click', function() {
    $a.on('click', function(e) {
      e.preventDefault();
      //console.log('clicou 1');
    });
     //console.log('Adicionou evento "click"');
  });

  $removeEventButton.on('click', function() {
    $a.off();
    //console.log('Removeu evento "click"');
  });

  $a.forEach(function(item) {
    console.log('Item:', item);
  });

  console.log($a.map(function(item, index) {
    item.href = 'javascript:void(' + index + ')';
    return item;
  }));

  var meuArray = [1, 2, 3];
  console.log('meuArray é do tipo Array?', DOM.isArray(meuArray));
  var meuObjeto = {};
  console.log('meuObjeto é do tipo Object?', DOM.isObject(meuArray));
  var meuArray = [1, 2, 3]
  console.log('meuArray é do tipo Array?', DOM.isArray(meuArray));
  var meuArray = [1, 2, 3]
  console.log('meuArray é do tipo Array?', DOM.isArray(meuArray));
  var meuArray = [1, 2, 3]
  console.log('meuArray é do tipo Array?', DOM.isArray(meuArray));
  var meuArray = [1, 2, 3]
  console.log('meuArray é do tipo Array?', DOM.isArray(meuArray));



})(window, document);
