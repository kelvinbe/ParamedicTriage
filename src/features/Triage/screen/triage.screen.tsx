import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Text, Platform, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

import Box from '../../../components/Global/Box';

import PatientInput from '../components/PatientInput';
import PrioritySelector from '../components/PrioritySelector';
import StatusSelector from '../components/StatusSelector';
import SubmitButton from '../components/SubmitButton';

import { TriageContext } from '../../../context/TriageContext';


const initialForm = {
  name: '',
  condition: '',
  priority: null as number | null,
  status: '',
};


const TriageScreen = () => {

  const [form, setForm] = useState(initialForm);


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

    if (!form.name.trim()) {

      newErrors.name =
        'Patient name is required.';

      isValid = false;

    } else if (!containsLetters.test(form.name)) {

      newErrors.name =
        'Patient name must contain letters.';

      isValid = false;

    }



    if (!form.condition.trim()) {

      newErrors.condition =
        'Condition description is required.';

      isValid = false;

    } else if (!containsLetters.test(form.condition)) {

      newErrors.condition =
        'Condition description must contain letters.';

      isValid = false;

    }



    if (form.priority === null) {

      newErrors.priority =
        'Please select a priority.';

      isValid = false;

    }



    if (!form.status) {

      newErrors.status =
        'Please select a status.';

      isValid = false;

    }


    setFormErrors(newErrors);

    return isValid;
  };



  const handleSubmit = async () => {

    if (!validate()) {
      return;
    }


   submitPatient({

      id: uuid.v4().toString(),

      patientName: form.name,

      conditionDescription:
        form.condition,

      priority:
        form.priority as 1 | 2 | 3 | 4 | 5,

      status:
        form.status as 'Pending' | 'In-Transit',

      createdAt:
        new Date().toISOString(),

    });

      setForm(initialForm);

  setFormErrors({
    name: '',
    condition: '',
    priority: '',
    status: '',
  });

  };





  const updateField = (
    field: keyof typeof form,
    value: any
  ) => {

    setForm(prev => ({
      ...prev,
      [field]: value,
    }));


    if (formErrors[field]) {

      setFormErrors(prev => ({
        ...prev,
        [field]: '',
      }));

    }

  };



  return (
      <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >

        <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
      }}
      keyboardShouldPersistTaps="handled"
    >


    <Box flex={1} >


      <PatientInput
        label="Patient Name"
        value={form.name}
        onChangeText={(text) =>
          updateField('name', text)
        }
        error={formErrors.name}
        required
      />



      <PatientInput
        label="Condition Description"
        value={form.condition}
        onChangeText={(text) =>
          updateField('condition', text)
        }
        multiline
        error={formErrors.condition}
        required
      />



      <PrioritySelector
        value={form.priority}
        onChange={(value) =>
          updateField('priority', value)
        }
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
        value={form.status}
        onChange={(value) =>
          updateField('status', value)
        }
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



      <SubmitButton
        onPress={handleSubmit}
      />



      {loading && (

        <Text style={{marginTop:20}}>
          Saving triage record...
        </Text>

      )}



      {error !== '' && (

        <Text
          style={{
            color:'red',
            marginTop:20,
          }}
        >
          {error}
        </Text>

      )}



      {triageResult && (

        <Box margin={20}>

          <Text>
            Risk Level:
            {' '}
            {triageResult.riskLevel}
          </Text>


          <Text>
            Recommendation:
            {' '}
            {triageResult.recommendation}
          </Text>


          <Text>
            Estimated Wait:
            {' '}
            {triageResult.estimatedWaitTime}
          </Text>


        </Box>

      )}


    </Box>
    </ScrollView>
    </KeyboardAvoidingView>

  );

};


export default TriageScreen;