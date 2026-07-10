import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import Box from '../../../components/Global/Box';
import Colors from '../../../constants/colors';

interface Props extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;

  error?: string | null;
  required?: boolean;
}

export default function PatientInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  error,
  required = false,
  ...props
}: Props) {
  const showError = Boolean(error);

  return (
    <Box margin={10}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.theme.border}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline,
          showError && styles.inputError,
        ]}
        {...props}
      />

      {showError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.theme.text,
    marginBottom: 8,
  },

  required: {
    color: '#E53935',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.theme.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: Colors.theme.surface,
    color: Colors.theme.text,
  },

  multiline: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },

  inputError: {
    borderColor: '#E53935',
  },

  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 2,
  },
});