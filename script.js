'use strict'; 

 class GoodsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <img src="${this.img}" alt="image" class="goods-img">
                <h3 class="goods-title">${this.title}</h3>
                <p class="goods-price">₽ ${this.price}</p>
                <button class="by-btn">В корзину</button>
            </div>`;
    }
};

class GoodsList {
    constructor() {
this.goods = [];
}
fetchGoods() {
this.goods = [
    { id: 1, title: 'Пиджак', price: 17300, img: './img/Cos.jpeg' },
    { id: 2, title: 'Длинное платье', price: 160000, img: './img/Valentino.jpeg' },
    { id: 3, title: 'Туфли', price: 35500, img: './img/SergioRossi.jpeg'},
];
}
render() {
let listHtml = '';
this.goods.forEach(good => {
const goodItem = new GoodsItem(good.title, good.price, good.img);
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
list.fetchGoods();
list.render();
list.getTotalPrice();

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


