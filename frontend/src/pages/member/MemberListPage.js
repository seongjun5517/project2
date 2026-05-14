// 리엑트, 상태관리, 트리거 라이브러리 불러들이기
import React, {useState, useEffect} from "react";

// 페이지 간 이동 링크 처리 라이브러리
// - Link : 링크 컴포넌트(라우팅 처리용, 입력 링크 라우트 처리)
import {Link, useNavigate} from "react-router-dom";

// SpringBoot 백엔드 처리를 위한 Api 불러들이기
// - 사용할 파일명 : memberSpringBootApi.js
// - 사용할 함수명 : getMemberList()
import {getMemberList} from "../../springApi/memberSpringBootApi";

// MemberListPage.js 처리 정의
const MemberListPage = () => {
    // SpringBoot 백엔드의 처리결과(응답결과값)를 저장할 상태변수 선언 및 정의
    //  - 행렬의 2차원 리스트 데이터이므로, 상태변수의 타입은 리스트[]로 정의
    const [memberListData, setMemberListData] = useState([]);

    // 페이지 상태정보를 담고 있는 네비게이트 변수 정의
    const navigate = useNavigate();

    // SpringBoot 백엔드에 요청 및 응답 받아오기
    useEffect(() => {
        // 백엔드 요청에 사용할 함수 호출
        getMemberList()
            .then((res) => {
                // 백엔드로부터 받은 결과값(res.data)을 상태변수에 저장하기
                setMemberListData(res.data);
            })
            .catch((err) => {
                // 오류 처리
                console.error("[MemberListPage.js] 회원 전체 조회 오류 : ", err);
            });

    }, []);

    // 브라우저에 반환할 페이지 정보 정의
    return(
        <div>
            <h3>회원 전체 목록</h3>
            <hr/>
            <div>
                {/* Home 바로가기 버튼 생성 */}
                <button onClick={() => navigate("/")}>Home 바로가기</button>  
                
                {/* 신규 회원 추가 버튼 생성 (React Link 컴포넌트 사용) */}
                <Link to="/member/insert">
                    <button>신규 회원 추가</button>
                </Link>
            </div>
            <div>
                {/* 회원 전체 목록 데이터 출력 정의 */}
                <table border="1" style={{width : "100%"}}>
                    {/* 컬럼 제목 정의 */}
                    <thead>
                        <tr>
                            <th>회원 아이디</th>
                            <th>회원 패스워드</th>
                            <th>회원 이름</th>
                        </tr>
                    </thead>
                    {/* 데이터 정의 */}
                    <tbody>
                        {/* 
                            for(member in memberListData){
                                member.mem_id
                                member.mem_pass
                                member.mem_name
                            }
                        */}
                        {memberListData.map((member) => (
                            <tr>
                                <td>
                                    {/* React에서 제공하는 Link 태그 사용 */}
                                    <Link to={`/member/view/${member.mem_id}`}>
                                        {member.mem_id}
                                    </Link>
                                </td>
                                <td>{member.mem_pass}</td>
                                <td>{member.mem_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MemberListPage;