import React from "react";

import { useLocation } from "react-router-dom";

function Wishlist() {

  const location = useLocation();

  const wishlist =
    location.state?.wishlist || [];

  return (

    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        ❤️ Wishlist Products
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {wishlist.map((item) => (

          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.image}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />

            <h2>
              {item.name}
            </h2>

            <h3>
              ₹{item.price}
            </h3>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;