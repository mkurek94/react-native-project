import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Image
  } from "react-native";
  import React, { useState } from "react";
  
  import { icons } from '../constants';
  
  interface SearchInputProps {
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    placeholder?: string;
  }
  
  const SearchInput = ({
    handleChangeText,
    otherStyles,
    value,
    placeholder,
  }: SearchInputProps) => {
      const [showPassword, setShowPassword] = useState(false);
    return (
      <View className={`space-y-2 space-x-4 ${otherStyles}`}>
          <TextInput
            className="relative border-2 bg-black-200 rounded-2xl focus:border-secondary items-center w-full h-16 px-14 flex-1 text-white font-pregular"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
            cursorColor="#FF9C01"
          />
  
        <TouchableOpacity className="absolute right-5 top-6">
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default SearchInput;
  