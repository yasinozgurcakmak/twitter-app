import React from "react";
import s from "./TweetCard.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  deleteLikeTwitAction,
  postLikeTwitAction,
} from "../../store/actionCreators";
import {
  FaRetweet,
  FaRegCommentDots,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { getImageURL } from "../../utils";

import Button from "../Button/Button";
import Card from "../Card/Card";
import Image from "../Image/Image";

function TweetCard({ twit, onLike = () => null, onReplyClick = () => null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = twit.attributes.user.data;
  const profilePhoto = user.attributes?.photo?.data?.attributes;
  const likes = twit.attributes.likes.data;
  const replies = twit.attributes.replies.data;
  const picture = twit.attributes.picture.data;
  const me = useSelector((state) => state.user);
  const isAuthendicated = !!me;
  const isLikeByMe = useSelector(
    ({ twitsLikedByMe }) =>
      twitsLikedByMe &&
      !!twitsLikedByMe.find((likedTwit) => likedTwit.id === twit.id)
  ); 
  const like = async () => {
    const likeData = { twit: twit.id, user: me.id };

    await dispatch(postLikeTwitAction(likeData));
  };

  const dislike = async () => {
    await dispatch(deleteLikeTwitAction(twit.id, me.id));
  };

  const likeHandler = async () => {
    if (!isAuthendicated) {
      return navigate("/login");
    }

    if (isLikeByMe) {
      await dislike();
    } else {
      await like();
    }

    onLike();
  };
  const replyHandler = async () => {
    if (!isAuthendicated) {
      return navigate("/login");
    }
    return onReplyClick(); 
  };

  const goToDetails = () => {
    navigate(`/${twit.id}`);
  };

  return (
    <Card padding hoverable onClick={goToDetails}>
      <Link
        to={`/profile/${user.id}`}
        className={s.userLink}
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={getImageURL(profilePhoto)} alt="profile" size="small" />
        <p className={s.userText}>
          {user && user.attributes.username}{" "}
          <span className={s.emailText}>{user && user.attributes.email}</span>
        </p>
      </Link>
      <p className={s.twitText}> {twit && twit.attributes.text} </p>
      <div className={s.pictureWrapper}>
        {picture && (
          <div className={s.pictureWrapper}>
            <Image
              src={getImageURL(picture.attributes)}
              alt={picture.attributes.name}
              variant="rectangle"
              border={false}
              size="large"
              block
            />
          </div>
        )} 
      </div>
      <div className={s.actionsWrapper}>
        <Button
          icon={isLikeByMe ? <FaHeart /> : <FaRegHeart />}
          onClick={likeHandler}
          bubbling={false}
          color="primary"
          variant="regular"
        >
          {likes.length || "0"}
        </Button>
        <Button
          icon={<FaRegCommentDots />}
          bubbling={false}
          onClick={replyHandler}
          color="primary"
          variant="regular"
        >
          {replies.length || "0"}{" "}
        </Button>
        <Button
          icon={<FaRetweet />}
          color="primary"
          variant="regular"
          bubbling={false}
        >
          0
        </Button>
      </div>
    </Card>
  );
}

export default TweetCard;
