import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./signUpForm.scss";

function SignUpForm() {
  const formSchema = yup.object({
    name: yup
      .string()
      .min(2, "이름은 최소 2글자 이상입니다!")
      .max(10, "이름은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
        "이름에 숫자와 특수문자를 사용할 수 없습니다."
      )
      .required("이름을 입력해주세요"),
    email: yup
      .string()
      .required("이메일을 입력해주세요.")
      .email("이메일 형식이 아닙니다."),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="signUpForm">
      <div class="container">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" placeholder="이메일" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 확인해주세요."
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          <input name="name" placeholder="이름" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
          <input type="submit" disabled={!isEmpty(errors)} />
        </form>
      </div>
    </div>
  );
}

function isEmpty(param) {
  return Object.keys(param).length === 0;
}

export default SignUpForm;
