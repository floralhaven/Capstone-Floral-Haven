document.addEventListener('DOMContentLoaded', () => {
  fetchData('butterfly').then(data => {
    populateCards(data);
  });
});

function fetchData(category) {
  // Hardcoded data for now will replace with connection to a SQL db
  const data = {
    butterfly: [
      {
        commonName: "Zinnia",
        scientificName: "Zinnia spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Zinnia_single_layer_and_12_Petals_2.jpg/330px-Zinnia_single_layer_and_12_Petals_2.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Cosmos",
        scientificName: "Cosmos bipinnatus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg/330px-Cosmos_bipinnatus_pink%2C_Burdwan%2C_West_Bengal%2C_India_10_01_2013.jpg",
        safety: { cats: "Not Safe", dogs: "Safe" }
      },
      {
        commonName: "French Marigolds",
        scientificName: "Tagetes patula",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/French_marigold_Tagetes_patula.jpg/330px-French_marigold_Tagetes_patula.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Snapdragon",
        scientificName: "Antirrhinum majus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Antirrhinum_majus_from_Thasos.JPG/330px-Antirrhinum_majus_from_Thasos.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Lantana",
        scientificName: "Lantana camara",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/LantanaFlowerLeaves.jpg/330px-LantanaFlowerLeaves.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Verbena",
        scientificName: "Verbena spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Verbena_bonariensis1.jpg/330px-Verbena_bonariensis1.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Petunia",
        scientificName: "Petunia spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Petunia_exserta_by_Scott_Zona_-_004_%281%29.jpg/330px-Petunia_exserta_by_Scott_Zona_-_004_%281%29.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Sunflower",
        scientificName: "Helianthus annuus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Impatiens",
        scientificName: "Impatiens spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Impatiens_scapiflora.jpg/330px-Impatiens_scapiflora.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Calendula",
        scientificName: "Calendula officinalis",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Calendula_January_2008-1_filtered.jpg/330px-Calendula_January_2008-1_filtered.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Sweet Alyssum",
        scientificName: "Lobularia maritima",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Smagliczka_nadmorska_1.jpg/330px-Smagliczka_nadmorska_1.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Monk's Cress",
        scientificName: "Tropaeolum majus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tropaeolum_majus_2005_G1.jpg/330px-Tropaeolum_majus_2005_G1.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Butterfly bush",
        scientificName: "Buddleja spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Buddleja_crispa_var._agathosma.jpg/330px-Buddleja_crispa_var._agathosma.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Purple Coneflower",
        scientificName: "Echinacea purpurea",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Echinacea_purpurea_Grandview_Prairie.jpg/330px-Echinacea_purpurea_Grandview_Prairie.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Butterfly Weed",
        scientificName: "Asclepias curassavica",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Asclepias_tuberosa_interior.jpg/330px-Asclepias_tuberosa_interior.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Joe-Pye Weed",
        scientificName: "Eutrochium spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/330px-Rosemary_in_bloom.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Spider Flower",
        scientificName: "Cleome houtteana",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Cleome_hassleriana.jpg/330px-Cleome_hassleriana.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Phlox",
        scientificName: "Phlox paniculata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Phlox_Paniculata.jpg/330px-Phlox_Paniculata.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Bee Balm",
        scientificName: "Citriodora-Hybr",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Monarda_didyma_00.jpg/330px-Monarda_didyma_00.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Blazing Star",
        scientificName: "Liatris picata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Liatris_spicata_Purple.jpg/330px-Liatris_spicata_Purple.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Yarrow",
        scientificName: "Achillea millefolium",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Achillea_millefolium_%28bright%29.jpg/330px-Achillea_millefolium_%28bright%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Black-eyed Susan",
        scientificName: "Rudbeckia hirta",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Rudbeckia_hirta_kz03.jpg/330px-Rudbeckia_hirta_kz03.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Aster",
        scientificName: "Symphyotrichum spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Asteraceae_-_Aster_amellus.JPG/330px-Asteraceae_-_Aster_amellus.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Purple Sage",
        scientificName: "Salvia leucantha",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Salvia_leucantha_%28Mexican_Bush_Sage%29.jpg/330px-Salvia_leucantha_%28Mexican_Bush_Sage%29.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Goldenrod",
        scientificName: "Solidago canadensis",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Solidago_nemoralis.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Lavender",
        scientificName: "Lavandula angustifolia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/330px-Single_lavender_flower02.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Calliopsis",
        scientificName: "Coreopsis spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Coreopsisgigantea.jpg/330px-Coreopsisgigantea.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Shasta Daisy",
        scientificName: "Leucanthemum × superbum",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Leucanthemum_x_superbum_%27Becky%27_in_NH.jpg/330px-Leucanthemum_x_superbum_%27Becky%27_in_NH.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Stonecrops",
        scientificName: "Sedum spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Biting_stonecrop_close_800.jpg/330px-Biting_stonecrop_close_800.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Blanket Flower",
        scientificName: "Gaillardia aristata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Gaillardia_in_Aspen_%2891273%29.jpg/330px-Gaillardia_in_Aspen_%2891273%29.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Lilac",
        scientificName: "Syringa vulgaris",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Stockholm-lilac.jpg/330px-Stockholm-lilac.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Japanese meadowsweet",
        scientificName: "Spiraea japonica",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Spiraea_japonica_25-06-2010_13-58-09.JPG/330px-Spiraea_japonica_25-06-2010_13-58-09.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Azalea",
        scientificName: "Rhododendron spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Azalea.750pix.jpg/330px-Azalea.750pix.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Hydrangea",
        scientificName: "Hydrangea spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydrangea_arborescens_annabelle.JPG/404px-Hydrangea_arborescens_annabelle.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Hibiscus",
        scientificName: "Hibiscus spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Hibiscus_flower_TZ.jpg/330px-Hibiscus_flower_TZ.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Nannyberry",
        scientificName: "Viburnum spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Viburnum_lentago_NRCS-006.jpg/330px-Viburnum_lentago_NRCS-006.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Honeysuckle",
        scientificName: "Lonicera spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Lonicera_caprifolium001.jpg/330px-Lonicera_caprifolium001.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Cherry Tree",
        scientificName: "Prunus spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Stablo_trešnje_Germersdorfer_u_cvatu.jpg/330px-Stablo_trešnje_Germersdorfer_u_cvatu.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Willow",
        scientificName: "Salix spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Borage_starflower_Rohtopurasruoho_01.jpg/330px-Borage_starflower_Rohtopurasruoho_01.jpg",
        safety: { cats: "Not Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Passion flower",
        scientificName: "Passiflora spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/OQ_Passion_flower.jpg/330px-OQ_Passion_flower.jpg",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Trumpet Vine",
        scientificName: "Campsis radicans",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Campsis-radicans-20080402.JPG/330px-Campsis-radicans-20080402.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Clematis",
        scientificName: "Clematis spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Clematis_%27Nelly_Moser%27.JPG/330px-Clematis_%27Nelly_Moser%27.JPG",
        safety: { cats: "Not Safe", dogs: "Not Safe" }
      },
      {
        commonName: "Crabapple",
        scientificName: "Malus spp.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Purple_prince_crabapple_tree.JPG/330px-Purple_prince_crabapple_tree.JPG",
        safety: { cats: "Not Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Tulip tree",
        scientificName: "Liriodendron tulipifera",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Liriodendron_tulipifera.jpg/330px-Liriodendron_tulipifera.jpg",
        safety: { cats: "Not Safe", dogs: "Safe" }
      },
      {
        commonName: "Egyptian starcluster",
        scientificName: "Pentas lanceolata",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Penta.JPG/330px-Penta.JPG",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Hollyhock",
        scientificName: "Alcea rosea",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Alcea_setosa.jpg/330px-Alcea_setosa.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Dragon's Blood Sedum",
        scientificName: "Sedum spurium",
        image: "https://www.seedneeds.com/cdn/shop/products/IMG_2529_600x600.jpg?v=1675735604",
        safety: { cats: "Moderately Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Dwarf Blazing Star",
        scientificName: "Liatris microcephala",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Liatris_microcephala.jpg/330px-Liatris_microcephala.jpg",
        safety: { cats: "Safe", dogs: "Safe" }
      },
      {
        commonName: "Lily of the Nile",
        scientificName: "Agapanthus",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Agapanthus_africanus1.jpg/330px-Agapanthus_africanus1.jpg",
        safety: { cats: "Not Safe", dogs: "Moderately Safe" }
      },
      {
        commonName: "Spicebush",
        scientificName: "Lindera benzoin",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Spicebush_%284506720062%29.jpg/330px-Spicebush_%284506720062%29.jpg",
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