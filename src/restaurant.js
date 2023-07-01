/* eslint-disable max-len */
// Siga as orientações do README!

function createMenu(menu) {
  let consumption = [];

  return {
    fetchMenu() {
      return menu;
    },
    order(item) {
      if (menu.food[item] || menu.drinks[item]) {
        consumption.push(item);
      } else {
        console.log('Item indisponível');
      }
    },
    consumption,
    pay() {
      let total = 0;
      for (let item of consumption) {
        total += menu.food[item] || menu.drinks[item];
      }
      return (total * 1.10).toFixed(2);
    },
  };
}

module.exports = createMenu;