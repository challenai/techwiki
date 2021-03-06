import React from "react";
import styles from "./animated.module.css";

import Card from "../CommonWidgets/Card/Card";
import CardHeader from "../CommonWidgets/CardHeader";
import MoreBtn from "../CommonWidgets/Menu/MoreBtn";
import { CardContentViewMarked } from "../CommonWidgets/CardContent";
import FragFooterAnimated from "../CommonWidgets/FragFooterAnimated";

const CardAnimated = ({ cardInfo, setCardInfo }) => {
  const toggleLike = () =>
    setCardInfo({ ...cardInfo, isLiked: !cardInfo.isLiked });
  const toggleCollect = () =>
    setCardInfo({ ...cardInfo, isCollected: !cardInfo.isCollected });
  const menuList = [
    {
      name: "收藏到",
      fn: () => console.log("收藏到"),
    },
    {
      name: "举报",
      fn: () => console.log("举报"),
    },
  ];
  return (
    <Card
      boxStyles={{
        boxSizing: "border-box",
        padding: "44px 46px 42px",
      }}
    >
      <div className={styles.headerrow}>
        <CardHeader boxStyles={{}} title={cardInfo.topicName} />
        <MoreBtn menuList={menuList} />
      </div>
      <CardContentViewMarked
        boxStyles={{ marginTop: 27 }}
        content={cardInfo.content}
      />
      <FragFooterAnimated
        boxStyles={{ marginTop: 60 }}
        infos={cardInfo}
        toggleLike={toggleLike}
        toggleCollect={toggleCollect}
      />
    </Card>
  );
};

export default CardAnimated;
