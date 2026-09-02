const fs = require('fs');

const replacements = {
  // Central Park (New York)
  '1553531580-6520e713600c': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg',
  
  // Times Square (New York)
  '1500916434205-0c77489c6211': 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
  
  // Shibuya Crossing (Tokyo)
  '1542051812871-757500850d5b': 'https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg',
  
  // Meiji Shrine (Tokyo)
  '1590559899731-a382839ceaca': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Meiji_Jingu_2023-3.jpg',
  
  // London Eye (London)
  '1513635269975-59693e0cd156': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/London-Eye-2009.JPG',
  
  // Tegallalang (Bali)
  '1550935579-204b79b94098': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Tegallalang_Rice_Terrace_in_Bali.jpg',
  
  // Palm Jumeirah (Dubai)
  '1610486950228-3e4e963fcfa7': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Artificial_Archipelagos%2C_Dubai%2C_United_Arab_Emirates_ISS022-E-024940_lrg_%28cropped%29.jpg',
  
  // Uluwatu (Bali)
  '1557053912-70068a0a9b08': 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pura_Luhur_Uluwatu_2017-08-17_%2834%29.jpg',
  
  // Bondi Beach (Sydney)
  '1523428461295-829d5b037624': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Bondi_from_above.jpg',
  
  // Ubud Monkey Forest (Bali)
  '1535911075775-d14fb9631627': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Monkey_Forest_Ubud.jpg',
  
  // British Museum (London)
  '1544455822-0941865ffb43': 'https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg',
  
  // Taj Mahal (India)
  '1564507592208-528751436402': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg'
};

let destinations = fs.readFileSync('./src/data/destinations.js', 'utf8');
let imageService = fs.readFileSync('./src/services/imageService.js', 'utf8');

// The file currently has the broken 400 thumbnail URLs, not the Unsplash ones anymore!
// I must replace the broken Wikimedia URLs with the correct Wikimedia URLs!

for (const [badId, goodUrl] of Object.entries(replacements)) {
  // Extract just the filename from goodUrl to match what might be in the broken URL
  const filename = goodUrl.split('/').pop();
  
  // Replace ANY wikimedia URL containing this filename with the goodUrl
  const brokenWikiPattern = new RegExp(`https://upload\\.wikimedia\\.org/wikipedia/commons/thumb/[^"']*${filename.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}[^"']*`, 'g');
  
  destinations = destinations.replace(brokenWikiPattern, goodUrl);
  imageService = imageService.replace(brokenWikiPattern, goodUrl);
}

fs.writeFileSync('./src/data/destinations.js', destinations);
fs.writeFileSync('./src/services/imageService.js', imageService);
console.log('Fixed URLs in both files.');
