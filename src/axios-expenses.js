import Axios from 'axios';

const Instance = Axios.create({
  baseURL: 'https://tada-c9999.firebaseio.com/'
});

export default Instance;
