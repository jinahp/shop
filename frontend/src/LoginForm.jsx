import axios from 'axios';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './loginForm.scss';
import { login } from './store';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      // Convert the FormData to URL-encoded string
      const urlEncodedData = new URLSearchParams(formData).toString();

      axios
        .post('/api/users/login', urlEncodedData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => {
          console.log(response.data);
          alert('로그인 되었습니다!');
          dispatch(login(response.data));
          navigate('/');
        })
        .catch((error) => {
          console.error('로그인 오류:', error);
          alert('로그인 중 오류가 발생했습니다.');
        });
    },
    [navigate]
  );

  return (
    <div id="LoginForm" className="container">
      <div className="tab-content">
        <h1>로그인</h1>
        <form id="loginBox" onSubmit={onSubmit}>
          <div id="inputBox">
            {/* 이메일 입력 */}
            <div className="input-form-box">
              <span>이메일</span>
              <input
                type="text"
                name="email"
                className="form-control oneCtr"
                placeholder="이메일을 입력해주세요."
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="input-form-box">
              <span>비밀번호</span>
              <input
                type="password"
                name="password"
                className="form-control twoCtr"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>

            {/* 로그인 버튼 */}
            <div className="button-login-box">
              <button type="submit" className="loginBtn">
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
