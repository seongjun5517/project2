/*
<해당 파일의 기능>
 - URL 패턴을 처리하는 컴포넌트 페이지로,
 - 사용자의 요청 URL에 따라 어떤 페이지를 보여줄지 정의함
 - 보여줄 페이지는 외부에서 .js파일로 별도로 제작
 - 이곳은 매핑만 하는 곳입니다....
*/

// React 라이브러러리 가지고 오기
import React from "react";

// URL 패턴에 따른 매핑 작업을 위한 라이브러리 가져오기
//  - Routes : 라우터 전체 관리 태그
//  - Route : URL 패턴과 컴포넌트(페이지) 매핑에 사용되는 태그
import {Routes, Route} from "react-router-dom";

/* 외부 컴포넌트(페이지) 가지고 오기 */
// 공통으로 사용할 메인 메뉴 페이지 : HomePage.js
import HomePage from "../pages/HomePage";

// 백엔드(SpringBoot) 연결 테스트에 사용할 페이지 : TestSpringBootPage.js
import TestSpringBootPage from "../pages/TestSpringBootPage";
 
// HomeRouters.js 컴포넌트(페이지) 정의하기
function HomeRouters(){
    return(
        /* Routes 컴포넌트로 전체 감싸기
            - import Routes 및 Route 필요함
        */
        <Routes>
            {/* URL 패턴 및 매핑 컴포넌트 정의 */}

            {/* 루트(http://localhost:3000/) URL로 들어오면 -> HomePage.js 페이지 호출하기 */}
            <Route path="/" element={<HomePage />} />

            {/* URL : /react/springboot_test 패턴 처리하기
              -> TestSpringBootPage.js 페이지 호출하기 */}
            <Route path="/react/springboot_test" element={<TestSpringBootPage />} />
        </Routes>
    );
}

// 외부에서 불러들일때(import) 사용하기 위해 export(내보내기) 처리
export default HomeRouters;