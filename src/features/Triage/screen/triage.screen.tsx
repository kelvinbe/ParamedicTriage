import React,{useState} from 'react';

import Box from '../../../components/Global/Box';

import PatientInput from '../components/PatientInput';
import PrioritySelector from '../components/PrioritySelector';
import StatusSelector from '../components/StatusSelector';
import SubmitButton from '../components/SubmitButton';


const TriageScreen=()=>{

const [name,setName]=useState('');
const [condition,setCondition]=useState('');

const [priority,setPriority]=useState<number|null>(null);

const [status,setStatus]=useState('');


return(

<Box
flex={1}
padding={20}
>

<PatientInput
label="Patient Name"
value={name}
onChangeText={setName}
/>


<PatientInput
label="Condition Description"
value={condition}
onChangeText={setCondition}
multiline
/>


<PrioritySelector
value={priority}
onChange={setPriority}
/>


<StatusSelector
value={status}
onChange={setStatus}
/>


<SubmitButton
onPress={()=>console.log({
name,
condition,
priority,
status
})}
/>


</Box>

)

}


export default TriageScreen;