import React from 'react';
import { Link } from 'react-router-dom';
import './searchResult.scss';

function SearchResult({ searchResults }) {
  return (
    <div id="search-result" className="row">
      <h1>검색 결과</h1>
      {searchResults.map((item) => (
        <Link
          to={`/bouquet/detail/${item.id}`}
          key={item.id}
          className="col-md-4"
        >
          <div>
            <img
              src={item.imageURL}
              className="flower"
              alt={item.class + '.jpg'}
              width="50%"
            />
          </div>
          <div id="name">{item.name}</div>
          <div>{item.content}</div>
          <div id="listPrice">{item.price.toLocaleString()}원</div>
          <span id="delivery">무료배송</span>
        </Link>
      ))}
    </div>
  );
}

export default SearchResult;
