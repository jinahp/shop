import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import Carousel from './Carousel';
import Cart from './Cart';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import magnifying from './img/magnifying-glass-solid.svg';
import OrderPage from './order/OrderPage';
import { BoardList, Update, View, Write } from './qna';
import Detail from './routes/Detail';
import basketData from './routes/basket.json';
import data from './routes/data.json';
import { logout } from './store';

function App() {
  let [flower] = useState(data);
  let [basket] = useState(basketData);
  let navigate = useNavigate();

  const list = data.map((item) => (
    <List
      class="flower"
      {...item}
      onClick={() => (window.location.href = '/bouquet/detail/:id')}
    />
  ));

  const list2 = basket.map((item) => (
    <List2
      class="basket"
      key={item.id}
      {...item}
      onClick={() => (window.location.href = '/basket/detail/:id')}
    />
  ));

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      <Navbar bg="gray" variant="light">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand href="/" className="home pulse">
              Flower House
            </Navbar.Brand>
            <Nav.Link
              onClick={() => {
                navigate('/bouquet');
              }}
            >
              꽃다발
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/basket');
              }}
            >
              꽃바구니
            </Nav.Link>
          </Nav>
          <div class="searchBar">
            <form action="./search" id="searchForm">
              <input id="searchResult" type="text" placeholder="Search" />
              <button id="btnClick" onClick={Search}>
                <img src={magnifying} id="searchIcon" width="18pt" />
              </button>
            </form>
          </div>
          <Nav className="me-auto2">
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => {
                  navigate('/login');
                }}
              >
                SIGN IN
              </Nav.Link>
            )}
            <Nav.Link
              onClick={() => {
                navigate('/join');
              }}
            >
              SIGN UP
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/qna');
              }}
            >
              Q&A
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              CART
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Carousel />
            </div>
          }
        />
        <Route
          path="/basket"
          element={
            <>
              <div className="shop-bg"></div>
              <div className="container" key="basket">
                <div className="row">{list2}</div>
              </div>
            </>
          }
        />
        <Route
          path="/basket/detail/:id"
          element={<Detail data={basket} title="꽃바구니" type="basket" />}
        />

        <Route
          path="/bouquet"
          element={
            <>
              <div className="shop-bg"></div>
              <div className="container" key="bouquet">
                <div className="row">{list}</div>
              </div>
            </>
          }
        />
        <Route
          path="/bouquet/detail/:id"
          element={<Detail data={flower} title="꽃다발" type="bouquet" />}
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/join" element={<SignUpForm />} />
        <Route path="/qna" exact element={<BoardList />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/write" element={<Write />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderPage />} />

        <Route path="*" element={<div>404 페이지</div>} />

        <Route path="/search" element={<Search />}>
          <Route path="history" element={<div>검색 기록</div>} />
          <Route path="settings" element={<div>검색 설정</div>} />
        </Route>

        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<div>첫 주문시 무료배송</div>} />
          <Route path="two" element={<div>생일 기념 20% 할인 쿠폰 증정</div>} />
        </Route>
        <Route path="/board" component={BoardList} />
      </Routes>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  );
}

function Search() {
  return (
    <div>
      <h4>검색 결과</h4>
      <Outlet />
    </div>
  );
}

function List(props) {
  return (
    <Link to={`/bouquet/detail/${props.id}`} class="col-md-4">
      <div>
        <img
          src={props.imageURL}
          class={props.class}
          alt={props.class + '.jpg'}
          width="50%"
        />
      </div>
      <div id="name">{props.name}</div>
      <div>{props.content}</div>
      <div id="listPrice">{props.price.toLocaleString()}원</div>
      <span id="delivery">무료배송</span>
    </Link>
  );
}

function List2(props) {
  return (
    <Link to={`/basket/detail/${props.id}`} class="col-md-4">
      <div>
        <img
          src={props.imageURL}
          class={props.class}
          alt={props.class + '.jpg'}
          width="50%"
        />
      </div>
      <div id="name">{props.name}</div>
      <div>{props.content}</div>
      <div id="listPrice">{props.price.toLocaleString()}원</div>
      <span id="delivery">무료배송</span>
    </Link>
  );
}

export default App;
