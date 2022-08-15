import React from "react";
import s from "./ReplyCard.module.scss";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postReplyLike } from "../../api";
import {
  postLikeReplyAction,
  deleteLikeReplyAction,
} from "../../store/actionCreators";
import Image from "../Image/Image";
import { getImageURL } from "../../utils";
function ReplyCard({ reply, onLike }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = reply.attributes.user.data;
  const likes = reply.attributes.reply_likes.data;
  const profilePhoto = user.attributes?.photo?.data?.attributes;
  const me = useSelector((state) => state.user);
  const isAuthenticated = !!me; 
  const isLikedByme = useSelector(
    ({ repliesLikedByMe }) =>
      repliesLikedByMe &&
      !!repliesLikedByMe.find((likedReply) => likedReply.id === reply.id)
  );

  const likeReply = async () => {
    const likeData = { reply: reply.id, user: me.id };
    return dispatch(postLikeReplyAction(likeData));
  };
  const unLikeReply = async () => {
    return dispatch(deleteLikeReplyAction(reply.id, me.id));
  };

  const likeHandler = async () => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
    if (isLikedByme) {
      await unLikeReply();
    } else {
      await likeReply();
    }
    onLike();
  };
  return (
    <Card padding>
      <Link to={`/profile/${user.id}`} className={s.useLink}>
        <Image src={getImageURL(profilePhoto)} alt="profile" border={false} size="small" />
        <p>
          {user.attributes.username} -
          <span className={s.emailText}>{user.attributes.email}</span>
        </p>
      </Link>
      <p className={s.replyText}>{reply.attributes.text}</p>
      <div>
        <Button
          icon={isLikedByme ? <FaHeart /> : <FaRegHeart />}
          color="primary"
          variant="regular"
          onClick={likeHandler}
        >
          {likes.length || 0}
        </Button>
      </div>
    </Card>
  );
}

export default ReplyCard;
