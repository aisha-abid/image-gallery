const  filterButtons=document.querySelectorAll(".filter-buttons button");
const filterableCards=document.querySelectorAll(".images .card");
const cards=document.querySelectorAll(".images .card");
const closeIcon=document.querySelector(".close-icon");
const lightBox=document.querySelector(".lightbox");



//Define the filterCard function
const filterCards=e=>{
    document.querySelector(".active").classList.remove(".active");
    e.target.classList.add("active");
    console.log(e.target);


//Iterate over each filterable card
filterableCards.forEach(card=>{
    card.classList.add("hide");
    if(card.dataset.name===e.target.dataset.name || e.target.dataset.name==="all"){
        card.classList.remove("hide");
    };
});
};

//add click event listener to each filter button
filterButtons.forEach(button=>button.addEventListener('click',filterCards));

const previewCard=e=>{
    console.log(e.target);
}
cards.forEach(card=>card.addEventListener('click',()=>{
    lightBox.style.display='block';
    const imgSrc = card.querySelector('img').src;
    lightBox.querySelector('.preview-img img').src = imgSrc;

}));
closeIcon.addEventListener('click',()=>{
    lightBox.style.display='none';
})