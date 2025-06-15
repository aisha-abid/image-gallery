const  filterButtons=document.querySelectorAll(".filter-buttons button");
const filterableCards=document.querySelectorAll(".images .card");
const cards=document.querySelectorAll(".images .card");
const closeIcon=document.querySelector(".close-icon");
const lightBox=document.querySelector(".lightbox");
const previewImg = lightBox.querySelector('.preview-img img');
const prevBtn=lightBox.querySelector(".prev-btn");
const nextBtn=lightBox.querySelector(".next-btn");
const heartIcon=document.querySelectorAll(".heart-icon");
const favoriteBtn=document.querySelector("button .favorite");
const hamburgerIcon=document.querySelector('.hamburger-menu-container');
const navContainer=document.querySelector('nav');
const filterBtnContainer=document.querySelector('.filter-buttons');
const crossIcon=document.querySelector(".filter-buttons .close-icon");

let currentIndex=0;
let filteredCards =Array.from(cards);
//Define the filterCard function
const filterCards=e=>{
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    console.log(e.target);



//Iterate over each filterable card
filterableCards.forEach(card=>{
    
    card.classList.add("hide");
    const filterButton = e.target.dataset.name;

    if (filterButton === "all") {
        card.classList.remove("hide");
    } else if (filterButton=== "favorite") {
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
filterButtons.forEach(button=>button.addEventListener('click',filterCards));

cards.forEach((card,index)=>card.addEventListener('click',(e)=>{
    e.stopPropagation();
    lightBox.style.display='block';
    const imgSrc = card.querySelector('img').src;
    lightBox.querySelector('.preview-img img').src = imgSrc;
    currentIndex=index;
    currentIndex=Array.from(filteredCards).indexOf(card)
    
}
));
nextBtn.addEventListener('click',()=>{
    currentIndex=(currentIndex+1)%filteredCards.length;
    previewImg.src=filteredCards[currentIndex].querySelector('img').src
});

prevBtn.addEventListener('click',()=>{
    currentIndex=(currentIndex-1+filteredCards.length)%filteredCards.length;
    previewImg.src=filteredCards[currentIndex].querySelector('img').src
});
closeIcon.addEventListener('click',()=>{
    lightBox.style.display='none';
})


//like and unlike
heartIcon.forEach((icon)=>{
   icon.addEventListener('click',(e)=>{
     e.stopPropagation()
    console.log("heart");
    icon.classList.toggle("filled");
    e.stopPropagation()
});
});




lightBox.addEventListener('click', (e) => {

    if (e.target === lightBox) {
        lightBox.style.display = 'none';
    }
});



hamburgerIcon.addEventListener('click',(e)=>{
    e.stopPropagation()
    navContainer.classList.add('menu-open')
})

filterBtnContainer.addEventListener('click',(e)=>{
    e.stopPropagation()
})
crossIcon.addEventListener('click',()=>{
    navContainer.classList.remove('menu-open');
})
window.addEventListener('click',()=>{
    navContainer.classList.remove('menu-open')
})
