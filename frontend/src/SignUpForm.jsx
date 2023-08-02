import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './signUpForm.scss';
import axios from 'axios';

function SignUpForm() {
  const navigate = useNavigate();
  const formSchema = yup.object({
    name: yup
      .string()
      .min(2, '⚠️닉네임은 최소 2글자 이상입니다!')
      .max(10, '⚠️닉네임은 최대 10글자입니다!')
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        '⚠️닉네임에 숫자와 특수문자를 사용할 수 없습니다.'
      )
      .required('⚠️닉네임을 입력해주세요'),
    email: yup
      .string()
      .required('이메일을 입력해주세요.')
      .email('⚠️이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('⚠️영문, 숫자포함 8자리를 입력해주세요.')
      .min(8, '⚠️최소 8자 이상 가능합니다')
      .max(15, '⚠️최대 15자 까지만 가능합니다')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        '⚠️영문 숫자포함 8자리를 입력해주세요.'
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], '⚠️비밀번호가 다릅니다.'),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onSubmit = useCallback(
    (data) => {
      axios
        .post('/api/users', data)
        .then((response) => {
          console.log(response.data);
          alert('가입되었습니다!');
          // 폼 제출 성공 후, BoardList 컴포넌트로 자동으로 이동
          navigate('/');
        })
        .catch((error) => {
          console.error('회원가입 오류:', error);
          alert('회원가입 중 오류가 발생했습니다.');
        });
    },
    [navigate]
  );

  return (
    <div className="signUpForm">
      <div className="container">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" placeholder="이메일" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            {...register('password')}
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 확인해주세요."
            {...register('passwordConfirm')}
            required
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          <input
            name="name"
            placeholder="닉네임"
            {...register('name')}
            required
          />
          {errors.name && <p>{errors.name.message}</p>}
          <input type="submit" id="submitBtn" />
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
