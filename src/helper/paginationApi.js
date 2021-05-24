import axios from 'axios'

const  fetchToken = (endpoint, data, method = "GET")=>{
  const url = `${endpoint}`;

  if(method === 'GET'){
    return axios(url);
  }else{
    return axios(url,{
      method,
      data
    });
  } 
}

export {fetchToken}