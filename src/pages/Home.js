import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import ProductList from "../components/ProductList";

const Home = () => {
  useFetch("https://dummyjson.com/products");
  const { list, loading, error } = useSelector((state) => state.products);

  return (
    <div className="container">
      <h1>Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ProductList products={list} />
    </div>
  );
};

export default Home;
