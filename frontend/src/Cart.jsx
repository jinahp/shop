import React from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, increase, decrease } from './store';

function Cart() {
  // Redux store 가져오기
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch(); // Store.js로 요청 보내주는 함수
  const allItems = [...state.basket, ...state.bouquet];

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
      </thead>
      <tbody>
        {allItems.map((item, i) => (
          <tr key={item.id}>
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.option.count ?? 0}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(increase(item));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (item.option.count > 0) {
                    dispatch(decrease(item));
                  }
                }}
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Cart;
