import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProductItem from './ProductItem';
import { getProducts, addToCart } from './Storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('./assets/Menu.png')} style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Image source={require('./assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('./assets/Filter.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subheading}>
        <Text style={styles.storyTitle}>OUR STORY</Text>
        <TouchableOpacity>
          <Image source={require('./assets/shoppingBag.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem product={item} onAddToCart={() => handleAddToCart(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  subheading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
e