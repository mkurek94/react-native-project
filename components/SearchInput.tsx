import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Image,
    Alert
  } from "react-native";
  import React, { useState } from "react";
  
  import { icons } from '../constants';
import { router, usePathname } from "expo-router";
  
  interface SearchInputProps {
    otherStyles?: string;
    placeholder?: string;
    initialQuery?: string;
  }
  
  const SearchInput = ({
    otherStyles,
    placeholder,
    initialQuery,
  }: SearchInputProps) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
      <View className={`space-y-2 space-x-4 ${otherStyles}`}>
          <TextInput
            className="relative border-2 bg-black-200 rounded-2xl focus:border-secondary items-center w-full h-16 px-14 flex-1 text-white font-pregular"
            value={query}
            placeholder={placeholder}
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
            cursorColor="#FF9C01"
          />
  
        <TouchableOpacity className="absolute right-5 top-1 p-4 " onPress={() => {
          if(!query) {
            return Alert.alert("Missing query", 'Please input something to search roseults across database.')
          }

          if(pathname.startsWith('/search')) {
            router.setParams({query});
          } else {
            router.push(`/search/${query}`)
          }

        }}>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default SearchInput;
  