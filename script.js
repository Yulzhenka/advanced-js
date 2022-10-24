'use strict'; 

 
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    const promise = new Promise((resolve,reject) => {
        var xhr;
        if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });

    return promise;
}class GoodsItem {
    constructor(product_name, price, img) {
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="image" class="goods-img">
                <h3 class="goods-product_name">${this.product_name}</h3>
                <p class="goods-price">₽ ${this.price}</p>
                <button class="by-btn" onclick='cart.add(${JSON.stringify({id: 1, title: this.product_name, price: this.price})})'>В корзину</button>
            </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
            cb(this.goods);
        });
    }

    filterGoods(value){
        const regexp = new RegExp(value,'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
//посчитать итоговую сумму товаров
    getTotalPrice(){
        let sum = 0;
        for (let i=0; i<this.goods.length; i++){
            sum = sum + this.goods[i].price
        }
        console.log(sum);
    }
}
const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');
const enterPoleName = document.querySelector('.poleName');
const enterPoleText = document.querySelector('.poleText');
const enterPolePhone = document.querySelector('.polePhone');
const enterPoleEmail = document.querySelector('.poleEmail');
const buttonSend = document.querySelector('.btn-send');

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    list.getTotalPrice();
});

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
})
//-----


//создать класс Корзина
class Box {
    constructor(){
        this.items = [];
    }
    add(item){
        this.items.push(item); //добавить в корзину
    }
    show(){
        console.log(this.items); //показать корзину
    }
    /*clearCart(){
        this.items = [] //очистить корзину
    }*/
    addTotalPriceBox(){ //посчитать итог в корзине
        let sum = 0;
        for(let i=0; i<this.items.length; i++){
            sum = sum + this.items[i].price
        }
        console.log(sum)
    }
}

const cart = new Box();


cart.show();
//cart.clearCart();
//cart.show();
cart.addTotalPriceBox();

window.cart = cart;
/*
//ДЗ 4/1. Дан большой текст, в котором для оформления прямой речи используются одинарные
//кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.

const bigText = 'I approached her, and said: \'My porter has a barrow\' Miss Bradley turned and looked at me. \'Oh — thank you. It is very kind of you.\' \'Well, I\'ll say good-bye now, and go and find my train. I expect the examiner\'ll come back and do you next.\'';
console.log(bigText);
const regexp = /'/g;
console.log(regexp.test(bigText));
console.log(bigText.replace(regexp,'"'));

//ДЗ 4/2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на
//двойную.
const regexpPro = / '/g;
const regexpPro1 = /' /g; 
const regexpPro2 = /\.'/g;
const a = bigText.replace(regexpPro,' "');
const b = a.replace(regexpPro1,'" ');
const c = b.replace(regexpPro2,'"');
console.log(c);

const regexpPro3 = / "" \.'/g;
console.log(bigText.replace(regexpPro3,' "'));
*/
//ДЗ 4/3. Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
//При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
//a. Имя содержит только буквы.
//b. Телефон имеет вид +7(000)000-0000.
//c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
//d. Текст произвольный.
//e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
//и сообщить пользователю об ошибке

    
     




     