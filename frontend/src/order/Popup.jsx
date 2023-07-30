import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PopupPostCode from './PopupPostCode';

const Popup = (props) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = (fullAddress) => {
    setIsPopupOpen(false);
    props.onClose(fullAddress);
  };

  return (
    <>
      <button type="button" onClick={openPostCode}>
        우편번호 검색
      </button>
      <Modal show={isPopupOpen}>
        {/*  팝업 생성 기준 div */}
        <PopupPostCode onClose={closePostCode} />
      </Modal>
    </>
  );
};

export default Popup;
