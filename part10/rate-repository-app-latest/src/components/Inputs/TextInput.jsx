import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorText: {
    border: '1px solid red',
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.errorText];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;