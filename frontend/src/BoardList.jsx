import axios from 'axios';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

/**
 * BoardList class
 */
class BoardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [],
    };
  }

  componentDidMount() {
    // 컴포넌트가 마운트될 때 데이터를 가져옴
    axios
      .get('/api/dao')
      .then((response) => {
        // 가져온 데이터를 boardData 상태에 저장
        this.setState({ boardData: response.data.list });
      })
      .catch((error) => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        alert('데이터를 불러오는 중 오류가 발생했습니다.');
      });
  }

  render() {
    const { boardData } = this.state;
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boardData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/write">
          <Button variant="info">글쓰기</Button>
        </Link>
        <Button variant="secondary">수정하기</Button>
        <Button variant="danger">삭제하기</Button>
      </div>
    );
  }
}

export default BoardList;
