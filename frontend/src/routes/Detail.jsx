import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import greater from '../img/greater-than.svg';
import { addItem } from '../store';
import DetailOption from './DetailOption';
import './detail.scss';

const Detail = ({ data, title, type }) => {
  const { id } = useParams();
  const [optionMap, setOptionMap] = useState({});

  // 아이템에서 ID 찾기
  const selectItem = data.find((item) => item.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const options = Object.values(optionMap);
    for (const option of options) {
      const item = {
        id,
        type,
        name: `${selectItem.name} (${option.value})`,
        option,
      };
      dispatch(addItem(item));
    }
    alert('장바구니에 추가되었습니다.');
    navigate('/cart');
  };

  return (
    <>
      <Container>
        <ol className="path">
          <li>
            <a href="/">홈</a>
          </li>
          <img src={greater} class="greater" width="10pt" />
          <li>
            <a href="../">{title}</a>
          </li>
          <img src={greater} class="greater" width="10pt" />
          <li>
            <a href="#">{selectItem.name}</a>
          </li>
        </ol>
      </Container>
      <main class="detail">
        <div className="container2">
          <div className="flowerImage">
            <img src={selectItem.imageURL} />
          </div>
          <div class="all">
            <p className="flowerName">{selectItem.name}</p>
            <div>
              <strong class="price title-t">판매가</strong>
              {selectItem.price?.toLocaleString()}원
            </div>
            <div class="deliBox">
              <strong class="delivery title-t">배송</strong>
              <span class="free">무료배송</span>
            </div>
            <div class="contents2">
              <span class="arrive">1~2일 이내 도착 예정</span>
              <p class="arrive">최소 주문 수량 1개 이상</p>
            </div>
            <DetailOption
              name={selectItem.name}
              price={selectItem.price}
              optionMap={optionMap}
              setOptionMap={setOptionMap}
            />

            <p />
            <div class="Purchase">
              <button id="buyBtn" onClick={handleAddToCart}>
                구매하기
              </button>
              <button id="cartBtn" onClick={handleAddToCart}>
                장바구니
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Detail;
