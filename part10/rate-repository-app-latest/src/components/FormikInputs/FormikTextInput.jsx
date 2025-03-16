import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useField } from 'formik';
import TextInput from '../Inputs/TextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.danger,
    marginBottom: 15,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;