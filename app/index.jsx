import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import tw from 'twrnc'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'; 
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  // Create animated values for the icon and text
  const scaleAnim = useRef(new Animated.Value(0)).current; // Scale effect
  const opacityAnim = useRef(new Animated.Value(0)).current; // Fade-in effect

  // Animation logic
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(); // Scale up the icon

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(); // Fade-in the text
  }, []);

  return (
    <Pressable onPress={() => router.push('home')} style={tw`bg-orange-500 flex-1 justify-center items-center`}>
      {/* Animated FontAwesomeIcon */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <FontAwesomeIcon icon={faCookieBite} size={50} color="white" />
      </Animated.View>
      
      {/* Animated Text */}
      <Animated.View style={{ opacity: opacityAnim }}>
        <Text style={tw`text-6xl font-bold text-white`}>Foody</Text>
        <Text style={tw`text-lg text-white font-semibold mt-2`}>
          Foody is always right!
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default Index;

const styles = StyleSheet.create({});
