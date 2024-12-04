import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import { getMealCategories, getMealsByCategory, getRandomMeal } from '../app/api';
import SearchIcon from '../assets/search';
import PersonIcon from '../assets/personicon';
import BellIcon from '../assets/bellicon';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories and a random meal on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryResponse = await getMealCategories();
        setCategories(categoryResponse.data.categories);

        const randomMealResponse = await getRandomMeal();
        setRandomMeal(randomMealResponse.data.meals[0]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch meals by category
  const fetchMealsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await getMealsByCategory(category);
      setMeals(response.data.meals);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setLoading(false);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect category
      setMeals([]); // Clear meals
    } else {
      setSelectedCategory(category);
      fetchMealsByCategory(category);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6347" style={tw`mt-10`} />;
  }

  return (
    <ScrollView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`p-5 flex-row items-center justify-between`}>
        <PersonIcon />
        <BellIcon />
      </View>

      {/* Welcome Section */}
      <View style={tw`p-5`}>
        <Text style={tw`text-lg font-semibold`}>Hello, Franklyn</Text>
        <Text style={tw`text-4xl font-bold`}>
          Discover new recipes and
          <Text style={tw`text-orange-500`}> cook!</Text>
        </Text>
      </View>

      {/* Search Bar */}
      <View
        style={tw`flex-row items-center bg-gray-200 mx-5 p-2 rounded-full`}
      >
        <TextInput
          placeholder="Search for recipes"
          style={tw`flex-1 text-lg px-2`}
        />
        <SearchIcon />
      </View>

      {/* Random Meal Section */}
      {randomMeal && (
        <View style={tw`p-5`}>
          <Text style={tw`text-2xl font-semibold mb-3`}>Featured Recipe</Text>
          <TouchableOpacity
            style={tw`shadow-lg`}
            onPress={() => console.log('Navigate to recipe details')}
          >
            <Image
              source={{ uri: randomMeal.strMealThumb }}
              style={tw`w-full h-40 rounded-lg`}
            />
            <Text style={tw`text-center text-lg font-bold mt-2`}>
              {randomMeal.strMeal}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Categories Section */}
      <View>
        <Text style={tw`text-2xl font-semibold px-5 mt-5`}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.idCategory}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`p-5`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryClick(item.strCategory)}
              style={[
                tw`items-center`,
                selectedCategory === item.strCategory && tw`opacity-50`,
              ]}
            >
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={tw`h-18 w-18 rounded-lg`}
              />
              <Text style={tw`text-center font-semibold mt-2`}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Meals Section */}
      <View>
        <Text style={tw`text-2xl font-semibold px-5 mt-5`}>Recipes</Text>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal.toString()}
          numColumns={2}
          columnWrapperStyle={tw`justify-between px-5`}
          contentContainerStyle={tw`pb-5`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => console.log('Navigate to recipe details')}
              style={tw`mb-5`}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={tw`h-40 w-40 rounded-lg`}
              />
              <Text style={tw`text-center font-semibold mt-2`}>
                {item.strMeal}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
