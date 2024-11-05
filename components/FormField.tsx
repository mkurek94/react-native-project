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

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  otherStyles?: string;
  keyboardType?: string;
  placeholder?: string;
}

const FormField = ({
  handleChangeText,
  keyboardType,
  otherStyles,
  title,
  value,
  placeholder,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`} key={title}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
        <TextInput
          className="relative border-2 bg-black-200 rounded-2xl focus:border-secondary items-center w-full h-16 px-14 flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          cursorColor="#FF9C01"
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-5 top-11">
                <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain"/>
            </TouchableOpacity>
        )}
    </View>
  );
};

export default FormField;
