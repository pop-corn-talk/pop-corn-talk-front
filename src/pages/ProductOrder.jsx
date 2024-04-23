import React, { useState, useEffect } from "react";
import { getProducts, order } from "../api/shopping";
import { Card } from "antd";
const { Meta } = Card;
import Navbar from "../navbar/navbar";
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
  //hello
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
      const paragraph = document.getElementById(itemId);
      const num = paragraph.textContent;
      if (Number(num - 1) < 1) {
        alert("현제 선택하신 상품의 재고가 없습니다.");
      } else {
        paragraph.textContent = "" + Number(num - 1);
      }
    });
  }
  return (
    <div>
      <Navbar />
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
                  <Card
                    style={{
                      width: 200,
                    }}
                    cover={
                      <img
                        style={{
                          width: 200,
                          height: 150,
                        }}
                        alt="Product image"
                        src={Product.image}
                      />
                    }
                  >
                    <Meta title={Product.name} />
                    <br />
                    설명 : {Product.description}
                    <p>가격 : {Product.price}</p>
                    <p>
                      남은 수량 : <a id={Product.id}>{Product.amount}</a>
                    </p>
                    <button className="button" onClick={() => orderItem(Product.id)}>
                      주문
                    </button>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="button">1 </button>
        </div>
      </div>
    </div>
  );
}
export default ProductOrder;
