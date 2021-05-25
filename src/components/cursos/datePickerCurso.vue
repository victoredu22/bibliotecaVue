<template>
    <div>
      <p>Soy el datepicker curso</p>
      <DatePicker v-model='data'  @dayclick="onDayClick" />

    </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import moment from "moment";
import {diaActual} from '../../helper/fechaSql';


export default {
  components:{
    DatePicker
  },
  data:()=>({
      data: new Date()
  }),
  methods:{
     onDayClick(day) {
       const {id} = day;
       console.log( diaActual());

       
       
     }
  }
}
</script>