import React from "react";
import "./loginForm.scss";

function LoginForm() {
  return (
    <div id="LoginForm" className="container mt-5">
      <div className="tab-content">
        <h1>로그인</h1>
        <form id="loginBox" method="POST" action="./result.html">
          <div id="inputBox">
            {/* 이메일 입력 */}
            <div className="input-form-box">
              <span>이메일</span>
              <input
                type="text"
                name="emailtrue"
                className="form-control oneCtr"
                placeholder="이메일을 입력해주세요."
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="input-form-box">
              <span>비밀번호</span>
              <input
                type="password"
                name="pw"
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
