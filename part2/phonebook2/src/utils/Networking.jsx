import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  return axios.get(baseURL);
};

const saveData = (data) => {
  return axios.post(baseURL, data);
};

const deletePerson = (id) => {
  console.log(id);
  
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, saveData, deletePerson };
