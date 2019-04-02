console.time('Work');

// function addMessage(element, message){
//     let messageElement = document.createElement('li');
//     messageElement.textContent = message;
//     element.appendChild(messageElement);
// };

// let first = document.querySelector('#first');
// addMessage(first, "Page Loading");

// document.body.addEventListener("mousemove", function(){
//     let second = document.querySelector('#second');
//     addMessage(second, "Event: mousemove");
// });

// document.body.addEventListener("click", function(){
//     let second = document.querySelector("#second");
//     addMessage(second, "Event: click");
// });

// function assert (value, desc) {
//     var li = document.createElement("li");
//     li.className = value ? "pass" : "fail";
//     li.appendChild(document.createTextNode(desc));
//     document.querySelector('#results').appendChild(li);
// };

// function report (text) {
//     assert (true, text);
// };

// var text = "Domo arigato!";
// report ("Before defining functions");

// function useless (ninjaCallback) {
//     report ("In useless function");
//     return ninjaCallback;
// };

// function getText(){
//     report("In getText function");
//     return text;
// };

// report("Before making all the calls");

// assert(useless(function(){
//     return text;
// }) === text, "The useless function works!" + text);
// report ("After the calls have been made");

// var values = [0, 3, 2, 5, 7, 4, 8, 1];

/*CACHE Сохранение уникальных функций в коллекции */
var store = {
    nextId: 1,
    cache: {},
    add: function (fn) {
        if (!fn.id) {
            fn.id = this.nextId++;
            this.cache[fn.id] = fn;
            return true;
        }
    }
};

function ninja() {};

store.add(ninja);

/*Запоминание вычисленных ранее значений*/
function isPrime(value) {
    if (!isPrime.answers) {
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

//Прописываем свойства для Бургера
class Burger {
    constructor(builder) {
        this.size = builder.size;
        this.cheeze = builder.cheeze || false;
        this.pepperoni = builder.pepperoni || false;
        this.lettuce = builder.lettuce || false;
        this.tomato = builder.tomato || false;
    }
}

//Строитель Бургера, для добавления ингредиентов и изменения их свойств, + возвращение бургера
class BurgerBuilder {

    constructor(size) {
        this.size = size;
    };

    addPepperoni() {
        this.pepperoni = true;
        return this;
    };

    addLettuce() {
        this.lettuce = true;
        return this;
    };

    addCheeze() {
        this.cheeze = true;
        return this;
    };

    addTomato() {
        this.tomato = true;
        return this;
    };

    build() {
        return new Burger(this);
    };
}

//Создаем бургер
const burger = (new BurgerBuilder(14))
    .addPepperoni()
    .addLettuce()
    .addTomato()
    .build()


//Синглтон - В этом примере частная информация скрыта от внешнего кода. Публичный метод позволяет узнать имя президента (но не изменить его)
const president = (function () {
    const presidentsPrivateInformation = 'Super private';
    const name = 'Turd Sandwich';
    const getName = () => name;
    return {
        getName
    };
}());

president.getName() // 'Turd Sandwich'
president.name // undefined
president.presidentsPrivateInformation // undefined

class myTest {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            circle: false,
            color: 'black',
            animation: false
        }, options);

        // this.getStatus();
        this.setBackground();

        this.options.circle && this.getCircle();
    }

    // getStatus(){
    //     return (
    //         console.log(this.element, this.options)
    //     )
    // }

    setBackground() {
        return this.element.style.background = this.Background;
    }

    getCircle() {
        return this.element.style.borderRadius = '50%';
    }

    get Background() {
        return this.options.color;
    }

}

new myTest(document.querySelector('.test-block__one'), {
    color: 'red',
    circle: true
})

new myTest(document.querySelector('.test-block__two'));

/**SLIDER */
class Slider {
    /**
     * @param {HTMLElement} element
     * @param {Object} options={}
     * @param {Object} [options.time=1000] PropTypes.number,
     * @param {Boolean} [options.autoplay=false] PropTypes.number,
     */
    constructor(element, options = {}) {
        this.element = document.querySelector(element);
        this.options = Object.assign({}, {
            time: 1000,
            autoplay: false,
        }, options);

        this.slider = [];
        this.slides = [];
        this.step = 0;
        this.offset = 0;

        /** Modific DOM */
        this.getSlides();
        this.removeSlides();
        this.addElement();
        this.addElement();

        if(this.options.autoplay){
            this.autoPlay();
        }
    }

    /**
     * @return {Array} new array slides children 
     */
    getSlides() {
        return this.slides = Array.from(this.element.children);
    }

    /**
     * @return remove HTMLElements
     */
    removeSlides() {
        this.slides.forEach((value, key) => {
            this.slider[key] = value.src;
            value.remove();
        });
    }

    addElement() {
        let img = document.createElement('img');
        img.src = this.slider[this.step];
        img.classList.add('slide-single');
        img.style.left = this.offset * 200 + 'px';
        img.style.transition = `${this.options.time}ms`;
        this.element.appendChild(img);

        this.step + 1 == this.slider.length ? this.step = 0 :  this.step++;

        this.offset = 1;
    }

    nextSlide() {
        this.addElement();
        let mainSlides = document.querySelectorAll('.slide-single');
        let offsetSlide = 0;
        mainSlides.forEach(element => {
            element.style.left = offsetSlide * 200 - 200 + 'px';
            offsetSlide++;
        });
        
        this.removeElem();
    }

    autoPlay(){
        setInterval(()=>{
            this.nextSlide()
        },this.options.time + 5)
    }

    removeElem() {
        setTimeout(() => {
            this.element.firstElementChild.remove();
        }, this.options.time - 5);
    }

}

new Slider('#slide', {
    time: 2000,
    autoplay: true
});


// let slides = document.querySelectorAll('.slide-single');
// console.log(slides)
// let slider = [];

// slides.forEach((value, key) => {
//     slider[key] = value.src;
//     value.remove();
// });

// console.log(slider)

// let step = 0;
// let offset = 0;

// function draw() {
//     let img = document.createElement('img');
//     img.src = slider[step];
//     img.classList.add('slide-single');
//     img.style.left = offset * 200 + 'px';
//     document.querySelector('#slide').appendChild(img);

//     if (step + 1 == slider.length) {
//         step = 0
//     } else {
//         step++;
//     }
//     offset = 1;
// }

// function left() {
//     document.onclick = null;
//     let slides2 = document.querySelectorAll('.slide-single');
//     let offset2 = 0;
//     slides2.forEach(element => {
//         element.style.left = offset2 * 200 - 200 + 'px';
//         offset2++;
//     });
//     setTimeout(function () {
//         slides2[0].remove();
//         draw();
//         document.onclick = left;
//     }, 1000)
// }

// draw();
// draw();


// document.onclick = left;

class GreetingElement extends HTMLElement {
    constructor() {
        super();
        this._name = "Stranger";
    };

    connectedCallback() {
        this.addEventListener('click', e => alert(`Hello, ${this._name}`));
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'name') {
            if (newValue) {
                this._name = newValue;
            } else {
                this._name = 'Stranger'
            }
        }
    }
}

GreetingElement.observedAttributes = ['name'];
customElements.define('my-element', GreetingElement);

var root = elem.createShadowRoot();
root.innerHTML = "<h3><content></content></h3> <p>Привет из подполья!</p>";

let template = document.querySelector('template');

class FancyButton extends HTMLElement {
    constructor() {
        super(); // this is mandatory
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');
    }
    connectedCallback() {
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(document.importNode(template.content, true));
        this.iconEl = shadowRoot.querySelector('img');
        this.setIcon(this.getAttribute('icon'));
        this.addEventListener('click', e => alert(this.getAttribute('icon')));
        // console.log(shadowRoot)
    }
    attributeChangedCallback(attr, oldVal, newVal) {
        if (attr === 'icon' && oldVal !== newVal) {
            this.setIcon(newVal);
        }
    }
    setIcon(url) {
        // console.log(url)
        if (!this.iconEl) return;
        if (url === null) {
            this.iconEl.style.display = 'none';
        } else {
            this.iconEl.src = url;
            this.iconEl.style.display = 'block';
        }
    }
}

FancyButton.observedAttributes = ['icon'];

customElements.define('fancy-button', FancyButton);

console.timeEnd('Work');