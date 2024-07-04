document.addEventListener('DOMContentLoaded', () => {
  fetchData('bats').then(data => {
    populateCards(data);
  });
});

function fetchData(category) {
  // Hardcoded data for now will replace with connection to a SQL db
  const data = {
    bats: [
      {
        commonName: "Purple Coneflower",
        scientificName: "Echinacea purpurea",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Echinacea_purpurea_Grandview_Prairie.jpg/330px-Echinacea_purpurea_Grandview_Prairie.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Goldenrod",
        scientificName: "Solidago canadensis",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Solidago_nemoralis.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Yarrow",
        scientificName: "Achillea millefolium",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Achillea_millefolium_%28bright%29.jpg/330px-Achillea_millefolium_%28bright%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Common Sage",
        scientificName: "Salvia officinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Salvia_officinalis0.jpg/330px-Salvia_officinalis0.jpg",
        safety: { cats: "Moderately Safe", dogs: "Safe" }
      },
      {
        commonName: "Yucca",
        scientificName: "Hesperaloe sp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Yucca_filamentosa.jpg/330px-Yucca_filamentosa.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Sunflower",
        scientificName: "Helianthus annuus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Dogwood",
        scientificName: "Cornus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Bgbo_cornus_kousa_var_chinensis_ies.jpg/330px-Bgbo_cornus_kousa_var_chinensis_ies.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Elderberry",
        scientificName: "Sambucus sp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Sambucus-berries.jpg/330px-Sambucus-berries.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Oak",
        scientificName: "Querus sp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Brockwell_Oak_%289%29.jpg/1024px-Brockwell_Oak_%289%29.jpg",
        safety: { cats: "Moderately Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Queen of the Night",
        scientificName: "Epiphyllum oxypetalum",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Night-blooming_cereus-full-bloom.jpg/1280px-Night-blooming_cereus-full-bloom.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Jimsonweed",
        scientificName: "Datura stramonium",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Datura_stramonium_2_%282005_07_07%29.jpg/330px-Datura_stramonium_2_%282005_07_07%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Brugmansia",
        scientificName: "Brugmansia spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brugmansia.jpg/330px-Brugmansia.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Carolina Jasmine",
        scientificName: "Gelsemium sempervirens",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Gelsemium_sempervirens3.jpg/330px-Gelsemium_sempervirens3.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Butterfly bush",
        scientificName: "Buddleja spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Buddleja_crispa_var._agathosma.jpg/330px-Buddleja_crispa_var._agathosma.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Lavender",
        scientificName: "Lavandula angustifolia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/330px-Single_lavender_flower02.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Rosemary",
        scientificName: "Salvia rosmarinus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/330px-Rosemary_in_bloom.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Evening Primrose",
        scientificName: "Oenothera spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Oenothera_rubricaulis_2014_G1.jpg/330px-Oenothera_rubricaulis_2014_G1.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Guava trees",
        scientificName: "Psidium guajava",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Guava_flowers_%286700015761%29.jpg/1280px-Guava_flowers_%286700015761%29.jpg",
        safety: { cats: "Moderately Safe", dogs: "Safe" }
      },
      {
        commonName: "Banana trees",
        scientificName: "Musa spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/2018_06_TropicalIslands_IMG_2170.jpg/1280px-2018_06_TropicalIslands_IMG_2170.jpg",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Cacao",
        scientificName: "Theobroma cacao",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cocoa_Pods.JPG/300px-Cocoa_Pods.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Mango trees",
        scientificName: "Mangifera indica",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mangoes_%28Magnifera_indica%29_from_India.jpg/330px-Mangoes_%28Magnifera_indica%29_from_India.jpg",
        safety: { cats: " Moderately Safe", dogs: "Safe" }
      },
      {
        commonName: "Fig tree",
        scientificName: "Ficus carica",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Sycomoros_old.jpg/330px-Sycomoros_old.jpg",
        safety: { cats: "Not Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Date tree",
        scientificName: "Phoenix dactylifera",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dates005.jpg/330px-Dates005.jpg",
        safety: { cats: "Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Cashew",
        scientificName: "Anacardium occidentale",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cashew_apples.jpg/330px-Cashew_apples.jpg",
        safety: { cats: "Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Peach",
        scientificName: "Prunus persica",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Amygdalus_persica2.jpg",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Night Phlox",
        scientificName: "Zaluzianskya ovata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Zaluzianskya_ovata_two_forms_%288838450972%29.jpg/330px-Zaluzianskya_ovata_two_forms_%288838450972%29.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Aspen Fleabane",
        scientificName: "Erigeron spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Erigeron_speciosus_01.jpg/330px-Erigeron_speciosus_01.jpg",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Moonflowers",
        scientificName: "Ipomoea alba",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Ipomoea_alba270483816.jpg/330px-Ipomoea_alba270483816.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Tobacco",
        scientificName: "Nicotiana tabacum",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Tabak_9290019.JPG/330px-Tabak_9290019.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Honeysuckle",
        scientificName: "Lonicera spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lonicera_caprifolium001.jpg/330px-Lonicera_caprifolium001.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Four O'Clock",
        scientificName: "Mirabilis jalapa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gul-Abas-4-O%27clock_plant.JPG/330px-Gul-Abas-4-O%27clock_plant.JPG",
        safety: { cats: "Not Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Thorn-apple",
        scientificName: "Datura ceratocaula Ortega",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Sacred_datura_%28Datura_wrightii%29_%2814212557338%29.jpg/330px-Sacred_datura_%28Datura_wrightii%29_%2814212557338%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Spider Flower",
        scientificName: "Cleome houtteana",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cleome_hassleriana.jpg/330px-Cleome_hassleriana.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "French Marigolds",
        scientificName: "Tagetes patula",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/French_marigold_Tagetes_patula.jpg/330px-French_marigold_Tagetes_patula.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Lemon Balm",
        scientificName: "Melissa Officinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lemon_balm_plant.jpg/330px-Lemon_balm_plant.jpg",
        safety: { cats: "Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Spearmint",
        scientificName: "Mentha spicata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Minze.jpg/330px-Minze.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Thyme",
        scientificName: "Thymus vulgaris",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flowering_thyme.JPG/330px-Flowering_thyme.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Marjoram",
        scientificName: "Origanum majorana",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Origanum_majorana_002.JPG/330px-Origanum_majorana_002.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Starflower",
        scientificName: "Borage officinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Borage_starflower_Rohtopurasruoho_01.jpg/330px-Borage_starflower_Rohtopurasruoho_01.jpg",
        safety: { cats: "Not Safe", dogs: "Safe" }
      },
      {
        commonName: "Bee Balm",
        scientificName: "Citriodora-Hybr",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monarda_didyma_00.jpg/330px-Monarda_didyma_00.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Spotted Bee Balm",
        scientificName: "Manarda punctata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Monarda_punctataUGA1120190.jpg/330px-Monarda_punctataUGA1120190.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Cardinal Flower",
        scientificName: "Lobelia cardinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Lobelia_cardinalis_-_Cardinal_Flower.jpg/330px-Lobelia_cardinalis_-_Cardinal_Flower.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Foxglove Beard-tongue",
        scientificName: "Penstemon digitalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Penstemon_digitalis.jpg/330px-Penstemon_digitalis.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Smooth Blue Aster",
        scientificName: "Aster laevis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Symphyotrichum_laeve_93797924_%28cropped%29.jpg/330px-Symphyotrichum_laeve_93797924_%28cropped%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Aloe vera",
        scientificName: "Aloe vera",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/390px-Aloe_vera_flower_inset.png",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Dragon Fruit",
        scientificName: "Hylocereus spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Lianjiang_County_-_Dongdai_Town_-_Yangguang_Dragong_Fruit_Farm_-_P1510432.JPG/330px-Lianjiang_County_-_Dongdai_Town_-_Yangguang_Dragong_Fruit_Farm_-_P1510432.JPG",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Eucalyptus",
        scientificName: "Eucalyptus spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Eucalyptus_tereticornis_flowers%2C_capsules%2C_buds_and_foliage.jpeg/330px-Eucalyptus_tereticornis_flowers%2C_capsules%2C_buds_and_foliage.jpeg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Tamarind",
        scientificName: "Tamarindus indica",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tamarindus_indica_pods.JPG/330px-Tamarindus_indica_pods.JPG",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Baobab",
        scientificName: "Adansonia spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Baobab_Adansonia_digitata.jpg/330px-Baobab_Adansonia_digitata.jpg",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Saguaro",
        scientificName: "Carnegiea giganta",
        image: "https://www.nps.gov/sagu/learn/nature/images/crested-saguaro.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
    ]
  };
  return new Promise((resolve) => {
    resolve(data[category]);
  });
}

function populateCards(dataArray) {
  const cardContainer = document.getElementById('plant-container');
  cardContainer.innerHTML = ''; // Clear existing cards
  dataArray.forEach(data => {
    const card = createCard(data);
    cardContainer.appendChild(card);
  });
}

function createCard(data) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${data.image}" alt="${data.commonName}">
    <h3>Common Name: <br>${data.commonName}</h3>
    <p>Scientific Name: <br><i>${data.scientificName}</i></p>
    <div class="safety-info">
      <span><strong>Cats:</strong> ${data.safety.cats}</span> 
      <br>
      <span><strong>Dogs:</strong> ${data.safety.dogs}</span>
    </div>
  `;
  return card;
}