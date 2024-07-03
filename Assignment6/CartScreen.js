import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getCartItems, removeFromCart } from './Storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.imagesrc} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Image source={require('./assets/remove.png')} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
      />
      <Text style={styles.total}>
        Est. Total: ${cartItems.reduce((sum, item) => sum + item.price, 0)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CartScreen;
