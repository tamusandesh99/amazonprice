import React from "react";
import './index.scss'
import Skeleton from "react-loading-skeleton";

const SkeletonLoad = ({ posts }) => {
  // return Array(posts)
  //   .fill(0)
  //   .map((post, i) => (
  //     <div className="skeleton-loading" key={i}>
  //       <div className="post-skeleton">
  //         <div className="post-info">
  //           <p className="post-username">username </p>
  //           <p className="post-username">date</p>
  //           <p className="post-title">title</p>
  //           <p className="post-description">description</p>
  //           <div className="post-likes-comments">

  //           </div>
  //         </div>
  //         <Skeleton />
  //       </div>
  //     </div>
  //   ));

  return (
    <div className="skeleton-loading">
      <div className="post-skeleton">
        <div className="post-info">
          <p className="post-username">username </p>
          <p className="post-username">date</p>
          <p className="post-title">title</p>
          <p className="post-description">description</p>
          <div className="post-likes-comments"></div>
        </div>
        <Skeleton />
      </div>
      <div className="post-skeleton">
        <div className="post-info">
          <p className="post-username">username </p>
          <p className="post-username">date</p>
          <p className="post-title">title</p>
          <p className="post-description">description</p>
          <div className="post-likes-comments"></div>
        </div>
        <Skeleton />
      </div>
      <div className="post-skeleton">
        <div className="post-info">
          <p className="post-username">username </p>
          <p className="post-username">date</p>
          <p className="post-title">title</p>
          <p className="post-description">description</p>
          <div className="post-likes-comments"></div>
        </div>
        <Skeleton />
      </div>
      <div className="post-skeleton">
        <div className="post-info">
          <p className="post-username">username </p>
          <p className="post-username">date</p>
          <p className="post-title">title</p>
          <p className="post-description">description</p>
          <div className="post-likes-comments"></div>
        </div>
        <Skeleton />
      </div>
    </div>
  );
};

export default SkeletonLoad;
