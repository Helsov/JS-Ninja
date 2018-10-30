console.time('Work');

function addMessage(element, message){
    let messageElement = document.createElement('li');
    messageElement.textContent = message;
    element.appendChild(messageElement);
};

let first = document.querySelector('#first');
addMessage(first, "Page Loading");

document.body.addEventListener("mousemove", function(){
    let second = document.querySelector('#second');
    addMessage(second, "Event: mousemove");
});

document.body.addEventListener("click", function(){
    let second = document.querySelector("#second");
    addMessage(second, "Event: click");
});

function assert (value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc));
    document.querySelector('#results').appendChild(li);
};

function report (text) {
    assert (true, text);
};

var text = "Domo arigato!";
report ("Before defining functions");

function useless (ninjaCallback) {
    report ("In useless function");
    return ninjaCallback;
};

function getText(){
    report("In getText function");
    return text;
};

report("Before making all the calls");

assert(useless(function(){
    return text;
}) === text, "The useless function works!" + text);
report ("After the calls have been made");

var values = [0, 3, 2, 5, 7, 4, 8, 1];

/*CACHE Сохранение уникальных функций в коллекции */
var store = {
	nextId: 1,
	cache: {},
	add: function(fn){
		if(!fn.id){
			fn.id = this.nextId++;
			this.cache[fn.id] = fn;
			return true;
		}	
	}
};

function ninja(){};

store.add(ninja);

/*Запоминание вычисленных ранее значений*/
function isPrime (value){
	if (!isPrime.answers){
		isPrime.answers = {};
	};

	if (isPrime.answers[value] !== undefined) {
		return isPrime.answers[value];
	};

	var prime = value !== 0 && value !== 1;

	for (var i = 2; i < value; i++) {
		if (value % i === 0) {
			prime = false;
			break;
		}
	};

	return isPrime.answers[value] = prime;

};

console.timeEnd('Work');