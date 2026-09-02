export const getMockItinerary = (destinationName, numDays, interests) => {
  const destNameLower = destinationName.toLowerCase();
  
  // Default generic activities if destination not predefined
  let daysData = [
    {
      title: "Arrival & City Highlights",
      morning: `Start your adventure in ${destinationName}. Explore the central district and visit the main square.`,
      afternoon: `Enjoy a guided tour of the city's historical landmarks. Perfect time for photography.`,
      evening: `Dine at a highly-rated local restaurant and take in the beautiful night views.`,
      imageQuery: `${destinationName} landmark`
    },
    {
      title: "Culture & Discovery",
      morning: `Visit the most prominent local museum or temple. Dive deep into the culture.`,
      afternoon: `Stroll through the vibrant local markets and neighborhoods.`,
      evening: `Experience the local entertainment scene or a cultural show.`,
      imageQuery: `${destinationName} culture`
    },
    {
      title: "Nature & Relaxation",
      morning: `Take a morning walk through the famous city parks or nearby botanical gardens.`,
      afternoon: `Enjoy a leisurely lunch and a boat ride or scenic viewpoint visit.`,
      evening: `Relaxing dinner by the waterfront or a rooftop lounge.`,
      imageQuery: `${destinationName} nature`
    },
    {
      title: "Hidden Gems",
      morning: `Explore the lesser-known historical districts. Walk the cobblestone streets.`,
      afternoon: `Visit artisanal shops and boutique cafes hidden from the main tourist paths.`,
      evening: `Enjoy a private food tasting tour or cooking class.`,
      imageQuery: `${destinationName} street`
    },
    {
      title: "Adventure & Farewell",
      morning: `Take a half-day trip to a nearby scenic wonder or engage in an outdoor activity.`,
      afternoon: `Return to the city for some last-minute souvenir shopping.`,
      evening: `Farewell dinner celebrating the best culinary dishes of ${destinationName}.`,
      imageQuery: `${destinationName} view`
    }
  ];

  if (destNameLower.includes('tokyo')) {
    daysData = [
      { title: "Modern Tokyo", morning: "Visit Meiji Shrine and explore the vibrant Harajuku area.", afternoon: "Walk across the famous Shibuya Crossing and shop at Takeshita Street.", evening: "Enjoy panoramic views from Shibuya Sky and have dinner in the area.", imageQuery: "shibuya crossing" },
      { title: "Traditional Tokyo", morning: "Explore the ancient Senso-ji Temple in Asakusa.", afternoon: "Stroll through Ueno Park and visit the bustling Ameyoko Market.", evening: "Head up Tokyo Skytree for a spectacular night view over the Sumida River.", imageQuery: "sensoji temple" },
      { title: "Culture & Food", morning: "Enjoy fresh sushi at Tsukiji Outer Market.", afternoon: "Walk around the Imperial Palace gardens and upscale Ginza.", evening: "See the iconic Tokyo Tower and experience Roppongi nightlife.", imageQuery: "tokyo tower" },
      { title: "Anime & Tech", morning: "Dive into electronics and anime culture in Akihabara.", afternoon: "Cross the Rainbow Bridge to the futuristic island of Odaiba.", evening: "Relax at an onsen or enjoy a themed cafe.", imageQuery: "akihabara" },
      { title: "Parks & Hidden Gems", morning: "Stroll the beautifully landscaped Shinjuku Gyoen.", afternoon: "Explore the hipster cafes in Shimokitazawa.", evening: "Experience the tiny, atmospheric bars in Golden Gai.", imageQuery: "shinjuku gyoen" }
    ];
  } else if (destNameLower.includes('paris')) {
    daysData = [
      { title: "Iconic Paris", morning: "Marvel at the Eiffel Tower and stroll through Champ de Mars.", afternoon: "Take a scenic cruise along the Seine River.", evening: "Enjoy classic French cuisine at a local bistro.", imageQuery: "eiffel tower" },
      { title: "Art & History", morning: "Explore the masterpieces at the Louvre Museum.", afternoon: "Walk through the Tuileries Garden to Place de la Concorde.", evening: "Watch a cabaret show or stroll along the Champs-Élysées.", imageQuery: "louvre museum" },
      { title: "Bohemian Montmartre", morning: "Visit the stunning Sacré-Cœur Basilica.", afternoon: "Wander the cobbled streets and artist squares of Montmartre.", evening: "Dine in a cozy café and enjoy the city views.", imageQuery: "montmartre paris" },
      { title: "Gothic Masterpieces", morning: "Admire Notre-Dame Cathedral and Sainte-Chapelle.", afternoon: "Explore the historic Latin Quarter and Panthéon.", evening: "Relax with wine and cheese in Saint-Germain-des-Prés.", imageQuery: "notre dame paris" },
      { title: "Palatial Gardens", morning: "Take a half-day trip to the Palace of Versailles.", afternoon: "Explore the grand Gardens of Versailles.", evening: "Return to Paris for a farewell dinner in Le Marais.", imageQuery: "palace of versailles" }
    ];
  } else if (destNameLower.includes('dubai')) {
    daysData = [
      { title: "Record-Breaking Dubai", morning: "Take in the views from the observation deck of the Burj Khalifa.", afternoon: "Shop and explore the massive Dubai Mall.", evening: "Watch the spectacular Dubai Fountain show.", imageQuery: "burj khalifa" },
      { title: "Desert Adventure", morning: "Relax at Jumeirah Beach or visit the Miracle Garden.", afternoon: "Embark on an exhilarating desert safari with dune bashing.", evening: "Enjoy a traditional Bedouin-style dinner under the stars.", imageQuery: "dubai desert safari" },
      { title: "Old & New", morning: "Wander through the historic Al Fahidi neighborhood.", afternoon: "Take an abra ride across Dubai Creek to the Gold Souk.", evening: "Dine at the luxurious Dubai Marina.", imageQuery: "dubai marina" },
      { title: "Palm Jumeirah", morning: "Explore the artificial island of Palm Jumeirah.", afternoon: "Visit the Atlantis resort and Aquaventure Waterpark.", evening: "Enjoy a lavish dinner at The Pointe.", imageQuery: "palm jumeirah" },
      { title: "Culture & Future", morning: "Visit the stunning Museum of the Future.", afternoon: "Explore the Dubai Frame for views of old and new Dubai.", evening: "Experience the vibrant Global Village.", imageQuery: "museum of the future dubai" }
    ];
  } else if (destNameLower.includes('bali')) {
    daysData = [
      { title: "Ubud Culture", morning: "Interact with macaques at the Sacred Monkey Forest.", afternoon: "Explore the stunning Tegallalang Rice Terraces.", evening: "Watch a traditional Kecak fire dance.", imageQuery: "ubud monkey forest" },
      { title: "Temples & Sunsets", morning: "Visit the beautiful water temple Pura Ulun Danu Bratan.", afternoon: "Relax on the beaches of Seminyak.", evening: "Watch the sunset at the cliffside Uluwatu Temple.", imageQuery: "uluwatu temple" },
      { title: "Island Hopping", morning: "Take a fast boat to Nusa Penida island.", afternoon: "Marvel at the T-Rex shaped cliff of Kelingking Beach.", evening: "Return to the mainland for a seafood dinner in Jimbaran.", imageQuery: "kelingking beach" },
      { title: "Waterfalls & Nature", morning: "Hike to the majestic Sekumpul or Tegenungan Waterfall.", afternoon: "Visit a local coffee plantation for Luwak coffee.", evening: "Experience the vibrant nightlife in Canggu.", imageQuery: "bali waterfall" },
      { title: "Spiritual Cleansing", morning: "Participate in a water blessing at Tirta Empul.", afternoon: "Shop for local crafts at the Ubud Art Market.", evening: "Enjoy a relaxing Balinese massage and spa treatment.", imageQuery: "tirta empul" }
    ];
  } else if (destNameLower.includes('london')) {
    daysData = [
      { title: "Royal London", morning: "Watch the Changing of the Guard at Buckingham Palace.", afternoon: "Visit Westminster Abbey and see Big Ben.", evening: "Take a ride on the London Eye at sunset.", imageQuery: "london eye" },
      { title: "History & Crown Jewels", morning: "Explore the historic Tower of London.", afternoon: "Walk across the iconic Tower Bridge and visit Borough Market.", evening: "Catch a world-class show in the West End.", imageQuery: "tower of london" },
      { title: "Museums & Culture", morning: "Discover global artifacts at the British Museum.", afternoon: "Relax in Hyde Park or visit the Natural History Museum.", evening: "Dine in vibrant Soho or Covent Garden.", imageQuery: "british museum" },
      { title: "Palaces & Parks", morning: "Visit Kensington Palace and its beautiful gardens.", afternoon: "Shop at the famous Harrods department store.", evening: "Enjoy a traditional English pub dinner.", imageQuery: "kensington palace" },
      { title: "Art & Markets", morning: "Admire modern art at the Tate Modern.", afternoon: "Hunt for antiques and street food at Camden Market.", evening: "Take a twilight stroll along the South Bank.", imageQuery: "camden market" }
    ];
  } else if (destNameLower.includes('new york')) {
    daysData = [
      { title: "Midtown Landmarks", morning: "Take in the city from the Top of the Rock or Empire State Building.", afternoon: "Stroll through Times Square and visit MoMA.", evening: "Catch a famous Broadway musical.", imageQuery: "times square" },
      { title: "Central Park & Museums", morning: "Rent a bike and explore the vast Central Park.", afternoon: "Visit the Metropolitan Museum of Art (The Met).", evening: "Enjoy dinner in the vibrant Upper West Side.", imageQuery: "central park ny" },
      { title: "Downtown & Liberty", morning: "Take the ferry to see the Statue of Liberty.", afternoon: "Reflect at the 9/11 Memorial and explore Wall Street.", evening: "Walk across the Brooklyn Bridge at sunset.", imageQuery: "statue of liberty" },
      { title: "Neighborhood Charm", morning: "Walk the High Line elevated park.", afternoon: "Explore the boutiques and cafes in Greenwich Village and Chelsea.", evening: "Dine in Little Italy or Chinatown.", imageQuery: "the high line ny" },
      { title: "Brooklyn Exploration", morning: "Explore the trendy streets of Williamsburg.", afternoon: "Relax at Brooklyn Bridge Park with Manhattan skyline views.", evening: "Enjoy authentic New York pizza in Brooklyn.", imageQuery: "brooklyn bridge" }
    ];
  } else if (destNameLower.includes('rome')) {
    daysData = [
      { title: "Ancient Rome", morning: "Step back in time at the awe-inspiring Colosseum.", afternoon: "Wander through the ruins of the Roman Forum and Palatine Hill.", evening: "Enjoy authentic Roman pasta in the Trastevere district.", imageQuery: "colosseum rome" },
      { title: "Vatican City", morning: "Marvel at the Sistine Chapel and Vatican Museums.", afternoon: "Explore the magnificent St. Peter's Basilica.", evening: "Stroll near Castel Sant'Angelo along the Tiber River.", imageQuery: "st peters basilica" },
      { title: "Piazzas & Fountains", morning: "Throw a coin into the iconic Trevi Fountain.", afternoon: "Visit the Pantheon and climb the Spanish Steps.", evening: "Relax with gelato in Piazza Navona.", imageQuery: "trevi fountain" },
      { title: "Art & Gardens", morning: "Explore the extensive art collection at Galleria Borghese.", afternoon: "Relax in the beautiful Villa Borghese gardens.", evening: "Shop along the luxurious Via del Corso.", imageQuery: "villa borghese" },
      { title: "Hidden Rome", morning: "Explore the Catacombs on the Appian Way.", afternoon: "Visit the ancient Baths of Caracalla.", evening: "Enjoy a traditional Italian wine tasting experience.", imageQuery: "roman forum" }
    ];
  } else if (destNameLower.includes('sydney')) {
    daysData = [
      { title: "Harbour Highlights", morning: "Take a guided tour of the iconic Sydney Opera House.", afternoon: "Walk across or climb the Sydney Harbour Bridge.", evening: "Dine at Circular Quay overlooking the harbour.", imageQuery: "sydney opera house" },
      { title: "Coastal Beauty", morning: "Relax or surf at the world-famous Bondi Beach.", afternoon: "Complete the spectacular Bondi to Coogee coastal walk.", evening: "Enjoy fresh seafood at a coastal restaurant.", imageQuery: "bondi beach" },
      { title: "Nature & Wildlife", morning: "Take a ferry to Taronga Zoo for native wildlife.", afternoon: "Relax in the Royal Botanic Garden.", evening: "Explore the historic Rocks district.", imageQuery: "sydney harbour bridge" },
      { title: "Blue Mountains", morning: "Take a day trip to the Blue Mountains.", afternoon: "See the Three Sisters rock formation and ride the Scenic Railway.", evening: "Return to Sydney for a relaxed dinner.", imageQuery: "blue mountains australia" },
      { title: "Beaches & Ferries", morning: "Take the scenic ferry to Manly Beach.", afternoon: "Walk the Corso and relax on the sandy shores.", evening: "Experience the vibrant nightlife in Darling Harbour.", imageQuery: "manly beach" }
    ];
  } else if (destNameLower.includes('india')) {
    daysData = [
      { title: "Golden Triangle Highlights", morning: "Start in Delhi, visiting the historic Red Fort and Jama Masjid.", afternoon: "Explore the bustling streets of Chandni Chowk.", evening: "Relax at India Gate as it lights up.", imageQuery: "red fort delhi" },
      { title: "The Taj Mahal", morning: "Travel to Agra to witness the breathtaking Taj Mahal at sunrise.", afternoon: "Explore the magnificent Agra Fort.", evening: "Shop for marble handicrafts in Agra's local markets.", imageQuery: "taj mahal" },
      { title: "The Pink City", morning: "Head to Jaipur and explore the massive Amber Fort.", afternoon: "Visit the intricate City Palace and Hawa Mahal.", evening: "Enjoy traditional Rajasthani thali dinner.", imageQuery: "jaipur palace" },
      { title: "Spiritual Varanasi", morning: "Take a sunrise boat ride on the sacred Ganges river.", afternoon: "Explore the narrow ancient alleys and temples of Varanasi.", evening: "Witness the mesmerizing Ganga Aarti ceremony.", imageQuery: "varanasi ganges" },
      { title: "Kerala Serenity", morning: "Fly to Kerala and board a traditional houseboat.", afternoon: "Cruise through the tranquil palm-fringed backwaters.", evening: "Enjoy freshly prepared South Indian cuisine on the boat.", imageQuery: "kerala backwaters" }
    ];
  }

  // Limit to selected days
  const limitedDays = daysData.slice(0, numDays);

  return limitedDays.map((day, index) => ({
    day: index + 1,
    title: day.title,
    morning: day.morning,
    afternoon: day.afternoon,
    evening: day.evening,
    imageQuery: day.imageQuery
  }));
};
