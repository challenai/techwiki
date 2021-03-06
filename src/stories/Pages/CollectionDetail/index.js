import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import FragAdminCard from "../../FragAdminCard";
import SearchSimple from "../../CommonWidgets/Search/SearchSimple";
import { listFragmentsByCollectionId } from "../../../services/collection";
import { fetchSearchFragment } from "../../../services/search";
import styles from "./detail.module.css";
import FragSwitch from "../../CommonWidgets/FragSwitch";
import CollectionHeader from "../../CommonWidgets/CollectionHeader";

// import d from "../../mock/fragments.json";

const CollectionDetailPage = ({ match }) => {
  const [fragments, setfragments] = useState([]);
  useEffect(() => {
    listFragmentsByCollectionId({ collection_id: match.params.id })
      .then((data) => setfragments(data))
      .catch((err) => console.log(err));
  }, [match.params.id]);

  const handleSearch = (keyword) => {
    fetchSearchFragment({ keyword, type: "exp" })
      .then((data) => {
        setfragments(data);
      })
      .catch((err) => console.log(err));
  };

  const [switchInfo, setSwitch] = useState({
    topicId: "-1",
    show: false,
  });

  return (
    <div className={styles.page}>
      <CollectionHeader collectionId={match.params.id} />
      <div className={styles.searchbox}>
        <SearchSimple
          placeholder="出发! 去寻找碎片"
          handleSearch={handleSearch}
        />
      </div>
      <Masonry
        breakpointCols={3}
        className={styles.masonry}
        columnClassName={styles.col}
      >
        {fragments.map((info) => (
          <FragAdminCard
            key={info.fragmentId}
            cardInfo={info}
            setCardInfo={(info) => {
              fragments.forEach((el, idx) => {
                if (el.fragmentId === info.fragmentId) {
                  fragments[idx] = info;
                }
              });
              setfragments([...fragments]);
            }}
            handleSwitchExp={(topicId) => setSwitch({ topicId, show: true })}
          />
        ))}
      </Masonry>
      {switchInfo.show ? (
        <FragSwitch
          topicId={switchInfo.topicId}
          closeSwitch={() => setSwitch({ ...switchInfo, show: false })}
        />
      ) : null}
    </div>
  );
};

export default CollectionDetailPage;
