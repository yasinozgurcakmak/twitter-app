import s from "./TweetDetails.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTwitDetails, fetchRepliesByTwitId } from "../../api";

import Modal from "../../components/Modal/Modal";
import TweetCard from "../../components/TweetCard/TweetCard";
import ReplyCard from "../../components/ReplyCard/ReplyCard";
import ReplyForm from "../../components/ReplyForm/ReplyForm";

function TwitDetails() {
  const { id } = useParams();
  const [twit, setTwit] = useState(null);
  const [replies, setReplies] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const fetchTwit = async () => {
    const data = await fetchTwitDetails(id);

    setTwit(data.data);
  };
  const fetchReplies = async () => {
    const data = await fetchRepliesByTwitId(id);
    setReplies(data.data);
  };

  const succesHandler = async () => {
    await fetchTwit();
    await fetchReplies();
    closeModal();
  };
  useEffect(() => {
    fetchTwit();
    fetchReplies();
  }, []);
  return (
    <div className={s.wrapper}>
      {twit && (
        <TweetCard twit={twit} onLike={fetchTwit} onReplyClick={openModal} />
      )}
      <div className={s.replyWrapper}>
        {replies &&
          replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} onLike={fetchReplies} />
          ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ReplyForm
          onCancel={closeModal}
          onSuccess={succesHandler} 
          twitId={id}
        />
      </Modal>
    </div>
  );
}

export default TwitDetails;
