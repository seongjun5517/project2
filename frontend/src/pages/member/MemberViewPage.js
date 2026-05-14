// 기본 라이브러리 불러들이기
import React, {useState, useEffect} from "react";

// 링크처리를 위한 네비게이션 및 파라메터값을 전달 받을 때 사용하는 라이브러리 불러들이기
// - useParams : 요청시 전달받아온 파라메터를 자동으로 받아내는 상태 파라메터 변수
import {useNavigate, useParams} from "react-router-dom";

// SpringBoot 백엔드 요청 및 응답 처리를 위한 함수가 정의된 파일 불러들이기
import {getMemberView} from "../../springApi/memberSpringBootApi";

// SpringBoot 백엔드에서 삭제 처리 함수 호출
import {setMemberDelete} from "../../springApi/memberSpringBootApi";

// SpringBoot 백엔드에서 수정 처리 함수 호출
import {setMemberUpdate} from "../../springApi/memberSpringBootApi";

import MemberForm from "./MemberForm";

// 해당 페이지 몸체 정의
const MemberViewPage = () => {
    
    // 전달 받은 파라메터를 담을 상태변수 정의
    //  - 이미 메모리에 저정되어 있는 파라메터 변수를 사용하기에 중괄호로 사용
    const {mem_id} = useParams();

    // 페이지 이동을 위한 네비게이트 정의
    const navigate = useNavigate();

    // SpringBoot 백엔드에서 처리한 회원상세정보를 담을 상태변수 정의
    //  - 회원 정보 하나의 행값은 -> 딕셔너리 타입으로 정의되어 있음
    const [member, setMember] = useState({});

    // 상태 모드 변수 선언 및 정의
    //  - 상태 모드 : 상세보기, 수정에 대한 처리를 위해 값으로 제어
    //  - 디폴트(기본값)로 view 정의
    const [mode, setMode] = useState("view");
    
    // 최초 페이지 로딩(실행)시 중간에 백엔드 요청 처리 함수 호출
    useEffect(() => {
        //SpringBoot 상세정보 요청 및 응답 받아오기 위한 함수 정의
        const memberView = () => {
            // 상세정보 요청 함수 호출
            //  - 상세보기에서는 특정 회원의 아이디(전달 받은 파라메터)를 매개변수로 넘겨주기
            getMemberView(mem_id)
                // 백엔드로부터 응답 받아온 데이터 처리 영역
                .then((res) => {
                    // 응답 받은 res.data 값을 상태변수에 저장시키기
                    setMember(res.data);
                })
                // 백엔드 처리시 오류 처리 영역
                .catch((err) => {
                    console.error(">>>>>>> 상세조회 오류 발생 : ", err);
                });
        };

        // 함수는 호출해야 사용 가능
        // - 페이지 리로드시 항상 실행됨
        memberView();

    }, []);


    // 회원 [삭제] 버튼 처를 위한 함수 정의(SpringBoot 백엔드 처리 진행됨)
    const handleDelete = () => {
        // 정말로 삭제할 것인지 물어보기(재확인)
        //  - 삭제 안할래요~처리
        if(!window.confirm("정말로 삭제하시겠어요?(예:삭제, 아니오:취소)"))
            return;

        // SpringBoot 백엔드에 삭제 요청하기
        // - 삭제 함수 호출하기
        setMemberDelete(mem_id)
            // 정상 처리
            .then(() => {
                alert("정상적으로 삭제 되었습니다.");

                // 삭제 후 전체 리스트 페이지로 이동
                navigate("/member/list");
            })
            // 오류 처리
            .catch((err) => {
                console.error(">>>>>>>>>>> 회원 삭제 오류 : ", err);
            });
    };

    /* 입력 박스(input)의 값이 수정되는 경우 이벤트 처리 함수 정의 */
    // - 값이 수정되면 member 내에 각 key의 값을 변경해 주어야 함
    // - submit(저장) 시에 member의 최종 저장된 값이 전송됨
    const handleChange = (e) => {
        // 현재 변경되고 있는 input 박스의 name과 value는 e 변수가 가지고 있음
        // - 현재 입력/수정된 input의 name과 value의 값을 추출하여 변수에 담기
        const {name, value} = e.target;

        // member 내에 key가 name인 부분의 값을 value값으로 변경 처리
        // - prevMember : 이전 member 변수내에 객체 정보(딕셔너리), 수정전의 값을 의미
        //   -> 이름 규칙 : prev상태변수명
        setMember((prevMember) => ({
            // React에서는 특정 위치의 값을 수정하는 함수가 없음
            //  따라서, 기존 원본 데이터를 복제하여 수정한 후 
            //  다시 상태변수에 저장하는 방식을 사용함
            ...prevMember,

            // member 내에 name이라는 key를 찾아서 value의 값을 넣어줌
            [name] : value
        }));
    };

    // 수정 시 -> [취소] 버튼에 대한 이벤트 처리함수 정의
    //  - 수정 시 취소버튼을 클릭하면 입력모드를 상세보기 모드로 변환
    const handleCancel = (e) => {
        // mode의 상태 변수 값을 변경
        setMode("view");
    };

    // 수정 처리하는 함수 선언 및 정의(SpringBoot 백엔드 요청)
    const handleUpdate = (e) => {
        e.preventDefault();

        // SpringBoot 수정 요청 함수 호출
        setMemberUpdate(member)
            .then(() => {
                alert("정상적으로 수정되었습니다.");

                // 수정 완료 후에는 페이지 이동이 아닌, 상세보기 모드로 전환
                setMode("view");
            })
            .catch((err) => {
                console.error(">>>>>> 물리적 오류  발생 : ", err);
            });
    };


    // 브라우저에 보여질 페이지 그리기
    return(
        <div>
            <h3>회원 상세정보</h3>
            <hr/>

            {/* 입력을 위한 공통 페이지(MemberForm.js) 불러들이기 */}
            <MemberForm 
                // member, handleChange, handleCancel, handleSubmit, mode
                member = {member}
                // 수정할 때만 사용
                handleChange={handleChange}
                // 버튼 및 입력 텍스트박스 제어용으로 사용
                handleCancel={handleCancel}
                // 수정할 때만 사용
                handleSubmit={handleUpdate}
                mode={mode} />

            {/* 버튼 처리 */}
            {/* mode의 값이 view인 경우에만 아래 버튼 보여주기 */}
            {mode === "view" && (
                <div>
                    <button onClick={() => setMode("edit")}>수정</button>
                    <button onClick={() => handleDelete()}>삭제</button>
                    <button onClick={() => navigate("/member/list")}>목록</button>
                </div>
            )}

        </div>
    );
};

export default MemberViewPage;