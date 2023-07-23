import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import greater from "../img/greater-than.svg";
import DetailOption from "./DetailOption";
import "./detail.scss";

// 장바구니 버튼
function init() {
  const btns = document.querySelectorAll("#cartBtn");

  for (let btn of btns) {
    btn.addEventListener("click", handleCartBtn);
  }

  function handleCartBtn(event) {
    event.preventDefault(); // 버튼 클릭시 페이지 제일 상단으로 올라가는 것 방지
    alert("장바구니에 추가되었습니다.");
  }
}

//

const handleOnChange = (e) => {
  const values = e.target.value;
  // 선택된 데이터 가져오기
};

const PlantDetail = ({ plant }) => {
  const { id } = useParams();
  // 데이터 삭제
  const [optionList, setOptionList] = useState([]);
  const handleRemoveOption = (index) => {
    const newList = optionList.filter((_, i) => i !== index);
    setOptionList(newList);
  };

  // item에서 id 찾기
  const selectItem = plant?.find((item) => {
    return item.id == id;
  });
  useEffect(init, []);

  return (
    <>
      <Container>
        <ol className="path">
          <li>
            <a href="연결" />홈
          </li>
          <img src={greater} class="greater" width="10pt" />
          <li>
            <a href="연결" />
            식물
          </li>
          <img src={greater} class="greater" width="10pt" />
          <li>
            <a href="연결" />
            {selectItem.name}
          </li>
        </ol>
      </Container>
      <main class="detail">
        <div className="container2">
          <div className="flowerImage">
            <img src={selectItem.image} />
          </div>
          <div class="all">
            <div>
              <p className="flowerName">{selectItem.name}</p>
              <strong class="price title-t">판매가</strong>
              <span>{selectItem.price?.toLocaleString()}원</span>
              <div class="deliBox">
                <strong class="delivery title-t">배송</strong>
                <span class="free">무료배송</span>
              </div>
              <div class="contents2">
                <span class="arrive"> 1~2일 이내 도착 예정</span>
                <p class="arrive"> 최소 주문 수량 1개 이상</p>
              </div>
              <DetailOption name={selectItem.name} />
              <div class="moneyBox">
                <strong class="money title-t">TOTAL</strong>
                <span class="money">0원</span>
              </div>
              <p />
              <div class="Purchase">
                <button
                  id="buyBtn"
                  onClick={() =>
                    (window.location.href = "https://www.apple.com/kr/")
                  }
                >
                  BUY IT NOW
                </button>
                <button
                  id="cartBtn"
                  onClick={() => (window.location.href = "")}
                >
                  CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PlantDetail;
