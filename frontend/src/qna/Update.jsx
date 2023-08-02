import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import './Update.scss';

function Update() {
  const navigate = useNavigate();
  const { id } = useParams(); // '/update/:id' 경로의 파라미터 처리
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // 수정된 데이터를 formData에 담아서 전송
      axios
        .put(`/api/dao/${id}`, formData)
        .then((response) => {
          console.log(response.data);
          alert('질문이 성공적으로 수정되었습니다!');
          // 폼 제출 성공 후, BoardList 컴포넌트로 자동으로 이동
          navigate('/qna');
        })
        .catch((error) => {
          console.error('질문 수정 오류:', error);
          alert('질문 수정 중 오류가 발생했습니다.');
        });
    },
    [navigate, id, formData]
  );

  const onButton = useCallback(() => {
    navigate('/qna');
  }, [navigate]);

  const fetchData = () => {
    // id에 해당하는 데이터를 불러와서 폼에 기존 내용을 채웁니다.
    axios
      .get(`/api/dao/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('데이터 불러오기 오류:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      });
  };

  useEffect(fetchData, [id]);

  const handleChange = (event) => {
    // 입력 폼 값이 변경될 때마다 formData를 업데이트합니다.
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="updateBox">
      <Form onSubmit={onSubmit} onReset={fetchData}>
        <Form.Group
          className="mb-3 updateForm"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="title"
            defaultValue={formData.title}
            onChange={handleChange}
            placeholder="제목"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 updateForm"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>작성자</Form.Label>
          <Form.Control
            name="writer"
            defaultValue={formData.writer}
            onChange={handleChange}
            placeholder="작성자"
          />
        </Form.Group>
        <Form.Group
          className="mb-3 updateForm"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="content"
            defaultValue={formData.content}
            onChange={handleChange}
            as="textarea"
            placeholder="내용"
          />
        </Form.Group>
        <div className="updateButtons">
          <button type="submit">수정완료</button>
          <button type="reset">취소</button>
          <button type="button" onClick={onButton}>
            목록
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Update;
