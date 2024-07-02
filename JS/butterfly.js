document.addEventListener('DOMContentLoaded', () => {
    fetchData('butterfly').then(data => {
      populateCards(data);
    });
  });