import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

import Box from '../../../components/Global/Box';
import Colors from '../../../constants/colors';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const statuses = ['Pending', 'In-Transit'];

export default function StatusSelector({ value, onChange }: Props) {
  return (
    <Box margin={10}>
      <Text style={styles.title}>Status</Text>

      <Box row style={{ gap: 10 }}>
        {statuses.map(status => (
          <Pressable key={status} onPress={() => onChange(status)}>
            <Box
              padding={12}
              radius={10}
              backgroundColor={
                value === status
                  ? Colors.theme.primaryLight
                  : Colors.theme.surface
              }
              style={{
                borderWidth: 1,
                borderColor: Colors.theme.primary,
              }}
            >
              <Text>{status}</Text>
            </Box>
          </Pressable>
        ))}
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
