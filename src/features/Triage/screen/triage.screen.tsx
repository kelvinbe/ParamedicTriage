import React, { useState, useContext } from 'react';
import { Text } from 'react-native';

import Box from '../../../components/Global/Box';

import PatientInput from '../components/PatientInput';
import PrioritySelector from '../components/PrioritySelector';
import StatusSelector from '../components/StatusSelector';
import SubmitButton from '../components/SubmitButton';

import { TriageContext } from '../../../context/TriageContext';

const TriageScreen = () => {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [priority, setPriority] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const [formErrors, setFormErrors] = useState({
    name: '',
    condition: '',
    priority: '',
    status: '',
  });

  const {
    submitPatient,
    triageResult,
    loading,
    error,
  } = useContext(TriageContext);

const validate = () => {
  const newErrors = {
    name: '',
    condition: '',
    priority: '',
    status: '',
  };

  let isValid = true;

  const containsLetters = /[a-zA-Z]/;

  if (!name.trim()) {
    newErrors.name = 'Patient name is required.';
    isValid = false;
  } else if (!containsLetters.test(name)) {
    newErrors.name = 'Patient name must contain letters.';
    isValid = false;
  }

  if (!condition.trim()) {
    newErrors.condition = 'Condition description is required.';
    isValid = false;
  } else if (!containsLetters.test(condition)) {
    newErrors.condition = 'Condition description must contain letters.';
    isValid = false;
  }

  if (priority === null) {
    newErrors.priority = 'Please select a priority.';
    isValid = false;
  }

  if (!status) {
    newErrors.status = 'Please select a status.';
    isValid = false;
  }

  setFormErrors(newErrors);

  return isValid;
};

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    submitPatient({
      name,
      condition,
      priority,
      status,
    });
  };

  return (
    <Box flex={1} padding={20}>
   <PatientInput
  label="Patient Name"
  value={name}
  onChangeText={(text) => {
    setName(text);

    if (formErrors.name) {
      setFormErrors((prev) => ({
        ...prev,
        name: '',
      }));
    }
  }}
  error={formErrors.name}
  required
/>

<PatientInput
  label="Condition Description"
  value={condition}
  onChangeText={(text) => {
    setCondition(text);

    if (formErrors.condition) {
      setFormErrors((prev) => ({
        ...prev,
        condition: '',
      }));
    }
  }}
  multiline
  error={formErrors.condition}
  required
/>

      <PrioritySelector
        value={priority}
        onChange={(value) => {
          setPriority(value);

          if (formErrors.priority) {
            setFormErrors((prev) => ({
              ...prev,
              priority: '',
            }));
          }
        }}
      />

      {formErrors.priority !== '' && (
        <Text
          style={{
            color: 'red',
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          {formErrors.priority}
        </Text>
      )}

      <StatusSelector
        value={status}
        onChange={(value) => {
          setStatus(value);

          if (formErrors.status) {
            setFormErrors((prev) => ({
              ...prev,
              status: '',
            }));
          }
        }}
      />

      {formErrors.status !== '' && (
        <Text
          style={{
            color: 'red',
            marginTop: 5,
            marginLeft: 10,
          }}
        >
          {formErrors.status}
        </Text>
      )}

      <SubmitButton onPress={handleSubmit} />

      {loading && (
        <Text style={{ marginTop: 20 }}>
          Processing triage...
        </Text>
      )}

      {error !== '' && (
        <Text
          style={{
            color: 'red',
            marginTop: 20,
          }}
        >
          {error}
        </Text>
      )}

      {triageResult && (
        <Box margin={20}>
          <Text>Risk Level: {triageResult.riskLevel}</Text>

          <Text>
            Recommendation: {triageResult.recommendation}
          </Text>

          <Text>
            Estimated Wait: {triageResult.estimatedWaitTime}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default TriageScreen;