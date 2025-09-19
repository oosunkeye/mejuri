import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import shoppingBag from "../assets/shopping-bag.png";
import close from "../assets/close.png";

const Navbar = () => {
  const [showPreview, setShowPreview] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();

  const handleBagClick = (e) => {
    e.stopPropagation();
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const preview = document.querySelector(".cart-preview");
      if (showPreview && preview && !preview.contains(event.target)) {
        setShowPreview(false);
      }
    };
    if (showPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [showPreview]);

  const handleRemoveItem = (itemId) => {
    dispatch({ type: "cart/removeFromCart", payload: itemId });
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="navbar">
        <h2>Mejuri</h2>
        <div className="shopping-bag" onClick={handleBagClick}>
          <img
            src={shoppingBag}
            alt="Shopping Bag"
            onError={(e) => {
              e.target.style.display = "none";
              console.error("Shopping bag image failed to load");
              console.log("Navbar width:", e.target.parentElement.offsetWidth);
            }}
          />
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </div>
      </div>
      {showPreview && (
        <>
          <div className="overlay" onClick={handleBagClick}></div>
          <div className="cart-preview">
            <div className="cart-container">
              <div className="cart-header">
                <h3>Bag{itemCount > 0 ? "(" + itemCount + ")" : ""}</h3>
              </div>
              <div className="cart-items">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="cart-item-image"
                      />
                      <div className="cart-item-info">
                        <h4>{item.title}</h4>
                        <p>${item.price}</p>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="empty-cart">Your cart is empty</p>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="cart-footer">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="estimated-total">Estimated Total:</p>
                    <p className="estimated-total">CA${calculateTotal()}</p>
                  </div>
                  <button className="checkout-button">Checkout</button>
                </div>
              )}
            </div>
            <button className="close-preview" onClick={handleBagClick}>
              <img src={close} alt="Shopping Bag" width={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
