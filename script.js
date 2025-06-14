const  filterButtons=document.querySelectorAll(".filter-buttons button");
const filterableCards=document.querySelectorAll(".images .card");
const cards=document.querySelectorAll(".images .card");
const closeIcon=document.querySelector(".close-icon");
const lightBox=document.querySelector(".lightbox");
const previewImg = lightBox.querySelector('.preview-img img');
const prevBtn=lightBox.querySelector(".prev-btn");
const nextBtn=lightBox.querySelector(".next-btn");



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
    if(card.dataset.name===e.target.dataset.name || e.target.dataset.name==="all"){
        card.classList.remove("hide");
    };
});

filteredCards = Array.from(document.querySelectorAll(".images .card:not(.hide)"));
};
//add click event listener to each filter button
filterButtons.forEach(button=>button.addEventListener('click',filterCards));

cards.forEach((card,index)=>card.addEventListener('click',()=>{
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
