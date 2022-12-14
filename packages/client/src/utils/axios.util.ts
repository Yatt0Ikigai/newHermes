import Axios, { CancelToken } from "axios";

const server = "http://localhost:8080";
export function getRequest(URL:string, cancelToken?: CancelToken){
    return Axios.get(`${server}/${URL}`,{withCredentials:true, cancelToken}).then(response => response);
  }
  
  export function postRequest(URL:string, payload:any) {
    return Axios.post(`${server}/${URL}`, payload, {withCredentials:true}).then(response => response);
  }
  
  export function patchRequest(URL:string, payload:any) {
    return Axios.patch(`${server}/${URL}`, payload,{withCredentials:true}).then(response => response);
  }

  export function putRequest(URL:string, payload:any) {
    return Axios.put(`${server}/${URL}`, payload,{withCredentials:true}).then(response => response);
  }
  
  export function deleteRequest(URL) {
    return Axios.delete(`${server}/${URL}`,{withCredentials:true}).then(response => response);
  }