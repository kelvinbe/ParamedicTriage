import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Box from '../../../components/Global/Box';
import Colors from '../../../constants/colors';

interface Props {
  onPress: () => void;
}

export default function SubmitButton({ onPress }: Props) {
  return (
    <Box
      pressable
      onPress={onPress}
      backgroundColor={Colors.theme.primary}
      padding={16}
      radius={12}
      align="center"
    >
      <Text style={styles.text}>Submit Triage</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.theme.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
