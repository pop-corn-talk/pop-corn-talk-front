import React, { useState, useEffect } from "react";
import { getProducts, order } from "../api/shopping";

import "./css/profile.css";
import "./css/shopping.css";

function ProductOrder() {
  const [ProductList, setProductList] = useState(null);
  // state change-> re-rendering
  const params = new URLSearchParams(document.location.search);
  const pagenNum = params.get("page");

  useEffect(() => {
    getlist(pagenNum);
  }, []);
  //헬로우
  const getlist = (pages) => {
    getProducts(pages).then((res) => {
      console.log(res);
      setProductList(res.data.data.content);
    });
  };

  //buttons
  function orderItem(itemId) {
    console.log(itemId);
    const a = order(itemId).then((res) => {
      console.log("상품 구매 성공");
      window.location.reload();
    });
  }

  return (
    <div className="mainDiv">
      <br />
      <div className="innerDiv">
        <h2 style={{ marginTop: 30, margin: 20, display: "block" }}>
          Product List : page {pagenNum}
        </h2>

        {ProductList && (
          <div className="productListContainer">
            {ProductList.map((Product) => (
              <div className="productContainer" key={Product.id}>
                {Product.id}
                <p>
                  이름 : <small>{Product.name}</small>
                </p>
                <img style={{ height: 100, width: 150 }} src={Product.image} />
                <p>설명 : </p>
                {Product.description}
                <p>가격 : {Product.price}</p>
                <p>남은 수량 : {Product.amount}</p>
                <br />
                {/* 이 버튼이 문제!!!! 클릭 하면 모든 상품들이 무한 주문됨*/}
                {/* HTML 이 아니다!!  onClick 에 함수 넣으면 무한 반복합니다 ()=> 를 같이 넣어 주세요*/}
                <button className="button" onClick={() => orderItem(Product.id)}>
                  {" "}
                  주문{" "}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="button">1 </button>
        <button className="button">2 </button>
        <button className="button">3 </button>
      </div>
    </div>
  );
}

export default ProductOrder;
