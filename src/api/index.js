import axios from "axios";
import { BASE_URL } from "../utils/constants";
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const addHeaders = (config) => {
  const token = localStorage.getItem("jwt");

  if (!token) return config;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

api.interceptors.request.use(addHeaders);

export default api;

// Utility API functions

export const fetchTwitDetails = async (twitId) => {
  const { data } = await api.get(
    `/twits/${twitId}?populate[0]=user.photo&populate[1]=likes&populate[2]=replies&populate[3]=picture`
  );

  return data;
};

export const fetchRepliesByTwitId = async (twitId) => {
  const { data } = await api.get(
    `/replies?filters[twit][id][$eq]=${twitId}&populate[0]=user.photo&populate[1]=reply_likes`
  );

  return data;
};

export const postReply = async (replyData) => {
  return api.post(`/replies`, { data: replyData });
};

export const postReplyLike = async (likeData) => {
  return api.post(`/reply-likes`, { data: likeData });
};

export const deleteReplyLike = async (replyLikeId) => {
  return api.delete(`/reply-likes/${replyLikeId}`);
};

export const findReplyLike = async (replyId, userId) => {
  const { data } = await api.get(
    `/reply-likes?filters[user][id][$eq]=${userId}&filters[reply][id][$eq]=${replyId}`
  );

  const replyLike = data.data[0];

  return replyLike;
};

export const fetchUserDetails = async (userId) => {
  const { data } = await api.get(`/users/${userId}?populate=*`);

  return data;
};

export const updateUserDetails = async (userId, userData) => {
  const { data } = await api.put(`/users/${userId}`, userData);

  return data;
};

export const uploadPhoto = async (formData) => {
  const { data } = await api.post(`/upload`, formData);
  return data;
};

export const fetchRecommendedUsers = async (filterId) => {
  const { data } = await api.get(
    `/users?start=0&limit=3&filters[id][$ne]=${filterId}&populate[0]=photo`
  );

  return data;
};

export const fetchMyFollowings = async (id) => {
  const { data } = await api.get(
    `/follows?populate[0]=user&populate[1]=following&filters[user][id][$eq]=${id}`
  );

  return data;
};

export const fetchMyFollowers = async (id) => {
  const { data } = await api.get(
    `/follows?populate[0]=user&populate[1]=following&filters[following][id][$eq]=${id}`
  );

  return data;
};

export const postFollow = async (followData) => {
  const { data } = await api.post(`/follows`, { data: followData });

  return data;
};

export const deleteFollow = async (followId) => {
  const { data } = await api.delete(`/follows/${followId}`);

  return data;
};

export const fetchProfileTwits = async (userId) => {
  const { data } = await api.get(
    `/twits?filters[user][id][$eq]=${userId}&populate[0]=user.photo&populate[1]=likes&populate[2]=replies&populate[3]=picture&sort[0]=createdAt:desc`
  );

  return data;
};

export const fetchProfileReplies = async (userId) => {
  const { data } = await api.get(
    `/replies?filters[user][id][$eq]=${userId}&populate[0]=user.photo&populate[1]=reply_likes`
  );

  return data;
};
