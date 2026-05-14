// React 라이브러리 가져오기
// import React from "react";


/* ################################################################ */
/*  OAuth2.0 */
/* ################################################################ */
// useContext : 전역적(서버영역 전체 페이지)으로 관리되는 상태 관리 훅(Hoc) 
//  - 이 훅에 변수 AuthContext.jsx에서 정의한 로그인 상태 정보를 저장해서 사용하게됨
import React from 'react';
/* ################################################################ */


// React Router 라이브러리 가져오기
import {BrowserRouter} from "react-router-dom";

// HomeRouters.js 컴포넌트(기능, 페이지 같은 의미) 가지고 오기
//  - 공통으로 사용할 컴포넌트
import HomeRouters from "./routers/HomeRouters";
import MemberRouters from './routers/MemberRouters';




function App() {
  return (
    /* ---------- 1. React 서버 작동 테스트 -------- */
    // <div>
    //   <p>
    //     React 서버 Start.....
    //   </p>
    // </div>

    /* --------- [2. Router 적용하기] ----------- */
    <BrowserRouter>
      {/* HomeRouters.js 컴포넌트(페이지) 적용하기 */}
      {/*  - 공통으로 사용할 메뉴 구성에 대한 링크 처리 */}
      <HomeRouters />

      {/* MemberRouters.js 컴포넌트(페이지) 적용하기 */}
      {/*   - 회원정보 관리(전체조회, 상세조회, 입력, 수정, 삭제)에 대한 링크 처리 */}
      <MemberRouters />


    </BrowserRouter>
  );
}

export default App;