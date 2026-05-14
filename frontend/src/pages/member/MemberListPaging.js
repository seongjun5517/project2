// 리엑트, 상태관리, 트리거 라이브러리 불러들이기
import React, {useState, useEffect} from "react";

// 페이지 간 이동 링크 처리 라이브러리
// - Link : 링크 컴포넌트(라우팅 처리용, 입력 링크 라우트 처리)

// -------- Paging 처리를 위해 useSearchParams 추가 ----
// - useSearchParams : 페이지 자체적으로 전송 파라메터를 생성하는 라이브러리
//                   : useParams와 유사함
import {Link, useNavigate, useSearchParams} from "react-router-dom";

// SpringBoot 백엔드 처리를 위한 Api 불러들이기
// - 사용할 파일명 : memberSpringBootApi.js
// - 사용할 함수명 : getMemberList()
import {getMemberListPaging} from "../../springApi/memberSpringBootApi";

// MemberListPaging.js 처리 정의
const MemberListPaging = () => {
    // SpringBoot 백엔드의 처리결과(응답결과값)를 저장할 상태변수 선언 및 정의
    //  - 행렬의 2차원 리스트 데이터이므로, 상태변수의 타입은 리스트[]로 정의
    const [memberListData, setMemberListData] = useState([]);

    // 페이지 상태정보를 담고 있는 네비게이트 변수 정의
    const navigate = useNavigate();


    /* --------------- Paging 처리 ---------------- */
    // get방식으로 전달받는 모든 파라메터 변수들은 이곳에 저장됨
    //  - 값 재정의 가능 
    //  - page정보를 담아 놓기위해 사용
    const [searchParams, setSearchParams] = useSearchParams();

    // searchParams에서 page 파라메터 변수값 추출하기
    //  - 최초에는 외부에서 전송 받아오는 파라메터가 없는 상태임(디폴트 1 정의)
    //  - page 파라메터 변수값은 사용자가 페이지 번호를 클릭할 때 값을 담아서 
    //    --> 자기 자신 페이지(MemberListPaging.js)를 재호출하게됨
    const currentPageParam = parseInt(searchParams.get("page") || "1");

    // 상태관리 변수 2개, 일반변수 1개 정의
    // - 현재 페이지 번호를 관리하는 상태변수 정의
    const [currentPage, setCurrentPage] = useState(currentPageParam);

    // 전체 페이지 갯수(행의 갯수 아님)를 관리하는 상태변수 정의(1, 2, 3, .. )
    const [totalPages, setTotalPages] = useState(0);

    // 한 페이지에 보여질 행의 갯수
    //  - 향후 한페이지에 보여지는 행의 갯수를 UI에서 선택하게 할수도 있음
    const size = 3;
    /* ------------------------------------------------- */


    // SpringBoot 백엔드에 요청 및 응답 받아오기
    useEffect(() => {
        // 백엔드 요청에 사용할 함수 호출
        /* ----------- Paging 처리를 위해 파라메터 2개 전달 ----------- */
        // - 현재 선택된 페이지번호, 한페이지에 보여질 행의 갯수
        getMemberListPaging(currentPage, size)
            .then((res) => {
                // 백엔드로부터 받은 결과값(res.data)을 상태변수에 저장하기
                setMemberListData(res.data.content);

                /* --------- Paging 처리 --------- */
                // 전체 페이지 수 저장
                //  - 조회 결과 객체에는 전체 조회에 대한 페이지의 갯수를 추출하는 속성 있음
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => {
                // 오류 처리
                console.error("[MemberListPaging.js] 회원 전체 조회 오류 : ", err);
            });
    /* ---------- Paging 처리 ------------ */
    // useEffect 마지막 []에 선택된 페이지 값이 바뀔때마다 해당 useEffect를 실행시킴(리로드)
    //  - useEffect 마지막 []가 비어있는 경우에는, 최초에 1회 실행 후 더 이상 수행 안함
    }, [currentPage]);


    /* -------------- Paging 처리 ---------------- */
    // 페이지 번호 클릭시 페이지 번호 상태변수를 변경 처리하는 함수 정의
    const handlePageChage = (page) => {
        // 페이지 번호 상태 변수의 값 변경하기
        // - 상태변수값이 변경되면 useEffect가 리로딩됨
        //   (백엔드에 해당 페이지에 대한 데이터 처리됨)
        setCurrentPage(page);

        // searchParams의 파라메터 상태값 변경하기
        //  - MemberViewPage.js, 상세보기 클릭시 넘겨줄 파라메터로 이용됨
        //  - 파라메터로 전송 시 문자열로 변환 후 전송(toString() : 문자열로 변환)
        setSearchParams({page : page.toString()});
    };

    // 보여줄 페이지의 갯수 정의
    //  - [다음] 1 2 3 4 5 6 7 8 9 10 [다음]
    const pageSize = 3;

    // 최초 또는 [다음] 버튼 클릭시 "페이지 번호의 시작값" 정의하기
    // - 계산에 의해 값을 정의해야함
    // (계산공식) 시작페이지 번호
    //            = ((현재페이지번호 - 1) / 보여줄페이지갯수) * 보여줄페이지갯수 + 1
    // - 계산 중에 나누기 결과 값은 -> 정수값으로 사용해야함(소숫점 이하는 버리기)
    const startPage = Math.floor((currentPage-1) / pageSize) * pageSize + 1;

    // 끝페이지 번호값 정의하기
    // (계산공식) 끝페이지 번호
    //            = 시작페이지번호 + 보여줄페이지갯수 - 1
    //  단, 끝페이지 번호가 전체 페이지 갯수 보다 크다면, 전체 페이지 갯수로 사용
    const endPage = Math.min(startPage + pageSize - 1, totalPages);


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
                                    <Link to={`/member/view_paging/${member.mem_id}/${currentPage}`}>
                                        {member.mem_id}
                                    </Link>
                                </td>
                                <td>{member.mem_pass}</td>
                                <td>{member.mem_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr/>

                {/* -------------- Paging 처리 ------------- */}
                <div style={{ margin:'20px', textAlign:'center' }}>
                    {/* [이전] 버튼 처리 */}
                    {/*   - [시작 페이지번호]가 1보다 크면 보이도록 처리 */}
                    {
                        startPage > 1 && (
                            <button onClick={() => handlePageChage(startPage-1)}>
                                [이전]
                            </button>
                        )
                    }

                    {/* [페이지 번호 출력] 처리 */}
                    {
                        // 배열로 생성하여 반복 처리
                        //  - Array.from({반복 횟수 범위정의}, (받아올 값)) => {처리 프로그램}
                        //  - 파이썬에서 for(받아올값 in range(반복횟수범위)){처리프로그램}
                        Array.from({length: endPage - startPage + 1}, (_, idx) => {
                            // 출력에 사용할 페이지 번호 임의 변수 정의
                            const page = startPage + idx;

                            // 반복 할 때마다 값 출력(return으로 사용)
                            return(
                                // Array 배열을 이용해서 반복할 경우에는 태그 내에
                                //  - key(배열 인덱스 번호) 속성을 작성해야함(필수 규칙)
                                <button key={page} onClick={() => handlePageChage(page)}
                                    //현재 선택된 번호는 굵게 표시
                                    style={{fontWeight: currentPage===page?'bold':'normal',
                                            margin: '5px'
                                    }}>
                                    {page}
                                </button>
                            );
                        })
                    }

                    {/* [다음] 버튼 처리 */}
                    {/*   - 끝페이지번호가 전페 페이지갯수보다 작으면 보이도록 처리*/}
                    {
                        endPage < totalPages && (
                            <button onClick={() => handlePageChage(endPage + 1)}>
                                [다음]
                            </button>
                        )
                    }
                </div>
                {/* ---------------------------------------- */}
            </div>
        </div>
    );
}

export default MemberListPaging;