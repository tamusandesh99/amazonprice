import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './SearchComponent.scss'

const SearchComponent = () => {
  return (
    <>
      <div class="full-page">
        <div className="search-component">
          <input type="text" placeholder="Enter the item name.." className="search-input" autoFocus/>
          <button className="search-button"> 
           <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};
 
export default SearchComponent;
