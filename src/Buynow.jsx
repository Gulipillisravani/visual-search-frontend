import React from "react";
import { useLocation } from "react-router-dom";

function BuyNow() {
  const location = useLocation();

  const product = location.state;

  // IF NO PRODUCT
  if (!product) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial",
        }}
      >
        <h2>No Product Selected</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* PRODUCT IMAGE */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <img
            src={product.image}
            alt="product"
            style={{
              width: "100%",
              height: "450px",
              objectFit: "contain",
              background: "#fff",
              borderRadius: "15px",
            }}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            {product.gender} {product.color}
          </h1>

          <p
            style={{
              color: "gray",
              fontSize: "18px",
              marginBottom: "15px",
            }}
          >
            {product.category}
          </p>

          {/* RATING */}
          <div
            style={{
              display: "inline-block",
              background: "green",
              color: "white",
              padding: "6px 12px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            ⭐ 4.3
          </div>

          {/* PRICE */}
          <h2
            style={{
              color: "red",
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            ₹{product.price}
          </h2>

          <p
            style={{
              textDecoration: "line-through",
              color: "gray",
              fontSize: "20px",
              marginBottom: "20px",
            }}
          >
            ₹{product.price + 1500}
          </p>

          {/* DETAILS */}
          <p style={{ fontSize: "18px" }}>
            <b>Color:</b> {product.color}
          </p>

          <p style={{ fontSize: "18px" }}>
            <b>Usage:</b> Casual
          </p>

          <p style={{ fontSize: "18px" }}>
            <b>Category:</b> {product.category}
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            {/* PAYMENT BUTTON */}
           
            <button
  onClick={() => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: product.price * 100,
      currency: "INR",
      name: "AI Search Store",
      description: "Product Payment",
      image: product.image,

      handler: function (response) {
        alert(
          "Payment Successful\\nPayment ID: " +
            response.razorpay_payment_id
        );
      },

      prefill: {
        name: "Customer",
        email: "customer@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  }}
  style={{
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "15px 30px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  Proceed To Payment
</button>
             

            {/* CANCEL BUTTON */}
            <button
              onClick={() => window.history.back()}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "16px 30px",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;