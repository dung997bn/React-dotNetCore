import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  const { status } = error.response;
  if (status === 404) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error('Server error-check terminal  for more info.')
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => request.get("/activity"),
  details: (Id: string): Promise<IActivity> => request.get(`/activity/${Id}`),
  create: (activity: IActivity) => request.post("/activity", activity),
  update: (activity: IActivity) =>
    request.put(`/activity/${activity.Id}`, activity),
  delete: (Id: string) => request.del(`/activity/${Id}`)
};

export default { Activities };
