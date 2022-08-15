import s from "./SideContent.module.scss";
import RecommendedUsers from "../../components/RecommendedUsers/RecommendedUsers";
import React from "react";

function SideContent() {
  return (
    <div className={s.contentWrapper}>
      <div className={s.recommendedWrapper}>
        <RecommendedUsers />
      </div>
    </div>
  );
}

export default SideContent;
