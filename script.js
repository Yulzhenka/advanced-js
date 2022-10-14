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
                <button class="by-btn">В корзину</button>
            </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = JSON.parse(goods);
            cb(this.goods);
        });
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
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

const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    list.getTotalPrice();
});



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

cart.add({ id: 1, title: 'Пиджак', price: 17300, img: './img/Cos.jpeg' }); 

cart.add({ id: 3, title: 'Туфли', price: 35500, img: './img/SergioRossi.jpeg'});

cart.show();
//cart.clearCart();
cart.show();
cart.addTotalPriceBox();


