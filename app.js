'use strict';


//***************** Global Variables *****************
let votingRounds = 5;
let productArray = [];


//***************** DOM References *****************

let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('show-results-btn');


//********************* Constructor ********* this refers to the object that gets instantiated from this constructor
// fileExtension is a default parameter that your images will run through. use default paramaters at the end

function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.img = `img/${name}.${fileExtension}`;
  this.click = 0;
  this.views = 0;

  productArray.push(this);
}

//the term "this" refers to any goat that's going to be created from my constructor, and this is a function, so I can still do javascript type things with it. it is creating objects, for me, but it's still a function in javascript. putting "this" in the paranthesis of the array states that you are going to then push any object that is created from that constructor into my goat array.

// These new products go through the constructor and gets assigned all the properties that are in the object

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('water-can');
new Product('wine-glass');


//****************** Executable Code - Helper Functions **************

//render image function, so in order to just got an image to show up you have to reassign that src value.
// you can use the "img" property from the object contructor. REMEMBER: you turned it into an Array, so you have to treat it like an Array.


// creating the function to make the images populate randomly on the page. create the function NAME, then place the random function ((math.random)that already exists), along with the math.floor function.

function getRandomIndex(){
  // sourced from w3 schools
  return Math.floor(Math.random()*productArray.length);
}


// in order to randomize the photos, you need to create a function that combines the rendered image with the random fumction:

function renderImg() {

  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while (productOneIndex === productTwoIndex | productTwoIndex === productThreeIndex | productOneIndex === productThreeIndex) {
    productTwoIndex = getRandomIndex(); productThreeIndex = getRandomIndex(); productOneIndex = getRandomIndex();}

  imgOne.src = productArray[productOneIndex].img;
  imgOne.alt = productArray[productOneIndex].productName;
  // bottom function adds a view each time it appears on the page
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].img;
  imgTwo.alt = productArray[productTwoIndex].productName;
  // bottom function adds a view each time it appears on the page
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].img;
  imgThree.alt = productArray[productThreeIndex].productName;
  // bottom function adds a view each time it appears on the page
  productArray[productThreeIndex].views++;
}
console.log(productArray);
renderImg();

// **************** Event Handlers ****************
// parameter comes from this add event listener. this ad event listener passes the whole event to this function.
// you dont need parantheses for handle click because once the user clicks the photo, it's going to call this function and it's going to pass it the event.

function handleClick(event){
  let imgClicked = event.target.alt;

  // cannot use "this." because you're not in your object from a constructor


  console.log('This was clicked-->', imgClicked);

  // this loop functions activates when an image is clicked. the for loop goes through the whole array, and if it runs into the image that was clicked, it adds a number to the amount of clicks

  for (let i = 0; i < productArray.length; i++) {
    if(imgClicked === productArray[i].productName){
      productArray[i].click++;
    }
  }

  //  everytime an image is clicked, a voting round is taken away
  votingRounds--;

  // to stop the clicks, you remove the event listener
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
  //rerenders 2 new products
  renderImg();
}

// the reason for this function is to render the "li's" once someone clicks the submit button

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${productArray[i].productName} was shown ${productArray[i].views} and clicked ${productArray[i].click} times`;
      resultsList.appendChild(li);
    }

  }
}
//**************** Event Listeners ****************
imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
