

(function (win, doc) {
  'use strict';

  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
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
      return (this.element.length > 1 ? this.element : this.element[0]);
    };

    this.forEach = function() {
      Array.prototype.forEach.apply(this.element, arguments);
    };

    this.map = function() {
      return Array.prototype.map.apply(this.element, arguments);
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

  var $txtCEP = new DOM('[data-js="txtCEP"]');
  var $btnConsultar = new DOM('[data-js="btnConsultar"]');
  var $spanStatusReq = new DOM('[data-js="spanStatusReq"]');
  var cepWebservice = "https://viacep.com.br/ws/[CEP]/json/";

  $btnConsultar.on('click', consultarCEP);

  function consultarCEP() {
    var ajax = new XMLHttpRequest();
    ajax.addEventListener('readystatechange', statusRequisicaoChangeMonitor);
    ajax.addEventListener('readystatechange', tratarRetornoServidor);
    ajax.open("GET", cepWebservice.replace("[CEP]", limparCEP($txtCEP.get().value)));
    ajax.send();
  }

  function limparCEP(cepSujo) {
    return cepSujo.replace(/\D+/g, "");
  }

  function statusRequisicaoChangeMonitor() {
    var ajaxStatus = {
      0: 'Requisição não iniciada.',
      1: 'Conexão com o servidor estabelecida.',
      2: 'Requisição recebida.',
      3: 'Processando requisição.',
      4: 'Requisição finalizada e resposta disponível.',
    };

    alterarTextoStatusRequisicao(ajaxStatus[this.readyState]);
  }

  function alterarTextoStatusRequisicao(text) {
    $spanStatusReq.get().firstChild.nodeValue = text;
  }

  function tratarRetornoServidor() {
    if (this.readyState === 4) {
      if (this.status === 200 && this.responseText !== "" && converterRespostaServidorEmObject(this.responseText).erro !== true)
        preencherTelaComDadosCep(converterRespostaServidorEmObject(this.responseText))
      else
        alterarTextoStatusRequisicao("Erro ao consultar CEP");
    }
  }

  function converterRespostaServidorEmObject(str) {
    return JSON.parse(str);
  }

  function preencherTelaComDadosCep(cepObject) {
    var tdLogradouro = '[data-js="tdLogradouro"]';
    var tdBairro = '[data-js="tdBairro"]';
    var tdEstado = '[data-js="tdEstado"]';
    var tdCidade = '[data-js="tdCidade"]';
    var tdCEP = '[data-js="tdCEP"]';

    console.log(cepObject);

    preencher(tdLogradouro, cepObject.logradouro);
    preencher(tdBairro, cepObject.bairro);
    preencher(tdEstado, cepObject.uf);
    preencher(tdCidade, cepObject.localidade);
    preencher(tdCEP, cepObject.cep);
  }

  function preencher(qSelector, valor) {
    doc.querySelector(qSelector).textContent = valor;
  }


})(window, document);
