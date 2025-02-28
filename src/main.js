import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImage } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";


const refs = {
    form: document.querySelector('.form'),
    imagesContainer: document.querySelector('.images-container'),
    input: document.querySelector('.input'),
    loader: document.querySelector('.loader'),
    loadBtn: document.querySelector('button[type="button"]'),
};


const lightbox = new SimpleLightbox('.gallery-link');
let page = 1;
let currentQuery = '';


refs.form.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    const userValue = refs.input.value.trim();
    
    if (userValue === '') {
        iziToast.show({
            backgroundColor: 'red',
            position: 'topRight',
            message: 'The input field cannot be empty'
        });
        return;
    }

    page = 1;
    currentQuery = userValue;
    refs.loadBtn.classList.add('hidden'); 

    refs.imagesContainer.innerHTML = ''; 
    refs.loader.innerHTML = 'Please wait, the images are loading...'; 

         try {
           const data = await getImage(userValue, page);
           const images = data.hits;
           if (images.length === 0) {
        iziToast.show({
            backgroundColor: 'orange',
            position: 'topRight',
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        refs.imagesContainer.innerHTML = '';
        return;
        }
          refs.imagesContainer.innerHTML = createMarkup(images);
          lightbox.refresh();

          if (images.length === 40) {
            refs.loadBtn.classList.remove('hidden'); 
        } else {
            refs.loadBtn.classList.add('hidden'); 
        }

        } catch (error) {
      iziToast.show({
                backgroundColor: 'red',
                position: 'topRight',
                message: 'Failed to fetch images. Try again later!'
            });
      } finally{
        setTimeout(() => refs.loader.innerHTML = "", 1500);
      }
        
    e.target.reset();
});


refs.loadBtn.addEventListener('click', async ()=>{
   page += 1;
    refs.loader.innerHTML = 'Loading more images...';

    try {
        const data = await getImage(currentQuery, page);
        const images = data.hits;
        if(images.length === 0 || page * 40 >= data.totalHits){
             refs.loadBtn.classList.add('hidden');
            iziToast.show({
                backgroundColor: 'orange',
                position: 'topRight',
                message: 'We are sorry, but you have reached the end of search results.'
            });
            return;
        }  
        if (images.length > 0) {
            refs.imagesContainer.insertAdjacentHTML('beforeend', createMarkup(images));
            lightbox.refresh();
        }

        const cardHeight = document.querySelector('.img-cont')?.getBoundingClientRect().height || 0;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    } catch (error) {
        iziToast.show({
            backgroundColor: 'red',
            position: 'topRight',
            message: 'Failed to fetch images. Try again later!'
        })
    } finally{
        setTimeout(() => refs.loader.innerHTML = "", 1500);
    }
});