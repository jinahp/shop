import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './View.scss';

function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const onButton = useCallback(() => {
    navigate('/qna');
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`/api/dao/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('데이터 불러오기 오류:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      });
  }, [id]);

  return (
    <div className="viewBox">
      <h1>작성글 보기</h1>
      <table className="table">
        <tbody>
          <tr>
            <td class="titleBold">제목</td>
            <td>{formData.title}</td>
          </tr>
          <tr>
            <td class="titleBold">작성자</td>
            <td>{formData.writer}</td>
          </tr>
          <tr>
            <td class="titleBold">내용</td>
            <td>{formData.content}</td>
          </tr>
        </tbody>
      </table>
      <div className="viewButtons">
        <button type="button" onClick={() => navigate(`/update/${id}`)}>
          수정
        </button>
        <button type="button" onClick={onButton}>
          목록
        </button>
      </div>
    </div>
  );
}

export default View;
