import s from "./RecommendedUsers.module.scss";
import React from "react";
import Card from "../Card/Card";
import FollowCard from "../FollowCard/FollowCard";
import { fetchRecommendedUsers } from "../../api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function RecommendedUsers() {
  const [users, setUsers] = useState(null);
  const me = useSelector((state) => state.user);

  const getRecommendedUsers = async () => {
    const users = await fetchRecommendedUsers(me?.id);

    setUsers(users);
  };

  useEffect(() => {
    getRecommendedUsers();
  }, [me]);

  return (
    <Card>
      <header className={s.cardHeader}>
        <h3>Who to Follow?</h3>
      </header>

      <div className={s.cardBody}>
        {users && users.map((user) => <FollowCard key={user.id} user={user} />)}
      </div>

      <footer className={s.cardFooter}></footer>
    </Card>
  );
}

export default RecommendedUsers;
