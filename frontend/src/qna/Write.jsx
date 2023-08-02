import axios from 'axios';
import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './Write.scss';

function Write() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      axios
        .post('/api/dao', formData)
        .then((response) => {
          console.log(response.data);
          alert('질문이 성공적으로 제출되었습니다!');
          // 폼 제출 성공 후, BoardList 컴포넌트로 자동으로 이동
          navigate('/qna');
        })
        .catch((error) => {
          console.error('질문 제출 오류:', error);
          alert('질문 제출 중 오류가 발생했습니다.');
        });
    },
    [navigate]
  );

  const onButton = useCallback(
    (event) => {
      event.preventDefault();

      navigate('/qna');
    },
    [navigate]
  );

  return (
    <div className="writeBox">
      <h1>글쓰기</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group
          className="mb-3 writeForm"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>제목</Form.Label>
          <Form.Control name="title" placeholder="제목" />
        </Form.Group>
        <Form.Group
          className="mb-3 writeForm"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>작성자</Form.Label>
          <Form.Control name="writer" placeholder="작성자" />
        </Form.Group>
        <Form.Group
          className="mb-3 writeForm"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>내용</Form.Label>
          <Form.Control name="content" as="textarea" placeholder="내용" />
        </Form.Group>
        <div className="writeButtons">
          <button type="submit">작성완료</button>
          <button type="reset">취소</button>
          <button type="button" onClick={onButton}>
            목록
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Write;
