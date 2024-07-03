import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS_KEY = 'PRODUCTS';
const CART_KEY = 'CART';

const sampleProducts = [
  { id: 1, name: 'Office Wear' , description:'Reversible Angora Cardigan', price: 120, imagesrc: require('./assets/dress1.png') },
  { id: 2, name: 'Black', description:'Reversible Angora Cardigan', price: 120, imagesrc: require('./assets/dress2.png') },
  { id: 3, name: 'Lamerie', description:'Reversible Angora Cardigan', price: 200, imagesrc: require('./assets/dress3.png') },
  { id: 4, name: 'Church Wear', description:'Reversible Angora Cardigan', price: 120, imagesrc: require('./assets/dress4.png') },
  { id: 5, name: 'Lopo', description:'Reversible Angora Cardigan', price: 120, imagesrc: require('./assets/dress5.png') },
  { id: 6, name: 'Lame', description:'Reversible Angora Cardigan', price: 120, imagesrc: require('./assets/dress6.png')}
];

export const getProducts = async () => {
  try {
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    const products = await AsyncStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  } catch (e) {
    console.error(e);
  }
};

export const getCartItems = async () => {
  try {
    const cartItems = await AsyncStorage.getItem(CART_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (e) {
    console.error(e);
  }
};

export const addToCart = async (product) => {
  try {
    const cartItems = await getCartItems();
    cartItems.push(product);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.error(e);
  }
};

export const removeFromCart = async (productId) => {
  try {
    let cartItems = await getCartItems();
    cartItems = cartItems.filter((item) => item.id !== productId);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.error(e);
  }
};
