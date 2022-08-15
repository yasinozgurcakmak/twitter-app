import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TweetCard from "../../components/TweetCard/TweetCard";
import TweetForm from "../../components/TweetForm/TweetForm";
import s from "./Home.module.scss";
import Modal from "../../components/Modal/Modal";
import ReplyForm from "../../components/ReplyForm/ReplyForm";

function Home() {
  const twits = useSelector((state) => state.twits);
  const isAuthenticated = useSelector((state) => !!state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTwit,setSelectedTwit] = useState(null)
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const replyTwit =(twitId)=>{
    setSelectedTwit(twitId)
    openModal()
  }
  return (
    <div>
      {isAuthenticated && (
        <div className={s.formWrapper}>
          <TweetForm />
        </div>
      )}
      {twits && (
        <div className={s.feedWrapper}>
          {twits.map((twit) => (
            <TweetCard
              key={twit.id}
              twit={twit}
              onReplyClick={()=>{replyTwit(twit.id)}}
            />
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ReplyForm onCancel={closeModal} twitId={selectedTwit} onSuccess={closeModal}/>
      </Modal>
    </div>
  );
}

export default Home;
