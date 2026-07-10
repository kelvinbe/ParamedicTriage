import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import Box from '../../../components/Global/Box';
import Colors from '../../../constants/colors';


interface Props {
  label: string;
  value: string;
  onChangeText: (text:string)=>void;
  placeholder?: string;
  multiline?: boolean;
}


export default function PatientInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline=false,
}:Props){

  return (

    <Box margin={10}>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.multiline
        ]}
      />

    </Box>

  );
}


const styles = StyleSheet.create({

  label:{
    fontSize:15,
    fontWeight:'600',
    color:Colors.theme.text,
    marginBottom:8,
  },

  input:{
    height:50,
    borderWidth:1,
    borderColor:Colors.theme.border,
    borderRadius:12,
    paddingHorizontal:14,
    backgroundColor:Colors.theme.surface,
    color:Colors.theme.text,
  },

  multiline:{
    height:120,
    textAlignVertical:'top',
    paddingTop:14,
  }

});