import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  message: string;
  type?: 'success' | 'warning' | 'error';
}

const SyncAlert = ({
  visible,
  message,
  type = 'success',
}: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        type === 'success' && styles.success,
        type === 'warning' && styles.warning,
        type === 'error' && styles.error,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
  },

  success: {
    backgroundColor: '#D1FAE5',
  },

  warning: {
    backgroundColor: '#FEF3C7',
  },

  error: {
    backgroundColor: '#FEE2E2',
  },

  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
});

export default SyncAlert;