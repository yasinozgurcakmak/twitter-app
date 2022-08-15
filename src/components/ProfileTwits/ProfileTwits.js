import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileTwits } from "../../api";
import TweetCard from "../TweetCard/TweetCard";
import s from "./ProfileTwits.module.scss";

function ProfileTwits() {
  const { userId } = useParams();
  const [twits, setTwits] = useState(null);

  const fetchTwits = async () => {
    const data = await fetchProfileTwits(userId);

    setTwits(data.data);
  };

  useEffect(() => {
    fetchTwits();
  }, [userId]);

  return twits && twits.length ? (
    <div className={s.twitsWrapper}>
      {twits.map((twit) => (
        <TweetCard key={twit.id} twit={twit} />
      ))}
    </div>
  ) : (
    <div>
      <h1>No Twits Yet</h1>
    </div>
  );
}

export default ProfileTwits;
