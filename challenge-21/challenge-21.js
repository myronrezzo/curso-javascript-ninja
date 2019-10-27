(function(win, doc) {
	'use strict';
	/*
	O desafio de hoje será um pequeno projeto: um cronômetro!
	As regras para criação do cronômetro são as seguintes:
	1. Crie um arquivo index.html e adicione esse script a ele;
	2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
	Ele será o nosso cronômetro;
	3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
	4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
	cada segundo;
	5. Ao clicar em Stop, o cronômetro deve parar de contar;
	6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.

	Utilize o atributo data-js para nomear o campo e os botões. Você pode
	usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
	dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
	*/
	
	var contador = 0;
	var timeoutId = -1;
	var isTimerExecuting
	
	function start() {
		$txtTimer.value = contador++;
		timeoutId = win.setTimeout(start, 1000);
	}
	
	function stop() {
		win.clearTimeout(timeoutId);
		timeoutId = -1;
	}
	
	function resetTimer() {
		stop();
		$txtTimer.value = (contador = 0);
	}
	
	var $txtTimer = doc.querySelector('[data-js="txtTimer"]');
	var $btnStart = doc.querySelector('[data-js="btnStart"]');
	var $btnStop = doc.querySelector('[data-js="btnStop"]');
	var $btnReset = doc.querySelector('[data-js="btnReset"]');
	
	$txtTimer.value = 0;
	
	$btnStart.addEventListener('click', function isRunning() {
		if (timeoutId !== -1)
			return;
		start();
	}, false);
	$btnStop.addEventListener('click', stop, false);
	$btnReset.addEventListener('click', resetTimer, false);
	
})(window, document);