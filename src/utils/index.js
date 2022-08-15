import { BASE_URL } from "./constants";
import genericProfileIMG from "../assets/images/generic-user-photo.png";
import defaultCoverImg from "../assets/images/default-cover-photo-twitter.jpg";

const defaultImgs = {
  cover: defaultCoverImg,
  profile: genericProfileIMG,
};

export function getImageURL(image, type = "profile") {
  if (!image || !image.url) {
    return defaultImgs[type];
  }
  return `${BASE_URL}${image.url}`;
}
