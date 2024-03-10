import React from "react";
import './index.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoad = ({ posts }) => {
  return Array(posts)
    .fill(0)
    .map((post, i) => (
      <div className="skeleton-loading" key={i}>
        <div className="post-skeleton">
          <div className="post-skeleton-info">
            <p className="post-skeleton-username">   <Skeleton /> </p>
            <p className="post-skeleton-title"> <Skeleton /> </p>
            <p className="post-skeleton-description"> <Skeleton /> </p>
          </div>
       
        </div>
      </div>
    ));
};

export default SkeletonLoad;
