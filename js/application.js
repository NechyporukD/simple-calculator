// Variables
var current = 0, memory = 0, outcome = 0;
var last_action='';
var new_number = true, accamulate = true, paste_number = false;

// Contol elements
var numbers = document.getElementsByClassName('calculator__number'),
	result = document.getElementById('result');

// Enter numbers
var separator = '.';

for (var i = 0; i < numbers.length; i++) {
	numbers[i].onclick = function(e){
		e.preventDefault();

		if (new_number) {
			if (last_action == '='){
				outcome = 0;
			}

			if (this.innerHTML === separator) {
				result.value = '0' + this.innerHTML;
			} else {
				result.value = this.innerHTML;
			}

			new_number = false;
		} else {
			if ( !(this.innerHTML === separator && result.value.indexOf(separator) > 1) ) {
				result.value += this.innerHTML;
			}
		}

		paste_number = true;
	};
}

// Helper function
function cultculate(operator){
	if (accamulate) {
		if (outcome === 0){
			outcome = parseFloat(result.value);
		} else {
			switch(operator){
				case '+':
					outcome += parseFloat(result.value);
					break;
				case '-':
					outcome -= parseFloat(result.value);
					break;
				case '*':
					outcome *= parseFloat(result.value);
					break;
				case '/':
					outcome /= parseFloat(result.value);
					break;
			}
		}
	} else {
		accamulate = true;
	}

	paste_number = false;
}

function show_result(){
	// Typing
	new_number = true;

	//Update visual value
	result.value = outcome;
}

function basic_arithmetic(operator){
	if (paste_number == true){
		cultculate(last_action);
		show_result();
	}
	
	last_action = operator;
		
}

function use_memory(){
	new_number = true;
	accamulate = true;
	outcome = 0;
}

// Arithmetic function
function add(e){
	e.preventDefault();
	basic_arithmetic('+');
}

function subtract(e){
	e.preventDefault();
	basic_arithmetic('-');
}

function multiply(e){
	e.preventDefault();
	basic_arithmetic('*');
}

function divide(e){
	e.preventDefault();
	basic_arithmetic('/');
}

// Memory function
function memory_add(e){
	e.preventDefault();
	memory += parseFloat(result.value);
	use_memory();
}

function memory_subtract(e){
	e.preventDefault();
	memory -= parseFloat(result.value);
	use_memory();
}

function memory_recall(e){
	e.preventDefault();
	result.value = memory;
	use_memory();
}

function memory_clear(e){
	e.preventDefault();
	memory = 0;
	use_memory();
}

// Result funtion
function equal(e){
	e.preventDefault();

	if (paste_number == true){

		switch(last_action){
			case '+':
				outcome = outcome + +result.value;
				break;
			case '-':
				outcome = outcome - +result.value;
				break;
			case '*':
				outcome = outcome * +result.value;
				break;
			case '/':
				outcome = outcome / +result.value;
				break;
		}

		console.log(outcome.toString().length);

		//Update visual value
		result.value = outcome;
		paste_number = false;
	}
	
	last_action = '=';
	new_number = true;
	accamulate = true;
}

function clean(e){
	e.preventDefault();
	// Set defaut value and clean visual display
	new_number = true;
	accamulate = true;
	outcome = 0;
	result.value = '0';
}