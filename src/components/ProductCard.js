import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const material = product.category || "18k Gold Vermeil";

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.thumbnail} alt={product.title} />
        <div className="stock-badge">Back in Stock</div>
        <button
          className="add-to-cart-overlay"
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
      <div className="product-info">
        <h4>{product.title}</h4>
        <p className="price">CA${product.price}</p>
        <p className="material">{material}</p>
      </div>
    </div>
  );
};

export default ProductCard;
