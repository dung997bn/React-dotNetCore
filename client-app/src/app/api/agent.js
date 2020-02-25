import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = response => response.data;

const sleep = ms => response =>
  new Promise(resolve => setTimeout(() => resolve(response), ms));

const request = {
  get: url =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url, body) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url, body) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  delete: url =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: () => request.get('/activity'),
  details: Id => request.get(`activity/${Id}`),
  create: activity => request.post('/activity', activity),
  update: activity => request.put(`/activity/${activity.Id}`, activity),
  delete: Id => request.delete(`activity/${Id}`)
};

export default Activities;
