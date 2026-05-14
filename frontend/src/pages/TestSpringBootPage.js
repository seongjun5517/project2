// React 라이브러리 불러들이기
// - useState : 현재 페이지 어디서든지 사용가능한 변수 정의(상태 변수라고 칭함)
// - useEffect : 현재 페이지가 랜더링 전에(화면에 보여주기 전에)
//             : 사전에 처리해야하는 기능을 수행함(백엔드 처리 담당)
import React, {useState, useEffect} from "react";

// 페이지 이동이 있는 경우 페이지 정보를 담고 있는 라이브러리 불러들이기
//  - useNavigate : 페이지 정보를 담고 있으며, 페이지 이동 링크 처리시 사용
import {useNavigate} from "react-router-dom";

// SpringBoot 처리를 위한 TestSpringBootApi.js 파일 정의하여 불러들이기
//  - 파일 내에 사용할 함수 정의 : getTest() 
//  - 중괄호를 사용한 이유 : 서버 실행시 백엔드 관련 코드들이 미리 인식됨
//    -> 미리 인식된 결과 호출하는 방식
import {getTest} from "../springApi/TestSpringBootApi"


// 컴포넌트 정의 : 인스턴스화 시킴
const TestSpringBootPage = () => {

    /* useNavigate 사용을 위해 변수 선언 및 정의 */
    // - 네이게이트 처리를 위해 컴포넌트(페이지) 파일을 function이 아닌 
    //   const 인스턴스로 정의해야함 
    //   -> 함수는 호출 시점에 실행, const 인스턴스는 서버 실행 시 해당 라우터 내용 사전 처리
    //   -> 페이지 정보를 미리 서버가 인식하게 만들어 놓기 위해 페이지를 실행해 놓습니다.
    const navigate = useNavigate();

    /* SpringBoot의 응답 결과값을 담을 상태 변수 선언 및 정의 */
    const [testResultMessage, setTestResultMessage] = 
                                useState("SpringBoot에서 응답 받기 전입니다.");
    
    /* 현재 페이지 실행 중에 중간에 처리(트리거 개념) */
    // - SpringBoot 백엔드 데이터 요청 처리 수행
    useEffect(() => {
        /* SpringBoot 백엔드 처리 요청 시작
            <처리 순서 : 아래 처리가 하나의 문장으로 작성됨(비동기 방식 처리)>
             1. 백엔드 처리에 사용할 함수 호출
                - 외부에 파일로 정의(Api 처리 파일)
             2. 응답 결과 받아오기
                - 받아온 응답결과를 상태변수에 저장
             3. 예외 처리

            <동기 방식 이란>
             - 브라우저 페이지 간의 페이지 전환 방식
             - 브라우저에서 URL 요청 -> 서버에서 url 패턴 처리 -> 
               요청한 브라우저로 새로운 페이지 정보 응답
             - 브라우저의 URL이 사용자가 요청했던 URL로 변경되면서 새로운 페이지 로딩됨

            <비동기 방식 이란>
             - 브라우저 페이지 간의 처리가 아닌, 서버와 서버간의 네트워트 통신 방식을 의미함
             - 페이지 전환 및 URL 변경 없음
             - 해당 브라우저 페이지에서, 요청이 발생하면,
               -> 서버 내부에서 모든 처리 결과를 해당 브라우저 페이지에 반영하는 방식
        */
        
        // 비동기 처리 방식(문법)
        // SpringBoot 백엔드 서버로 요청 처리할 함수 호출
        //  - 해당 함수는 백엔드에서 연결 잘 됐는지 문자열 값만 받아오는 기능 수행
        getTest()
            // SpringBoot 서버로 요청 처리하는 동안 응답을 기다리는 영역
            // - 응답이 오면 상태변수에 값을 저장 처리함
            .then((res) => {
                // 응답받은 결과는 res 매개변수가 가지고 있음
                // - 응답받은 결과를 상태변수에 저장하기
                // - 응답값 추출은 res.data 속성 사용
                setTestResultMessage(res.data);
            })
            // 예외 처리 : SpringBoot 백엔드 서버간의 통신 중 오류 발생 시 처리하는 영역
            // - 응답을 받았지만, 오류가 있는 상태라면 이 영역이 실행됨
            .catch((err) => {
                // 오류 내용은 err 매개변수가 가지고 있음
                // - 콘솔에 출력
                console.error(">>>>>>>>> SpringBoot 연결 오류 : ", err);
            });

    }, []);

    return(
        /* 화면에 보여질 내용 정의 */
        <div>
            <h3>SpringBoot(백엔드) 연결 테스트 결과</h3>
            <hr/>

            {/* Home바로가기 링크 만들기 */}
            <div>
                <button onClick={()=>navigate("/")}>Home 바로가기</button>
            </div>
            <hr/>

            {/* SpringBoot 연결 테스트 결과 출력 하기 */}
            <p>
                SpringBoot 연결 테스트 결과 : {testResultMessage}
            </p>
        </div>
    );
}

export default TestSpringBootPage;