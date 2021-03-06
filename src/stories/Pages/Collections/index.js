import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import CollectionCard from "../../CollectionCard/CardSimple";
import SearchSimple from "../../CommonWidgets/Search/SearchSimple";
import Header from "../../CommonWidgets/Header";
import { fetchRecommendCollections } from "../../../services/recommend";
import { fetchSearchCollection } from "../../../services/search";

import styles from "./collection.module.css";
import data from "../../mock/collections.json";

const Collections = () => {
  const [collections, setcollections] = useState(data.list);
  const breakpointCols = {
    default: 3,
    // 1620: 3,
    1300: 2,
    860: 1,
    // 1200: 2,
    // 800: 1,
  };

  useEffect(() => {
    fetchRecommendCollections({})
      .then((data) => {
        setcollections(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (keyword) => {
    fetchSearchCollection({ keyword, type: "collection" })
      .then((data) => {
        setcollections(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.searchbox}>
        <SearchSimple
          placeholder="出发! 去那个星球"
          handleSearch={handleSearch}
        />
      </div>
      <div>+热门星球</div>
      <Masonry
        breakpointCols={breakpointCols}
        // breakpointCols={4}
        className={styles.masonry}
        columnClassName={styles.col}
      >
        {collections.map((info) => (
          <CollectionCard key={info.collectionId} cardInfo={info} />
        ))}
      </Masonry>
    </div>
  );
};

export default Collections;
