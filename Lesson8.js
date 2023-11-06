const prompt = require('prompt-sync')();

const customer = {
  name: '',
  email: '',
  phone: '',
};

const deliveryInfo = {
  deliveryPrice: 500,
  from: "вул.Коновальця",
  to: '',
};

const customerOrder = {
  ...customer,
  ...deliveryInfo,
  selectedDishes: [],
  totalPrice: '',
  orderStatus: '1',
};

const validStatuses = {
  '1': 'Прийнято',
  '2': 'Очікується',
  '3': 'Готується',
  '4': 'В дорозі',
  '5': 'Доставлено',
};

const menu = [
  {
    ID: '1',
    title: 'california',
    price: 7000,
    ingredients: ['rice', 'sauce', 'sea fish'],
  },
  {
    ID: '2',
    title: 'Philadelphia',
    price: 6000,
    ingredients: ['rice', 'nori', 'avocado', 'salmon'],
  },
  {
    ID: '3',
    title: 'Pizza',
    price: 2500,
    ingredients: ['tomatoes', 'dough', 'ham', 'sauce'],
  }
];

function main() {
  for (const item of menu) {
    console.log(`ID: ${item.ID}`);
    console.log(`Title: ${item.title}`);
    console.log(`Price: ${item.price}`);
    console.log(`Ingredients: ${item.ingredients.join(', ')}`);
    console.log('\n');
  }

  chooseDishes();
  enterCustomerInfo();
  calculateTotalPrice();
  showOrderSummary();
  trackOrderStatus();
}

function chooseDishes() {
  let userInputDish;
  let words;
  let addMore = '1';

  do {
    userInputDish = prompt('Оберіть ID вашого замовлення. Для декількох замовлень введіть ID через пробіл. Щоб обрати одну страву декілька разів, введіть ID декілька разів: ');
    words = userInputDish.split(' ');

    for (const word of words) {
      const selectedDish = menu.find(menuItem => menuItem.ID === word);
      if (selectedDish) {
        console.log(`Ви замовили ${selectedDish.title}`);
        customerOrder.selectedDishes.push(selectedDish);
      } else {
        console.log(`Помилка: товар з ID ${word} не знайдений у меню.`);
      }
    }

    addMore = prompt('Бажаєте додати ще страви до замовлення? Введіть 1 -- так або 2 -- ні ');
  } while (addMore === '1');
}

function enterCustomerInfo() {
  const userInputName = prompt("Уведіть ваше прізвище та ім'я: ");
  const userEmail = prompt("Уведіть вашу електронну пошту: ");
  const userAddress = prompt("Уведіть вашу адресу доставки: ");

  const [lastName, firstName] = userInputName.split(' ');

  customer.name = `${firstName} ${lastName}`;
  customer.email = userEmail;
  deliveryInfo.to = userAddress;

  let userPhoneNumber;
  do {
    userPhoneNumber = prompt("Уведіть ваш номер: ");
  } while (userPhoneNumber[0] !== '+');

  customer.phone = userPhoneNumber;
  Object.assign(customerOrder, customer, deliveryInfo);
}

function calculateTotalPrice() {
  let totalCost = 0;
  for (const dish of customerOrder.selectedDishes) {
    totalCost += dish.price;
  }
  customerOrder.totalPrice = totalCost + deliveryInfo.deliveryPrice;
}

function showOrderSummary() {
  console.log("\nВаше прізвище та ім'я: " + customer.name);
  console.log("Ваша електронна пошта: " + customer.email);
  console.log("Ваш номер: " + customer.phone);
  console.log("Адреса відправки: " + deliveryInfo.from);
  console.log("Ваша адреса доставки: " + deliveryInfo.to);

  console.log("Ваші страви:");
  for (const dish of customerOrder.selectedDishes) {
    console.log(`Назва: ${dish.title}`);
  }

  console.log('Ціна замовлення: ' + customerOrder.totalPrice);
  console.log("Статус замовлення: " + validStatuses[customerOrder.orderStatus]);
}

function trackOrderStatus() {
  console.log("Ваше замовлення наразі має статус: " + validStatuses[customerOrder.orderStatus]);
  const newStatus = prompt("Оновіть статус замовлення (виберіть номер від 1 до 5, де 1 - 'Прийнято', 2 - 'Очікується', і так далі): ");

  if (validStatuses[newStatus]) {
    customerOrder.orderStatus = newStatus;
    console.log("Статус замовлення оновлено на: " + validStatuses[customerOrder.orderStatus]);
  } else {
    console.log("Помилка: Невірний номер статусу. Будь ласка, виберіть із доступних статусів.");
    trackOrderStatus();
  }
}

main();

