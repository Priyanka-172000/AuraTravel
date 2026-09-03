import axios from 'axios';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = 'https://api.unsplash.com';

const fallbackImages = {
  // Destinations
  'paris eiffel tower': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
  'tokyo city night': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
  'bali rice terrace': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
  'new york city skyline': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80',
  'rome colosseum': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
  'dubai burj khalifa': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
  'london eye': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG',
  'sydney opera house': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80',
  'india taj mahal': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80',

  // Paris
  'eiffel tower': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
  'louvre museum': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
  'montmartre paris': 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?auto=format&fit=crop&w=800&q=80',

  // Tokyo
  'sensoji temple': 'https://images.unsplash.com/photo-1532236204992-f5e85c024202?auto=format&fit=crop&w=800&q=80',
  'shibuya crossing': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg',
  'meiji shrine': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Meiji_Jingu_2023-3.jpg',

  // Bali
  'uluwatu temple': 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg',
  'ubud monkey forest': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Monkey_Forest_Ubud.jpg',
  'tegallalang rice terrace': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',

  // New York
  'central park ny': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg',
  'statue of liberty': 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80',
  'times square': 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',

  // Rome
  'colosseum rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  'trevi fountain': 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80',
  'pantheon rome': 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=800&q=80',

  // Dubai
  'burj khalifa': 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80',
  'palm jumeirah': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg',
  'dubai mall': 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=800&q=80',

  // London
  'tower of london': 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
  'british museum': 'https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg',

  // Sydney
  'sydney harbour bridge': 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=800&q=80',
  'bondi beach': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Bondi_from_above.jpg',

  // India
  'taj mahal': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg',
  'jaipur palace': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
  'kerala backwaters': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',

  // Maldives
  'maldives beach': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  'baa atoll': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  'male maldives': 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
  'maafushi': 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',

  'default': 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80',
};

const genericFallbacks = [
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?auto=format&fit=crop&w=800&q=80'
];

const getFallbackForQuery = (query) => {
  if (fallbackImages[query]) return fallbackImages[query];
  // Deterministic random image based on string length to avoid all identical images
  const index = query.length % genericFallbacks.length;
  return genericFallbacks[index];
};

export const fetchImageForQuery = async (query) => {
  if (!UNSPLASH_API_KEY) {
    return getFallbackForQuery(query);
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        per_page: 1,
        orientation: 'landscape'
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_KEY}`
      }
    });

    if (response.data && response.data.results.length > 0) {
      return response.data.results[0].urls.regular;
    }
    return getFallbackForQuery(query);
  } catch (error) {
    console.error('Error fetching image:', error);
    return getFallbackForQuery(query);
  }
};
