import{a as m,S as p,i}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();async function d(s,e=1){const n="https://pixabay.com/api/",a=new URLSearchParams({key:"48836479-4489c2f77adf14865904c6664",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:40}),t=`${n}?${a}`;try{const r=await m.get(t);return r.data.hits.length===0?[]:r.data}catch(r){throw console.error("Error fetching images:",r),r}}function u(s){return s.map(e=>`
      <div class="card">
        <div class="img-cont">
            <a class="gallery-link" href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}">
            </a>
        </div>
        <div class="describtion-cont">
            <div class="block">
                <h4 class="title">Likes</h4>
                <p class="number">${e.likes}</p>
            </div>
            <div class="block">
                <h4 class="title">Views</h4>
                <p class="number">${e.views}</p>
            </div>
            <div class="block">
                <h4 class="title">Comments</h4>
                <p class="number">${e.comments}</p>
            </div>
            <div class="block">
                <h4 class="title">Downloads</h4>
                <p class="number">${e.downloads}</p>
            </div>
        </div>
        </div>
    `).join("")}const o={form:document.querySelector(".form"),imagesContainer:document.querySelector(".images-container"),input:document.querySelector(".input"),loader:document.querySelector(".loader"),loadBtn:document.querySelector('button[type="button"]')},h=new p(".gallery-link");let c=1,g="";o.form.addEventListener("submit",async s=>{s.preventDefault();const e=o.input.value.trim();if(e===""){i.show({backgroundColor:"red",position:"topRight",message:"The input field cannot be empty"});return}c=1,g=e,o.loadBtn.classList.add("hidden"),o.imagesContainer.innerHTML="",o.loader.innerHTML="Please wait, the images are loading...";try{const a=(await d(e,c)).hits;if(a.length===0){i.show({backgroundColor:"orange",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),o.imagesContainer.innerHTML="";return}o.imagesContainer.innerHTML=u(a),h.refresh(),o.loadBtn.classList.remove("hidden"),a.length===40&&o.loadBtn.classList.remove("hidden")}catch{i.show({backgroundColor:"red",position:"topRight",message:"Failed to fetch images. Try again later!"})}o.loader.innerHTML="",s.target.reset()});o.loadBtn.addEventListener("click",async()=>{var s;c+=1,o.loader.innerHTML="Loading more images...";try{const e=await d(g,c),n=e.hits;if(n.length===0||c*40>=e.totalHits){o.loadBtn.classList.add("hidden"),i.show({backgroundColor:"orange",position:"topRight",message:"We are sorry, but you have reached the end of search results."});return}o.imagesContainer.insertAdjacentHTML("beforeend",u(n)),h.refresh();const a=((s=document.querySelector(".img-cont"))==null?void 0:s.getBoundingClientRect().height)||0;window.scrollBy({top:a*2,behavior:"smooth"})}catch{i.show({backgroundColor:"red",position:"topRight",message:"Failed to fetch images. Try again later!"})}o.loader.innerHTML=""});
//# sourceMappingURL=index.js.map
