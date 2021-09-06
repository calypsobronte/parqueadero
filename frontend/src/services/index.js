const BASE_URL = process.env.VUE_APP_BASE_API;
import axios from 'axios';

const getDataApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/parqueadero`, {});
    return response.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

const createDataApi = async (item) => {
  try {
    
    const response = await axios.post(`${BASE_URL}/api/parqueadero`, item);
    return response.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

// Cambiar de estado para actualizar la fecha de salida
const updateDataApi = async (item) => {
  try {
    const placa = item.placa
    const response = await axios.put(`${BASE_URL}/api/parqueadero/state/${placa}`, item);
    return response.data;
  } catch (error) {
    return JSON.parse(error);
  }
};

// Cobrar por placa
const exitDataApi = async (item) => {
  try {
    const placa = item.placa
    const response = await axios.put(`${BASE_URL}/api/parqueadero/exit/${placa}`, item);
    return response.data;
    
  } catch (error) {
    return JSON.parse(error);
  }
}

// Cobrar por placa
const searchDataApi = async (item) => {
  try {
    const placa = item.placa
    const response = await axios.get(`${BASE_URL}/api/parqueadero/${placa}`, item);
    console.log(response);
    return response.data;
    
  } catch (error) {
    return JSON.parse(error);
  }
}

export {
	getDataApi,
	createDataApi,
  updateDataApi,
  exitDataApi,
  searchDataApi
}
