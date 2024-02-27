import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoad = ({posts}) => {
  console.log(posts)
  return Array(posts)
    .fill(0)
    .map((post, i) => (
      <div className="skeleton-loading" key ={i}>
        <div className="post-skeleton">
          <Skeleton />
        </div>
      </div>
    ));
};

export default SkeletonLoad;
