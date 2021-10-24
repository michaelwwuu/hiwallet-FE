import { axios } from '../libs/axios/api.request'

// 登录
export const login = data => {
  const postData = {
    url: '/sso/login',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 註冊
export const register = data => {
  const postData = {
    url: '/sso/register',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 用户信息
export const getUserInfo = (params) => {
  const postData = {
    url: '/member/profile/my',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 搜尋用戶聊天內容
export const getSearchData = (params) => {
  const postData = {
    url: '/member/profile/search',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 搜尋聊天室內
export const getSearchChat = (params) => {
  const postData = {
    url: 'chatroom/searchByName',
    method: 'get',
    params
  }
  return axios.request(postData)
}
