import axios from 'axios';

export async function getImage(userValue, page = 1){
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '48836479-4489c2f77adf14865904c6664',
        q: userValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
    });
    const url = `${BASE_URL}?${params}`;
    
        try {
          const response = await axios.get(url);
          if(response.data.hits.length === 0){
            return [];
          }else {
            return response.data;
          }
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
}
