import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './cart.scss';
import { decrease, increase } from './store';

function Cart() {
  // Redux store 가져오기
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Store.js로 요청 보내주는 함수
  const allItems = [...state.basket, ...state.bouquet];
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate('/order');
  };

  const totalPrice = allItems.reduce((sum, item) => {
    return sum + item.option.price * (item.option.count ?? 0);
  }, 0);

  return (
    <>
      <h1 id="cartTitle">장바구니</h1>
      <Table className="cartForm">
        <thead>
          <tr>
            <th>#</th>
            <th id="tdImg">상품이미지</th>
            <th id="thSpace">상품명</th>
            <th>수량</th>
            <th>수량변경</th>
            <th id="thPrice">가격</th>
          </tr>
        </thead>
        <tbody>
          {allItems.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={item.imageURL}
                  id="imgSize"
                  style={{ width: '100px' }} // Adjust width and height as needed
                />
              </td>
              <td>{item.name}</td>
              <td>{item.option.count ?? 0}</td>
              <td>
                <button
                  id="increaseBtn"
                  onClick={() => {
                    dispatch(increase(item));
                  }}
                >
                  +
                </button>
                <button
                  id="decreaseBtn"
                  onClick={() => {
                    if (item.option.count > 0) {
                      dispatch(decrease(item));
                    }
                  }}
                >
                  -
                </button>
              </td>
              <td>
                {(item.option.price * item.option.count ?? 0).toLocaleString()}
                원
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <td colSpan="6" id="totalPrice">
            총 결제금액 {totalPrice.toLocaleString()}원
            <button id="buyButton" onClick={handleOrder}>
              구매하기
            </button>
          </td>
        </tfoot>
      </Table>
    </>
  );
}

export default Cart;
