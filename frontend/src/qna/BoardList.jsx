import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './BoardList.scss';

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

  // 항목 삭제 함수
  handleDeleteItem = (num) => {
    axios
      .delete(`/api/dao/${num}`) // 해당 id의 항목을 삭제하는 API 요청
      .then(() => {
        // 삭제 성공 시 새로운 리스트로 상태 업데이트
        this.setState((prevState) => ({
          boardData: prevState.boardData.filter((item) => item.num !== num),
        }));
        alert('게시물이 삭제되었습니다.');
      })
      .catch((error) => {
        console.error('데이터를 삭제하는 중 오류가 발생했습니다:', error);
        alert('데이터를 삭제하는 중 오류가 발생했습니다.');
      });
  };

  render() {
    const { boardData } = this.state;

    return (
      <div className="boardListForm">
        <h1>Q&A</h1>
        <div className="qnaButtons">
          <Link to="/write">
            <button>작성</button>
          </Link>
        </div>
        <Table striped bordered hover className="boardTable">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {boardData.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>

                <td>
                  <Link to={`/view/${item.num}`}>{item.title}</Link>
                </td>

                <td>{item.writer}</td>
                <td>{moment(item.writeDate).format('YYYY-MM-DD hh:mm:ss')}</td>
                <td>
                  <Link to={`/update/${item.num}`}>
                    <button>수정</button>
                  </Link>
                  <button onClick={() => this.handleDeleteItem(item.num)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BoardList;
