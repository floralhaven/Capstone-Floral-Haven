document.addEventListener('DOMContentLoaded', () => {
    fetchData('bat').then(data => {
      populateCards(data);
    });
  });