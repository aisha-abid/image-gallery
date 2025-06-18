const filterButtons = document.querySelectorAll(".filter-buttons button");
const filterableCards = document.querySelectorAll(".images .card");
const cards = document.querySelectorAll(".images .card");
const closeIcon = document.querySelector(".close-icon");
const lightBox = document.querySelector(".lightbox");
const previewImg = lightBox.querySelector('.preview-img img');
const prevBtn = lightBox.querySelector(".prev-btn");
const nextBtn = lightBox.querySelector(".next-btn");
const heartIcons = document.querySelectorAll(".card .heart-icon");
const favoriteSection = document.querySelector(".favorite-section");
const hamburgerIcon = document.querySelector('.hamburger-menu-container');
const navContainer = document.querySelector('nav');
const filterBtnContainer = document.querySelector('.filter-buttons');
const crossIcon = document.querySelector(".filter-buttons .close-icon");
const lightboxHeart = document.querySelector('.lightbox .heart-icon');
let likedImages = JSON.parse(localStorage.getItem('likedImages')) || {};
let currentIndex = 0;

let filteredCards = Array.from(cards);
const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    console.log(e.target);



    //Iterate over each filterable card
    filterableCards.forEach(card => {

        card.classList.add("hide");
        const filterButton = e.target.dataset.name;

        if (filterButton === "all") {
            card.classList.remove("hide");
        } else if (filterButton === "favorite") {
            if (card.querySelector('.heart-icon').classList.contains('filled')) {
                card.classList.remove("hide");
            }
        } else if (card.dataset.name === filterButton) {
            card.classList.remove("hide");
        }


    });


    filteredCards = Array.from(document.querySelectorAll(".images .card:not(.hide)"));
};
//add click event listener to each filter button
filterButtons.forEach(button => button.addEventListener('click', filterCards));

cards.forEach((card, index) => card.addEventListener('click', (e) => {
    e.stopPropagation();
    lightBox.style.display = 'block';

    const imgE1 = card.querySelector('img');
    const imageSrc = imgE1.src;
    console.log(imageSrc);
    const imageId = imageSrc.split('/').pop().split('.')[0];

    console.log(imageId);
    const previewImgEl = lightBox.querySelector('.preview-img img');
    previewImgEl.src = imageSrc;
    previewImgEl.setAttribute('data-id', imageId);
    previewImgEl.setAttribute('src', imageSrc);
    previewImgEl.setAttribute('data-id', imageId);
    console.log("PREVIEW SET >>>", imageSrc, imageId);
    currentIndex = index;
    console.log("PREVIEW SET >>>", imageSrc, imageId);
    if (likedImages[imageId]) {
        lightboxHeart.classList.add('filled');
    } else {
        lightboxHeart.classList.remove('filled');
    }
}
));
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredCards.length;

    const newCard = filteredCards[currentIndex];
    const newImg = newCard.querySelector('img');
    const newSrc = newImg.getAttribute('src');
    const imageId = newSrc.split('/').pop().split('.')[0];

    previewImg.src = newSrc;
    previewImg.setAttribute('data-id', imageId);
    // ✅ Heart icon update based on likedImages
    if (likedImages[imageId]) {
        lightboxHeart.classList.add('filled');
    } else {
        lightboxHeart.classList.remove('filled');
    }
});
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredCards.length) % filteredCards.length;

    const newCard = filteredCards[currentIndex];
    const newImg = newCard.querySelector('img');
    const newSrc = newImg.getAttribute('src');
    const imageId = newSrc.split('/').pop().split('.')[0];

    previewImg.src = newSrc;
    previewImg.setAttribute('data-id', imageId);

    // ✅ Heart icon update based on likedImages
    if (likedImages[imageId]) {
        lightboxHeart.classList.add('filled');
    } else {
        lightboxHeart.classList.remove('filled');
    }
});

closeIcon.addEventListener('click', () => {
    lightBox.style.display = 'none';
})

heartIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const isFilled = icon.classList.toggle('filled');

        const card = icon.closest('.card')
        const imgEl = card.querySelector('img');
        const imgSrc = imgEl.getAttribute('src');
        const imageId = imgSrc.split('/').pop().split('.')[0];

        //update like images object
        if (isFilled) {
            likedImages[imageId] = true;
        } else {
            delete likedImages[imageId];
        }

        // Save update object to localstorage
        localStorage.setItem('likedImages', JSON.stringify(likedImages));

        // Sync Lightbox heart if it is showing same img
        const previewImg = document.querySelector('.preview-img img')
        previewImg.setAttribute('data-id', imageId);
        if (previewImg.getAttribute('data-id') === imageId) {
            if (isFilled) {
                lightboxHeart.classList.add('filled');
            } else {
                lightboxHeart.classList.remove('filled');
            }
        }
    })
})


lightboxHeart.addEventListener('click', () => {
    const imageId = previewImg.getAttribute('data-id');
    const isFilled = lightboxHeart.classList.toggle('filled');
    likedImages[imageId] = isFilled;
    localStorage.setItem('likedImages', JSON.stringify(likedImages));

    document.querySelectorAll('.card').forEach(card => {
        const cardImg = card.querySelector('img');
        const cardImgSrc = cardImg.getAttribute('src');
        const cardImageId = cardImgSrc.split('/').pop().split('.')[0];

        if (cardImageId === imageId) {
            const cardHeartIcon = card.querySelector('.heart-icon');
            if (isFilled) {
                cardHeartIcon.classList.add('filled');
            } else {
                cardHeartIcon.classList.remove('filled');
            }
        }
    })
})

lightBox.addEventListener('click', (e) => {

    if (e.target === lightBox) {
        lightBox.style.display = 'none';
    }
});

hamburgerIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    navContainer.classList.add('menu-open')
})

filterBtnContainer.addEventListener('click', (e) => {
    e.stopPropagation()
})
crossIcon.addEventListener('click', () => {
    navContainer.classList.remove('menu-open');
})
window.addEventListener('click', () => {
    navContainer.classList.remove('menu-open')
})
document.addEventListener('DOMContentLoaded', () => {
    heartIcons.forEach(icon => {
        const card = icon.closest('.card');
        const img = card.querySelector('img');
        const imageId = img.src.split('/').pop().split('.')[0];

        if (likedImages[imageId]) {
            icon.classList.add('filled');
        }
    });
});