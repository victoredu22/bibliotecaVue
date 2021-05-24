<template>
    <div>
      <p>Soy el datepicker curso</p>
      <DatePicker v-model='data'  @dayclick="onDayClick" />

    </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'


export default {
  components:{
    DatePicker
  },
  data:()=>({
      data: new Date()
  }),
  methods:{
     onDayClick(day) {
       console.log(day);
       
     }
  }
}
</script>