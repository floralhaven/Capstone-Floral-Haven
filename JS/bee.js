document.addEventListener('DOMContentLoaded', () => {
    fetchData('bees').then(data => {
      populateCards(data);
    });
});

function fetchData(category) {
    // Hardcoded data for now will replace with connection to a SQL db
    const data = {
      bees: [
        {
          commonName: "Armenian Basket Flowers",
          scientificName: "Centaurea macrocephala",
          image: "https://cdn11.bigcommerce.com/s-c49b6/images/stencil/1280x1280/products/593/3387/Cornflower_Yellow_Globe_Seeds_Centaurea_Macrocephala_p2__52822.1564940918.jpg?c=2",
          safety: { cats: "Safe", dogs: "Moderately Safe" }
        },
        {
            commonName: "Calamintha",
            scientificName: "Calamintha nepeta",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Iberis_sempervirens.JPG/330px-Iberis_sempervirens.JPG",
            safety: { cats: "Moderately Safe", dogs: "Safe" }
        },        
        {
            commonName: "Evergreen Candytuf",
            scientificName: "Iberis sempervirens",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pii3Jf1yQvzDsZNWj9Wcg9bkORwomv1hxg&s",
            safety: { cats: "Safe", dogs: "Moderately Safe" }
          },        
          {
            commonName: "Magic Carpet",
            scientificName: "Thymus serpyllum",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Thymus_serpyllum1.jpg/330px-Thymus_serpyllum1.jpg",
            safety: { cats: "Safe", dogs: "Safe" }
          },
          {
            commonName: "Dame's Rocket",
            scientificName: "Hesperis matronalis",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Sweet_Rockets.png/330px-Sweet_Rockets.png",
            safety: { cats: "Not Safe", dogs: "Not Safe" }
          },
          {
            commonName: "Purple Coneflower",
            scientificName: "Echinacea purpurea",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Echinacea_purpurea_Grandview_Prairie.jpg/330px-Echinacea_purpurea_Grandview_Prairie.jpg",
            safety: { cats: "Safe", dogs: "Safe" }
          },
          {
              commonName: "Foxglove",
              scientificName: "Digitalis purpurea",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Digitalis_purpurea2.jpg/330px-Digitalis_purpurea2.jpg",
              safety: { cats: "Not Safe", dogs: "Not Safe" }
          },        
          {
              commonName: "Blanket Flower",
              scientificName: "Gaillardia aristata",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Gaillardia_in_Aspen_%2891273%29.jpg/330px-Gaillardia_in_Aspen_%2891273%29.jpg",
              safety: { cats: "Safe", dogs: "Safe" }
            },        
            {
              commonName: "Blazing Star",
              scientificName: "Liatris picata",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Liatris_spicata_Purple.jpg/330px-Liatris_spicata_Purple.jpg",
              safety: { cats: "Safe", dogs: "Safe" }
            },
            {
              commonName: "Globe Thistle",
              scientificName: "Echinops bannaticus",
              image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Echinops_adenocaulos.jpg/330px-Echinops_adenocaulos.jpg",
              safety: { cats: "Safe", dogs: "Safe" }
            },
            {
              commonName: "Goldenrod",
              scientificName: "Solidago canadensis",
              image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Solidago_nemoralis.jpg",
              safety: { cats: "Safe", dogs: "Safe" }
            },
            {
                commonName: "Helena",
                scientificName: "Helenium autumnale",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Helenium_autumnale1.jpg/330px-Helenium_autumnale1.jpg",
                safety: { cats: "Not Safe", dogs: "Not Safe" }
            },        
            {
                commonName: "Plantain Lily",
                scientificName: "Hosta x hybrida",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hosta_Bressingham_Blue.JPG/330px-Hosta_Bressingham_Blue.JPG",
                safety: { cats: "Not Safe", dogs: "Not Safe" }
              },        
              {
                commonName: "Lavender",
                scientificName: "Lavandula angustifolia",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/330px-Single_lavender_flower02.jpg",
                safety: { cats: "Not Safe", dogs: "Not Safe" }
              },
              {
                commonName: "Money Plant",
                scientificName: "Lunaria annua",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Lunaria_annua_flowers.jpg/330px-Lunaria_annua_flowers.jpg",
                safety: { cats: "Safe", dogs: "Moderately Safe" }
              },
              {
                commonName: "Catmint",
                scientificName: "Nepeta nervosa",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Nepeta_subsessilis_1.jpg/1280px-Nepeta_subsessilis_1.jpg",
                safety: { cats: "Safe", dogs: "Safe" }
              },
              {
                  commonName: "Oriental Poppy",
                  scientificName: "Papaver orientale",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Oriental_poppy.jpg/330px-Oriental_poppy.jpg",
                  safety: { cats: "Not Safe", dogs: "Not Safe" }
              },        
              {
                  commonName: "Rock Cress",
                  scientificName: "Aubrieta x cultorum",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Aubrieta_deltoidea_4.jpg/330px-Aubrieta_deltoidea_4.jpg",
                  safety: { cats: "Safe", dogs: "Safe" }
                },        
                {
                  commonName: "Sea Holly",
                  scientificName: "Eryngium planum",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Eryngium_planum_bgiu.jpg/330px-Eryngium_planum_bgiu.jpg",
                  safety: { cats: "Safe", dogs: "Safe" }
                },
                {
                  commonName: "Mullein",
                  scientificName: "Verbascum phoeniceum",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Verbascum_phoeniceum2.jpg/330px-Verbascum_phoeniceum2.jpg",
                  safety: { cats: "Safe", dogs: "Safe" }
                },
                {
                  commonName: "Speedwell",
                  scientificName: "Veronica hybrida",
                  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pseudolysimachion-longifolium-spikes.JPG/330px-Pseudolysimachion-longifolium-spikes.JPG",
                  safety: { cats: "Safe", dogs: "Safe" }
                },
                {
                    commonName: "Flossflower",
                    scientificName: "Ageratum houstoniannum",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ageratum_houstonianum_%28alverson%29.jpg/330px-Ageratum_houstonianum_%28alverson%29.jpg",
                    safety: { cats: "Not Safe", dogs: "Not Safe" }
                },        
                {
                    commonName: "Sweet Alyssum",
                    scientificName: "Lobularia maritima",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Smagliczka_nadmorska_1.jpg/330px-Smagliczka_nadmorska_1.jpg",
                    safety: { cats: "Safe", dogs: "Safe" }
                  },        
                  {
                    commonName: "Summer Forget-Me-Not",
                    scientificName: "Anchusa capensis",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Anchusa_capensis_1DS-II_3-0836.jpg/330px-Anchusa_capensis_1DS-II_3-0836.jpg",
                    safety: { cats: "Not Safe", dogs: "Not Safe" }
                  },
                  {
                    commonName: "Baby Blue Eye",
                    scientificName: "Nemophila menziesii",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nemophila_menziesii_7794.JPG/330px-Nemophila_menziesii_7794.JPG",
                    safety: { cats: "Safe", dogs: "Safe" }
                  },
                  {
                    commonName: "Bachelor's Button",
                    scientificName: "Cyanus segetum",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/330px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
                    safety: { cats: "Safe", dogs: "Safe" }
                  },
                  {
                      commonName: "Butterfly Weed",
                      scientificName: "Asclepias curassavica",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Asclepias_tuberosa_interior.jpg/330px-Asclepias_tuberosa_interior.jpg",
                      safety: { cats: "Not Safe", dogs: "Not Safe" }
                  },        
                  {
                      commonName: "Pot Marigold",
                      scientificName: "Calendula officinalis",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Pot_marigold.jpg/330px-Pot_marigold.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },        
                    {
                      commonName: "Monarch-of-the-veld",
                      scientificName: "Arctotis fastuosa",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Venidium_fastuosum_-_White.jpg/330px-Venidium_fastuosum_-_White.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Cosmos",
                      scientificName: "Cosmos bipinnatus",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg/330px-Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg",
                      safety: { cats: "Not Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Honeywort 'Kiwi Blue'",
                      scientificName: "Cerinthe Major 'Purpurascens'",
                      image: "https://www.swallowtailgardenseeds.com/flowers/honeyworts/honeywort.jpeg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Tenweeks Stock",
                      scientificName: "Matthiola incana",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/2006-12-01Matthiola05.jpg/1920px-2006-12-01Matthiola05.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Sunflower",
                      scientificName: "Helianthus annuus",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Anise",
                      scientificName: "Pimpinella anisum",
                      image: "https://www.ufseeds.com/on/demandware.static/-/Sites-master-urbanfarmer/default/dwe4f23339/images/products/Pimpinella-anisum_flower.jpg",
                      safety: { cats: "Safe", dogs: "Moderately Safe" }
                    },
                    {
                      commonName: "Bee Balm",
                      scientificName: "Citriodora-Hybr",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monarda_didyma_00.jpg/330px-Monarda_didyma_00.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Starflower",
                      scientificName: "Borage officinalis",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Borage_starflower_Rohtopurasruoho_01.jpg/330px-Borage_starflower_Rohtopurasruoho_01.jpg",
                      safety: { cats: "Not Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Catnip",
                      scientificName: "Nepeta cataria",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Starr_070906-8819_Nepeta_cataria.jpg/288px-Starr_070906-8819_Nepeta_cataria.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Chives",
                      scientificName: "Allium schoenoprasum",
                      image: "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/f0025e27-292d-4ed5-a50b-3db1f2707722-d2ac6fa.jpg?quality=90",
                      safety: { cats: "Not Safe", dogs: "Not Safe" }
                    },
                    {
                      commonName: "Clary Sage",
                      scientificName: "Salvia sclarea",
                      image: "https://www.ufseeds.com/on/demandware.static/-/Sites-master-urbanfarmer/default/dwe4f23339/images/products/Pimpinella-anisum_flower.jpg",
                      safety: { cats: "Not Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Hyssop",
                      scientificName: "Hyssopus officinalis",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Hyssopus_officinalis_001.JPG/247px-Hyssopus_officinalis_001.JPG",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Lemon Balm",
                      scientificName: "Melissa Officinalis",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Lemon_balm_plant.jpg/330px-Lemon_balm_plant.jpg",
                      safety: { cats: "Safe", dogs: "Moderately Safe" }
                    },
                    {
                      commonName: "Greek Oregano",
                      scientificName: "Origanum vulgare",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Majorana_syriaca_-_za%27atar.jpg/1280px-Majorana_syriaca_-_za%27atar.jpg",
                      safety: { cats: "Not Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Rosemary",
                      scientificName: "Salvia rosmarinus",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/330px-Rosemary_in_bloom.JPG",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Valerian",
                      scientificName: "Valeriana officinalis",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Valeriana_officinalis_-_Niitvälja.jpg/330px-Valeriana_officinalis_-_Niitvälja.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Ivy",
                      scientificName: "Hedera helix",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hedera_helix_Dover.jpg/330px-Hedera_helix_Dover.jpg",
                      safety: { cats: "Not Safe", dogs: "Not Safe" }
                    },
                    {
                      commonName: "Ice plant",
                      scientificName: "Delosperma cooperi",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Delosperma_Cooperi.jpg/330px-Delosperma_Cooperi.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Garlic mustard",
                      scientificName: "Alliaria petiolata",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/330px-Rosemary_in_bloom.JPG",
                      safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
                    },
                    {
                      commonName: "White Clovers",
                      scientificName: "Trifolium repens",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Valeriana_officinalis_-_Niitvälja.jpg/330px-Valeriana_officinalis_-_Niitvälja.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "White Deadnettle",
                      scientificName: "Lamium album",
                      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hedera_helix_Dover.jpg/330px-Hedera_helix_Dover.jpg",
                      safety: { cats: "Safe", dogs: "Safe" }
                    },
                    {
                      commonName: "Bluebeard",
                      scientificName: "Caryopteris",
                      image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Caryopteris_incana_4.JPG",
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