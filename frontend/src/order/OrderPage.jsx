import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import './orderPage.scss';

function OrderPage() {
  // Redux store 가져오기
  const state = useSelector((state) => state);
  const user = state.user.data;
  const dispatch = useDispatch(); // Store.js로 요청 보내주는 함수
  const allItems = [...state.cart.basket, ...state.cart.bouquet];
  const navigate = useNavigate();

  // 구매 정보를 담을 상태 설정
  const [address, setAddress] = useState('');
  const [anyInquiries, setAnyInquiries] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const urlEncodedData = new URLSearchParams(formData).toString();
    axios
      .post('/api/order', urlEncodedData)
      .then((response) => {
        console.log(response.data);

        alert('구매가 완료되었습니다!');
        navigate('/'); // 홈으로 이동
      })
      .catch((error) => {
        console.error('Failed to fetch user name:', error);
      });
  };

  const onClose = (fullAddress) => {
    setAddress(fullAddress);
  };
  const totalPrice = allItems.reduce((sum, item) => {
    return sum + item.option.price * (item.option.count ?? 0);
  }, 0);

  return (
    <>
      <div className="orderForm">
        <h1>구매하기</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th className="image"></th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, i) => (
                <tr key={i}>
                  <td>
                    <img src={item.imageURL} alt={item.name} name="imgSize" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {(
                      item.option.price * item.option.count ?? 0
                    ).toLocaleString()}
                    원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="orderBox gap">
            <div class="personalInfo gap">
              <div class="personalInfo title">주문자 정보</div>
              <div class="personalInfo name">{user?.mb_name}</div>
              <div class="personalInfo email">{user?.email}</div>
            </div>
            <div className="addressBox">
              <label htmlFor="address">주소: </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Popup onClose={onClose} />
            </div>
            <div>
              <label htmlFor="phoneNumber">연락처: </label>
              <input
                type="text"
                placeholder="ex) 010-****-****"
                name="phoneNumber"
                required
              />
            </div>
            <div>
              <label htmlFor="anyInquiries">요청사항: </label>
              <input
                type="text"
                name="anyInquiries"
                placeholder="ex) 꽃다발 포장지 색깔 흰색으로 해주세요."
                value={anyInquiries}
                onChange={(e) => setAnyInquiries(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="totalBtnBox">
            <div id="totalPriceOrder">
              총 결제금액 {totalPrice.toLocaleString()}
              <div id="deliveryFree">(배송비: 무료)</div>
            </div>
            <button type="submit">구매하기</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default OrderPage;
