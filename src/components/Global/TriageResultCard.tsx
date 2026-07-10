import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Box from '../../components/Global/Box';

interface Props {
  riskLevel: string;
  recommendation: string;
  estimatedWaitTime: string;
}

const TriageResultCard = ({
  riskLevel,
  recommendation,
  estimatedWaitTime,
}: Props) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return '#DC2626';
      case 'HIGH':
        return '#F97316';
      case 'LOW':
        return '#16A34A';
      case 'PENDING':
        return '#EAB308';
      default:
        return '#2563EB';
    }
  };

  return (
    <Box style={styles.card}>
      <Text style={styles.title}>Triage Assessment</Text>

      <Box style={styles.row}>
        <Text style={styles.label}>Risk Level</Text>

        <Box
          style={[
            styles.badge,
            {
              backgroundColor: getRiskColor(),
            },
          ]}>
          <Text style={styles.badgeText}>{riskLevel}</Text>
        </Box>
      </Box>

      <Box style={styles.divider} />

      <Text style={styles.label}>Recommendation</Text>

      <Text style={styles.value}>{recommendation}</Text>

      <Box style={styles.divider} />

      <Text style={styles.label}>Estimated Wait</Text>

      <Text style={styles.value}>{estimatedWaitTime}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    padding: 18,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 18,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
});

export default TriageResultCard;