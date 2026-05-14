/* 회원관련 URL 매핑 하는 파일 */

import React from "react";

// Routes 및 Route 라이브러리
import {Routes, Route} from "react-router-dom";

/* 브라우저에 보여주기 위한 페이지 정보 불러들이기 */
// 회원 전체 목록 조회하기 : MemberListPage.js
import MemberListPage from "../pages/member/MemberListPage";

// 회원 상제 조회하기 : MemberViewPage.js
import MemberViewPage from "../pages/member/MemberViewPage";

// 회원 신규 추가하기 : MemberInsertPage.js
import MemberInsertPage from "../pages/member/MemberInsertPage";

/* --------------- Paging 추가 ---------------- */
import MemberListPaging from "../pages/member/MemberListPaging";
import MemberViewPaging from "../pages/member/MemberViewPaging";


function MemberRouters(){
    return(
        <Routes>
            {/* 회원 전체 목록 조회하기 : MemberListPage.js */}
            <Route path="/member/list" element={<MemberListPage />} />

            {/* 회원 상세 보기 조회하기 : MemberViewPage.js
                - :mem_id : mem_id = 값 형태로 셋팅해서 전달함
            */}
            <Route path="/member/view/:mem_id" element={<MemberViewPage />} />

            {/* 회원 신규 추가하기 : MemberInsertPage.js */}
            <Route path="/member/insert" element={<MemberInsertPage />} />

            {/* ------------- Paging 추가 ------------- */}
            {/* 회원 전체 목록 조회하기 : MemberListPaging.js */}
            <Route path="/member/list_paging" element={<MemberListPaging />} />

            {/* 회원 상세 정보 조회하기 : MemberViewPage.js */}
            <Route path="/member/view_paging/:mem_id/:page" 
                   element={<MemberViewPaging />} />

        </Routes>
    );
}

export default MemberRouters;