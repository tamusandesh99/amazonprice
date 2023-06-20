import React from "react";
import './SearchComponent.scss'

const SearchComponent = () => {
  return (
    <>
      <div class="full-page">
        <div className="search-component">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button"> Send
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
