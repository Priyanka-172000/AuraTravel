const https = require('https');

function getUnsplashId(query, callback) {
  https.get('https://unsplash.com/s/photos/' + encodeURIComponent(query), (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/href="\/photos\/[a-z0-9-]+-([a-zA-Z0-9]{11})"/i);
      if (match && match[1]) {
        callback('https://images.unsplash.com/photo-' + match[1] + '?auto=format&fit=crop&w=800&q=80');
      } else {
        const altMatch = data.match(/src="https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)\?/i);
        if (altMatch && altMatch[1]) {
           callback('https://images.unsplash.com/photo-' + altMatch[1] + '?auto=format&fit=crop&w=800&q=80');
        } else {
           callback(null);
        }
      }
    });
  });
}

const queries = {
  '1553531580-6520e713600c': 'central-park-new-york',
  '1500916434205-0c77489c6211': 'times-square-new-york',
  '1542051812871-757500850d5b': 'shibuya-crossing',
  '1590559899731-a382839ceaca': 'meiji-shrine',
  '1513635269975-59693e0cd156': 'london-eye',
  '1550935579-204b79b94098': 'tegallalang-rice-terrace',
  '1610486950228-3e4e963fcfa7': 'palm-jumeirah',
  '1557053912-70068a0a9b08': 'uluwatu-temple',
  '1523428461295-829d5b037624': 'bondi-beach',
  '1535911075775-d14fb9631627': 'ubud-monkey-forest',
  '1544455822-0941865ffb43': 'british-museum',
  '1564507592208-528751436402': 'taj-mahal'
};

Object.keys(queries).forEach(oldId => {
  getUnsplashId(queries[oldId], (newUrl) => {
    console.log(oldId + ' -> ' + newUrl);
  });
});
