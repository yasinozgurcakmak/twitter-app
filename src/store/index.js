import { createStore, applyMiddleware } from "redux";
import {
  SET_TOKEN,
  SET_USER,
  SET_TWITS,
  SET_TWITS_LIKED_BY_ME,
  SET_REPLIES_LIKED_BY_ME,
  SET_MY_FOLLOWİNGS,
} from "./types";
import thunk from "redux-thunk";

const INITIAL_STATE = {
  token: null,
  user: null,
  twits: null,
  twitsLikedByMe: null,
  repliesLikedByMe: null,
  myFollowings:null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };

    case SET_USER:
      return { ...state, user: action.payload };
    case SET_TWITS:
      return { ...state, twits: action.payload };
    case SET_TWITS_LIKED_BY_ME:
      return { ...state, twitsLikedByMe: action.payload };
    case SET_REPLIES_LIKED_BY_ME:
      return { ...state, repliesLikedByMe: action.payload };
    case SET_MY_FOLLOWİNGS:
      return { ...state, myFollowings: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
