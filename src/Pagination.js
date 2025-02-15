import { useEffect, useState } from "react";
import Product from "./Product";

export default function Pagination() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const dummy = [];
  const PROD_PER_PAGE = 5;
  const getAllProducts = async () => {
    let res = await fetch(`https://dummyjson.com/products`);
    let data = await res.json();
    setProducts(data.products);
    data.products.forEach((p) => dummy.push(0));
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const changePage = (page) => {
    setCurrentpage(page);
  };
  return (
    <>
      <div style={{ margin: "20px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "6px",
            cursor: "pointer",
          }}
        >
          ◀️
        </button>
        {[...Array(Math.ceil(products.length / PROD_PER_PAGE))].map((_, i) => {
          return (
            <span
              className={i + 1 === currentPage ? "hightlight" : ""}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "6px",
                cursor: "pointer",
              }}
              onClick={() => {
                changePage(i + 1);
              }}
            >
              {i + 1}
            </span>
          );
        })}
        <button
          disabled={currentPage === Math.ceil(products.length / PROD_PER_PAGE)}
          onClick={() => changePage(currentPage + 1)}
          style={{
            border: "1px solid black",
            padding: "10px",
            margin: "6px",
            cursor: "pointer",
          }}
        >
          ▶️
        </button>
      </div>
      <div className="products-container">
        {products
          .slice((currentPage - 1) * 5, (currentPage - 1) * 5 + 5)
          .map((product) => {
            return <Product product={product} />;
          })}
      </div>
    </>
  );
}
