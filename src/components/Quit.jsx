import React from 'react'
import styled from "styled-components";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Page = styled.body`
    margin:0;
    padding:20px;
    display:flex;
    flex-direction:row;
    justify-content: center; 
    align-items:center;
    background: #A352CC;
    
`;
// 탈퇴
const SubmitButton1 = styled.button`
    margin:5px;
    border:none;
    border-radius: 10px;
    width:160px;
    height:40px;
    color:#A352CC;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;

// 취소
const SubmitButton2 = styled.button`
    margin:5px;
    border:1px solid white;
    border-radius: 10px;
    width:160px;
    height:40px;
    background-color:#AA62CE;
    color:white;
    font-weight:bold;
    font-size:18px;
    text-align:center;
`;
//문구 
const Text = styled.div`
    margin-left: 20px;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content: left; 
    font-size:25px;
    font-weight:bold;
    color: white;
`;
const Text2 = styled.div`
    margin-left: 20px;
    margin-bottom: 120px;
    padding:20px;
    display:flex;
    align-items:center;
    justify-content: left; 
    font-size:15px;
    // font-weight:bold;
    color: white;
`;

function Quit(props) {
    const history = useHistory();
    const onClickQuit = (event) => {
        event.preventDefault();
        axios.get('http://localhost:7000/auth/delete',
            { withCredentials: true })
            .then(res => {
                console.log(res);
                history.push('/')
            })
            .catch(err => console.log(err))

    }
    const onClickBack = (event) => {
        event.preventDefault();
        props.history.push('/');
    }

    return (
        <div style={{ 'height': '100vh', 'backgroundColor': '#A352CC' }}>
            <Text><br />그동안, <br /> Billage를 이용해주셔서<br /> 정말 감사했어요.</Text>
            <Text2>계정을 삭제하면 찜한 물품, 채팅 등 모든<br /> 활동 정보가 삭제되며, 삭제된 활동 정보는 <br />복원이 불가능합니다. </Text2>
            <div style={{ 'position': 'absolute', 'bottom': '0', 'left': '50%', 'transform': 'translate(-50%, -50%)' }}>
                <Page>
                    <SubmitButton2 onClick={onClickBack}>취소</SubmitButton2>
                    <SubmitButton1 onClick={onClickQuit}>탈퇴하기</SubmitButton1>
                </Page>
            </div>
        </div>
    )
}

export default Quit