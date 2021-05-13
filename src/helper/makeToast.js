import Vue from 'vue';
const makeToast = (data)=>{
  const {msg,title,variant,solid} = data
  const vm = new Vue()
  return vm.$bvToast.toast(msg, {
    title,
    variant,
    solid,
  });
}

export {makeToast}