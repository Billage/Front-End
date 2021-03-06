import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { Rate, Input } from 'antd';
import { ReviewButton, PostHeader } from './ShowPost';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ReviewEdit = () => {
  const [curUser, setCurUser] = useState(''); //현재 접속한 유저
  const [reviewContent, setReviewContent] = useState(''); //리뷰 글 내용
  const [currentValue, setCurrentValue] = useState(0); //리뷰 별점 
  const [reviewId, setReviewId] = useState(''); //리뷰 별점 
  const history = useHistory(); //뒤로가기 버튼을 위한 history
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:7000/auth", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setCurUser(res.data);
        }
      }).catch((error) => {
        console.log(error);
      }
      );
  }, []);
  //기존에 저장되어 있는 게시글 내용 받아오기
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('http://localhost:7000/review/id',
          {
            params: {
              id: id,
            },
            withCredentials: true
          })
        setReviewContent(response.data.body);
        setCurrentValue(response.data.score);
        setReviewId(response.data.id);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, [])

  const submitBtn = (e) => {
    if (!currentValue) {
      alert('별점을 눌러주세요.')
    }
    else if (!reviewContent) {
      alert('평가를 남겨주세요.')
    }
    else {
      const data = {
        score: currentValue, //별점 
        body: reviewContent, //리뷰글
        date: moment().format('YYYY.MM.DD'), //리뷰 글쓴 날짜
        id: reviewId,
      }
      axios.post('http://localhost:7000/review/update', data,
        { withCredentials: true })
        //성공
        .then((res) => {
          history.goBack();
          //  기존 post 화면으로 이동  
        })
        // 에러 
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <PostHeader style={{ border: 'none', padding: '12px' }}>
        <ArrowLeftOutlined style={{ fontSize: '20px', marginTop: '3px' }} onClick={() => history.goBack()} />
        <h1 style={{ fontWeight: 'bold', fontSize: '16px', position: 'absolute', left: '80px', top: '12px' }}>대여후기 작성</h1>
        <ReviewButton onClick={submitBtn} style={{ display: 'inline-block', fontSize: '12px', height: '25px', textAlign: 'center' }} type="primary">완료</ReviewButton>
      </PostHeader>
      <PostHeader style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Rate allowHalf onChange={(value) => {
          setCurrentValue(value)
        }} value={currentValue} style={{ color: '#EBCAFD', fontSize: '30px' }} /> <br />
        <p style={{ position: 'relative', top: '-15px', color: '#7D7D7D', fontSize: '10px', fontWeight: 'bolder' }}>별을 탭하여 평가해주세요</p>
      </PostHeader>
      <TextArea onPressEnter={submitBtn} onChange={(e) => setReviewContent(e.target.value)} value={reviewContent} placeholder="당신의 경험을 이웃에게 공유해주세요" autoSize={true} bordered={false} />
    </>
  );
}
//  Current Rating: {currentValue} 
export default ReviewEdit;
// #EBCAFD 연한 보라색
