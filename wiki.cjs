const https = require('https');

async function getWikiImage(query) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'en.wikipedia.org',
      path: `/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}`,
      headers: { 'User-Agent': 'DesignEstheticsTravelApp/1.0 (test@example.com)' }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].original) {
            resolve(pages[pageId].original.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

const places = {
  'Central Park': 'Central Park',
  'Times Square': 'Times Square',
  'Shibuya Crossing': 'Shibuya Crossing',
  'Meiji Shrine': 'Meiji Shrine',
  'London Eye': 'London Eye',
  'Tegallalang Rice Terrace': 'Tegallalang',
  'Palm Jumeirah': 'Palm Jumeirah',
  'Uluwatu Temple': 'Uluwatu Temple',
  'Bondi Beach': 'Bondi Beach',
  'Ubud Monkey Forest': 'Mandala Suci Wenara Wana',
  'British Museum': 'British Museum',
  'Taj Mahal': 'Taj Mahal'
};

async function run() {
  for (const [key, search] of Object.entries(places)) {
    const url = await getWikiImage(search);
    console.log(`'${key}': '${url}',`);
  }
}

run();
