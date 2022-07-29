const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;


let photosArray = [];

// Check if all images are loaded
function imageLoaded(){
    console.log('img loaded');
    imagesLoaded++;
    console.log(imagesLoaded); //to check imagesloaded == total images
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }

}

// Helper Function for setAttribute
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Display Photos
function displayPhotos(){
    imagesLoaded = 0; //everytime initializes imagesloaded to 0 for imagesloaded == total images to be true
    totalImages = photosArray.length;
    console.log('total',totalImages);
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');<---alternate way
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> for  photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description); <---alternate way
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listner check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Unsplash API
const count = 10;
const apiKey = '8JhiIA_xGArdnS2d8X21wm3ko7p-hiC7v6_hp1m2xM8';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// get photos
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch(error){

    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',() =>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 
        1000 && ready) 
    {
        ready = false;
        getPhotos();
    }
});

// On load

getPhotos();