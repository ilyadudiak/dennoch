
$('.main').slick({
    infinite: true,
    slidesToShow: 1,
    draggable: false,
    rows: 1,
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
});
let burgerMenu = document.querySelector('.burger-menu');
let burgerMenuMenu = document.querySelector('.burger-menu-menu');
burgerMenu.style.display = "none";
burgerMenuMenu.classList.add('burger-animation-hide');
function burger() {
    if (burgerMenu.style.display == "flex") {
        setTimeout(() => {
            burgerMenu.style.display = "none";
            document.body.style.overflow = "auto";
        }, 500);

        burgerMenuMenu.classList.remove('burger-animation-show');
        burgerMenuMenu.classList.add('burger-animation-hide');

    } else {
        burgerMenu.style.display = "flex";
        document.body.style.overflow = "hidden";

        burgerMenuMenu.classList.add('burger-animation-show');
        burgerMenuMenu.classList.remove('burger-animation-hide');

    }
}
document.querySelector(".scroll-top").style.display = "none";
window.addEventListener('scroll', () => {
    if (window.pageYOffset < 200) {
        document.querySelector(".scroll-top").style.display = "none";
    } else if (window.pageYOffset > 200) {
        document.querySelector(".scroll-top").style.display = "block";
    }
})

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

}
let contacts = document.querySelector(".contacts")
let openContactsBtn = document.querySelector(".openContact");
let openContactsIcon = document.querySelector(".openContactIcon");
let hideContactsIcon = document.querySelector(".hideContactIcon");
contacts.classList.add("contacts-hide")
hideContactsIcon.style.display = "none";
openContactsBtn.addEventListener("click", openContacts);
let productObj = {
    name: '',
    quantity: 1,
    summary: 1
}
function openContacts() {

    if (contacts.classList.contains("contacts-hide")) {
        contacts.classList.remove("contacts-hide");
        contacts.classList.add("contacts-show");
        hideContactsIcon.style.display = "inline";
        openContactsIcon.style.display = "none";
        openContactsBtn.classList.toggle("openContact-white");

    } else {
        contacts.classList.remove("contacts-show");
        contacts.classList.add("contacts-hide");

        hideContactsIcon.style.display = "none";
        openContactsIcon.style.display = "inline";

        openContactsBtn.classList.toggle("openContact-white");
    }
}


//Important part there
let addButton = document.querySelectorAll('.shop__item-btn');
let cartWrapper = document.querySelector('.cart__wrapper');
cartWrapper.style.display = "none";
let summary = document.querySelector('.total-price__num');
let counter = document.querySelector('.cart-item__counter-count')

function addToCart() {
    let title = document.querySelector('.cart-item__title');
    let imgContainer = document.querySelector('.cart-item__img');

    imgContainer.style.backgroundImage = `url(img/${this.dataset.img})`;
    let thisTitle = this.dataset.title;

    let price = document.querySelector('.cart-result__num');
    let thisPrice = this.dataset.price;
    summary.textContent = thisPrice;
    productObj.summary = thisPrice;
    price.textContent = thisPrice;
    console.log(thisTitle);
    if (thisTitle.length > 20) {
        title.textContent = thisTitle.slice(0, 17) + '...';
    } else {
        title.textContent = thisTitle;
    }

    cartWrapper.style.display = "block";
    document.body.style.overflow = "hidden";


    productObj.name = thisTitle;

}
function cartIncrement() {

    if (counter.textContent < 100) {
        counter.textContent = (Number(counter.textContent) + 1);
        summary.textContent = Number(summary.textContent *= 2);

    }
    console.log(counter);

    productObj.quantity = counter.textContent;
    productObj.summary = summary.textContent;

}
function cartDecrement() {
    if (counter.textContent > 1) {
        counter.textContent = (Number(counter.textContent) - 1);
        summary.textContent = Number(summary.textContent /= 2);
    }
}
function cartClose() {
    cartWrapper.style.display = "none";
    document.body.style.overflow = "auto";
    location.reload()
    counter.textContent = 1;
}
addButton.forEach(element => {
    element.addEventListener('click', addToCart);

});

// Telegram bot code


const TOKEN = "5431953570:AAGD2c7LwhPs-Os4RtIV3OB3JqGG24Xob2k";
const CHAT_ID = "-1001815097482";
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
document.getElementById('main-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `<b>Заявка с сайта День Ночь</b>\n`;
    message += `<b>Отправитель:</b> ${this.name.value}\n`;
    message += `<b>Номер телефона:</b> ${this.phone.value}\n`;
    message += `<b>Город:</b> ${this.city.value}\n`;
    message += `<b>Товар:</b> ${productObj.name}\n`;
    message += `<b>Количество:</b> ${productObj.quantity}\n`;
    message += `<b>Сумма:</b> ${productObj.summary} грн\n`;
    console.log(message);

    axios.post(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
    })
        .then((res) => {
            let cartMenu = document.querySelector('.cart__menu');
            cartMenu.classList.add('processed');
            cartMenu.innerHTML = `
            <img class="cartSuccessImage" src="img/success.png">
            <h1 class="success-title">Заявка успешно <br> отправлена!</h1>
           `;
            productObj = {
                name: '',
                quantity: 1,
                summary: 1
            }
        })
        .catch((err) => {
            let cartMenu = document.querySelector('.cart__menu');
            cartMenu.classList.add('processed');
            cartMenu.innerHTML = `
            
            <h1 class="eror-title">Ой! Что то пошло не-так!</h1>
           `;
            console.log(err);
        })
        .finally(() => {

        })


});

let reviews = $('.reviews__items');

if (reviews.outerWidth() > 805) {
    reviews.masonry({
        itemSelector: '.grid-item',
        columnWidth: 200
    });
}

// if ($('.shop__items').outerWidth() < 1058) {
//     let rows = document.querySelectorAll('.shop-row');
//     rows.forEach(element => {
//         element.slick({
//             infinite: true,
//             slidesToShow: 1,
//             draggable: false,
//             rows: 1,
//             slidesPerRow: 1,
//             autoplay: false,
//             autoplaySpeed: 3000,
//             dots: false,
//         });
//     });
// }

window.addEventListener('resize', () => {
    if (reviews.outerWidth() > 782) {
        reviews.masonry({
            itemSelector: '.grid-item',
            columnWidth: 200
        });
    }
});



