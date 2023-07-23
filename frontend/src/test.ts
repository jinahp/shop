import { boolean } from 'yup';

let 이름, 나이, 출생지역;
이름 = '박진아';
나이 = 32;
출생지역 = '충북';

let 좋아하는: { 가수: string; 제목: string };
좋아하는 = {
  가수: '찰리푸스',
  제목: "That's Hiliarious",
};

let project: { member: string[]; days: number; started: boolean } = {
  member: ['kim', 'park'],
  days: 30,
  started: true,
};

let object: { a: string | number } = { a: '123' };

let 회원들: (number | string)[] = [1, '2', 3];

let 모든: any; // 타입 실드 해제 문법
이름 = 123;

let user: string;
user = 'kim';

let age: undefined | number = undefined;

let married: boolean = false;

let 철수: (string | number | undefined | boolean)[] = [user, age, married];

let 학교: {
  score: (number | boolean)[];
  teacher: string;
  friend: string | string[];
} = {
  score: [100, 97, 84],
  teacher: 'Phil',
  friend: 'John',
};
학교.score[4] = false;
학교.friend = ['Lee', 학교.teacher];

function 함수(x: number): number {
  return x * 2;
}

함수(30);
