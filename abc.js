const axios = require('axios');

const API_URL = 'https://lostandfoundrutagdelhi-lostandfound.azuremicroservices.io/api'; // Update with your actual API URL

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)); 

const users = [
  { username: 'user1', email: 'user1@example.com', password: 'password1', phoneNumber: '1234567890' },
  { username: 'user2', email: 'user2@example.com', password: 'password2', phoneNumber: '1234567891' },
  { username: 'user3', email: 'user3@example.com', password: 'password3', phoneNumber: '1234567892' },
  { username: 'user4', email: 'user4@example.com', password: 'password4', phoneNumber: '1234567893' },
  { username: 'user5', email: 'user5@example.com', password: 'password5', phoneNumber: '1234567894' },
  { username: 'user6', email: 'user6@example.com', password: 'password6', phoneNumber: '1234567895' },
  { username: 'user7', email: 'user7@example.com', password: 'password7', phoneNumber: '1234567896' },
  { username: 'user8', email: 'user8@example.com', password: 'password8', phoneNumber: '1234567897' },
  { username: 'user9', email: 'user9@example.com', password: 'password9', phoneNumber: '1234567898' },
  { username: 'user10', email: 'user10@example.com', password: 'password10', phoneNumber: '1234567899' }
];

const categories = [
  'Electronics', 'Clothing', 'Books', 'Accessories', 'Home & Kitchen', 
  'Toys', 'Sports Equipment', 'Health & Beauty', 'Automotive', 'Others'
];

const getRandomCategory = () => categories[Math.floor(Math.random() * categories.length)];
const getRandomImageUrl = () => 'https://via.placeholder.com/200';

const createUsers = async () => {
  for (const user of users) {
    try {
      const response = await axios.post(`${API_URL}/users`, user);
      await sleep(1000); // Sleep for 1 second to avoid rate
      console.log('User created:', response.data);
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
    }
  }
};

const createItems = async () => {
  const usersResponse = await axios.get(`${API_URL}/users`);
  const userIds = usersResponse.data.map(user => user.userId);

  const items = [];
  for (let i = 0; i < 20; i++) {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    items.push({
      userId: randomUserId,
      title: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
      category: getRandomCategory(),
      status: 'LOST',
      location: `Location ${i + 1}`,
      imageUrl: getRandomImageUrl(),
    });

  }

  for (const item of items) {
    try {
      const response = await axios.post(`${API_URL}/items`, item);
        await sleep(1000); // Sleep for 1 second to avoid rate
      console.log('Item created:', response.data);
    } catch (error) {
      console.error('Error creating item:', error.response ? error.response.data : error.message);
    }
  }
};

const run = async () => {
  await createUsers();
  await createItems();
};

run();
