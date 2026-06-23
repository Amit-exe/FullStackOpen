import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = (data) => {
  console.log(token);

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, data, config);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  console.log(token);

  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, createBlog, setToken, deleteBlog };
