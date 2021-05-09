import axios from 'axios'

const baseUrl = process.env.VUE_APP_RUTA_API;

const fetchSinToken = (endpoint, data, method = "GET") =>{
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
		return axios(url);
	} else {
    return axios(url, {
			method,
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}


}

export {fetchSinToken}