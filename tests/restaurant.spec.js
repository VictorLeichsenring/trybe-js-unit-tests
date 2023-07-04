const createMenu = require('../src/restaurant');

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  it('Verifica se a função `createMenu` retorna um objeto, e se existe achave fetchMenu', () => {
    const menu = createMenu({ food: {}, drinks: {} });
    expect(menu).toHaveProperty('fetchMenu');
  });
  
  it('Verifica se a função `createMenu` retorna um objeto com a chave fetchMenu sendo uma função', () => {
    const menu = createMenu({ food: {}, drinks: {} });
    expect(typeof menu.fetchMenu).toBe('function');
  });

  it('Verifica se a função `createMenu` retorna um objeto cuja chave fetchMenu retorna um objeto com as chaves food e drinks', () => {
    const menu = createMenu({ food: {}, drinks: {} });
    const fetchedMenu = menu.fetchMenu();
    expect(Object.keys(fetchedMenu)).toEqual(['food', 'drinks']);
  });

  it('Verifica se a propriedade consumption do objeto retornado pela função createMenu retorna um array vazio', () => {
    const menu = createMenu({ food: {}, drinks: {} });
    expect(menu.consumption).toEqual([]);
  });

  it('Verifica se a função `createMenu` retorna um objeto cujo fetchMenu é idêntico ao menu passado como parâmetro', () => {
    const dummyMenu = { food: { 'coxinha': 3.90 }, drinks: { 'agua': 3.90 } };
    const menu = createMenu(dummyMenu);
    expect(menu.fetchMenu()).toEqual(dummyMenu);
  });

  it('Verifica se a função order adiciona corretamente os pedidos ao array consumption', () => {
    const menuOrderTest = { food: { coxinha: 3.90, sanduiche: 9.90 }, drinks: { agua: 3.90, cerveja: 6.90 } };
    const menu = createMenu(menuOrderTest);
    menu.order('coxinha');
    expect(menu.consumption).toEqual(['coxinha']);
    menu.order('picanha');
    expect(menu.consumption).toEqual(['coxinha']);
    menu.order('sanduiche');
    menu.order('agua');
    expect(menu.consumption).toEqual(['coxinha', 'sanduiche', 'agua']);
  });

  it('Verifica se a função order permite pedidos repetidos no array consumption', () => {
    const menuOrderTest = { food: { coxinha: 3.90, sanduiche: 9.90 }, drinks: { agua: 3.90, cerveja: 6.90 } };
    const menu = createMenu(menuOrderTest);
    menu.order('coxinha');
    menu.order('coxinha');
    expect(menu.consumption).toEqual(['coxinha', 'coxinha']);
  });

  it('Verifica se a função pay retorna a soma dos preços dos itens no array consumption acrescido de 10%', () => {
    const menuOrderTest = { food: { coxinha: 3.90, sanduiche: 9.90 }, drinks: { agua: 3.90, cerveja: 6.90 } };
    const menu = createMenu(menuOrderTest);
    menu.order('coxinha');
    menu.order('agua');
    const expectedPrice = (menuOrderTest.food['coxinha'] + menuOrderTest.drinks['agua']) * 1.10;
    expect(typeof menu.pay()).toBe('string');
    expect(parseFloat(menu.pay())).toBeCloseTo(expectedPrice, 2);
  });
});
