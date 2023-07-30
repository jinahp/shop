import React from 'react';
import { CloseButton, Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    props.onClose(fullAddress);
  };

  const postCodeStyle = {
    display: 'block',
    // position: 'absolute',
    top: '10%',
    width: '100%',
    height: '600px',
    padding: '7px',
  };

  return (
    <>
      <Modal.Body id="postBox">
        <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="closeBtn"
        >
          닫기
        </button>
      </Modal.Footer>
    </>
  );
};

export default PopupPostCode;
