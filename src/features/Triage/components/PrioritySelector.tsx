import React from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import Box from '../../../components/Global/Box';
import Colors from '../../../constants/colors';


interface Props {
  value:number|null;
  onChange:(value:number)=>void;
}


const priorities=[
  {
    id:1,
    title:'Critical',
    color:Colors.theme.critical,
    bg:Colors.theme.criticalLight
  },
  {
    id:2,
    title:'Urgent',
    color:Colors.theme.urgent,
    bg:Colors.theme.urgentLight
  },
  {
    id:3,
    title:'Moderate',
    color:Colors.theme.moderate,
    bg:Colors.theme.moderateLight
  },
  {
    id:4,
    title:'Stable',
    color:Colors.theme.stable,
    bg:Colors.theme.stableLight
  },
  {
    id:5,
    title:'Minor',
    color:Colors.theme.minor,
    bg:Colors.theme.minorLight
  },
];


export default function PrioritySelector({
  value,
  onChange,
}:Props){

return (

<Box>

<Text style={styles.title}>
Priority Level
</Text>


<Box row style={styles.container}>

{
priorities.map(item=>(

<Pressable
key={item.id}
onPress={()=>onChange(item.id)}
>

<Box
padding={12}
radius={10}
backgroundColor={
value===item.id
? item.bg
: Colors.theme.surface
}
style={{
borderWidth: value===item.id ? 2 : 1,
borderColor:item.color
}}
>

<Text
style={{
color:item.color,
fontWeight:'700'
}}
>
{item.id}
</Text>

</Box>

</Pressable>

))
}

</Box>

</Box>

)

}


const styles=StyleSheet.create({

title:{
fontSize:16,
fontWeight:'700',
marginBottom:10,
color:Colors.theme.text
},

container:{
gap:8
}

});