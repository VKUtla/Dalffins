//Author: Jay Patel (B00881906)
//All the apis and axios configuration
const axios = require("axios");

const port = process.env.PORT || 8080;

const backEndUrl =
  process.env.REACT_APP_BACKEND_HOSTNAME || "https://dalffins.herokuapp.com";

const domain = `${backEndUrl}`;

const axiosInstance = axios.create({
  baseURL: domain,
});

export function fetchTicketsApi(data) {
  return axiosInstance.get(`/help/tickets`, data);
}

export function fetchAllTicketsApi() {
  return axiosInstance.get(`/help/admin/tickets`);
}

export function updateTicketApi(ticket) {
  return axiosInstance.put(`/help/tickets/${ticket._id}`, ticket);
}

export function saveTicketApi(data) {
  return axiosInstance.post(`/help/tickets`, data);
}

// sign up call
export function saveUser(data, header) {
  return axiosInstance.post(`/user/signUp`, data, header);
}

// login call
export function validateLogin(data, header) {
  return axiosInstance.post(`/user/login`, data, header);
}

// fetch user profile call
export function fetchUserProfile(userId, header) {
  return axiosInstance.get(`/user/userProfile/${userId}`, header);
}

// update profile details call
export function updateUserProfile(userId, data, header) {
  return axiosInstance.put(`/user/updateProfile/${userId}`, data, header);
}

// delete user profile call
export function deleteUserProfile(userId) {
  return axiosInstance.delete(`/user/deleteProfile/${userId}`);
}

// check email existence call
export function emailCheck(data, header) {
  return axiosInstance.post(`/user/emailCheck`, data, header);
}

// reset password call
export function resetPassword(data, header) {
  return axiosInstance.put(`/user/resetPassword`, data, header);
}

export function saveReviewApi(data) {
  return axiosInstance.post(`/rating/review`, data);
}
