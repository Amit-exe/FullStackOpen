import axios from "axios";
const baseUrl = "/api/user/login";

const Login = async (creds) => {
  const request = await axios.post(baseUrl, creds);
  console.log(request.status);

  if (request.status === 200) {
    return request.data;
  }
};

export default { Login };
