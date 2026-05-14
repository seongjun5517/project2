// 기본적으로 React 라이브러리 불러들여놓기
import React from "react";

// -------- OAuth2 인증을 위해 Paging 처리를 위해 추가 ----
//  - OAuth2 인증 체계레서는 React 라우터를 통한 페이지 이동만 유지됨
//  - 따라서, 모든 페이지 이동을 위한 링크 처리는 Link 또는 Navigate를 통해서 진행
import {Link} from "react-router-dom";

// HomePage.js 정의하기
function HomePage(){
    return(
        /* 실제 브라우저에 보여질 태그 정의 */
        <div>
            <h3>React Home 페이지 입니다.</h3>
            <hr/>

            {/* Home 바로가기 링크 추가 */}
            <p>
                {/* <a href="/">[Home 바로가기]</a> */}
                <Link to="/">[Home 바로가기]</Link>
            </p>

            {/* SpringBoot 테스트 -> TestSpringBootPage 바로가기 */}
            <p>
                {/* <a href="/react/springboot_test">[TestSpringBootPage 바로가기]</a> */}
                <Link to="/react/springboot_test">[TestSpringBootPage 바로가기]</Link>
            </p>

            {/* 회원 전체 리스트 목록 조회 링크 추가
                - URL 패턴은 SpringBoot에서 회원전체조회 URL패턴 그대로 사용 */}
            <p>
                {/* <a href="/member/list">[MemberListPage 바로가기]</a> */}
                <Link to="/member/list">[MemberListPage 바로가기]</Link>
            </p>

            {/* -------------- Paging 처리 ----------- */}
            {/* 회원 전체 리스트 목록 조회 링크 추가
                - URL 패턴은 SpringBoot에서 회원전체조회 URL패턴 그대로 사용 */}
            <p>
                {/* <a href="/member/list_paging">[MemberListPaging 바로가기]</a> */}
                <Link to="/member/list_paging">[MemberListPaging 바로가기]</Link>
            </p>

            {/* ------------- Flask 백엔드 처리하기 -------------- */}
            {/* 생선 종류 예측 하기 : 예측에 사용할 독립변수 입력 페이지 */}
            <p>
                {/* <a href="/ml/fish_pred_form">[Flask - 생선종류 예측 바로가기]</a> */}
                <Link to="/ml/fish_pred_form">[Flask - 생선종류 예측 바로가기]</Link>
            </p>


        </div>
    );
}

export default HomePage;