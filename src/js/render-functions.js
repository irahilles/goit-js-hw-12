export function createMarkup(images) {
    return images.map(image => `
      <div class="card">
        <div class="img-cont">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}">
            </a>
        </div>
        <div class="describtion-cont">
            <div class="block">
                <h4 class="title">Likes</h4>
                <p class="number">${image.likes}</p>
            </div>
            <div class="block">
                <h4 class="title">Views</h4>
                <p class="number">${image.views}</p>
            </div>
            <div class="block">
                <h4 class="title">Comments</h4>
                <p class="number">${image.comments}</p>
            </div>
            <div class="block">
                <h4 class="title">Downloads</h4>
                <p class="number">${image.downloads}</p>
            </div>
        </div>
        </div>
    `).join(''); 
  }