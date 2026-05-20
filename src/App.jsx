import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

function App() {
  const [image, setImage] =
    useState(null);

    const [preview, setPreview] =
  useState(null);

  const [results, setResults] =
    useState([]);

  const [cameraOpen, setCameraOpen] =
    useState(false)

  const [history, setHistory] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [wishlist, setWishlist] =
    useState([]);

  const [searchText, setSearchText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // FILTERS
  const [priceFilter, setPriceFilter] =
    useState("All");

  const [genderFilter, setGenderFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const webcamRef = useRef(null);

  const uploadInputRef =
    useRef(null);
  




  const navigate = useNavigate();

  // FILE TO BASE64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader =
        new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = reject;
    });

  // LOAD STORAGE
  useEffect(() => {
    const savedResults =
      localStorage.getItem(
        "searchResults"
      );

    if (savedResults) {
      setResults(
        JSON.parse(savedResults)
      );
    }

    const savedHistory =
      localStorage.getItem(
        "searchHistory"
      );

    if (savedHistory) {
      setHistory(
        JSON.parse(savedHistory)
      );
    }

    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist =
      localStorage.getItem(
        "wishlist"
      );

    if (savedWishlist) {
      setWishlist(
        JSON.parse(savedWishlist)
      );
    }
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // CAMERA CAPTURE
  const capturePhoto =
  async () => {

    const imageSrc =
      webcamRef.current.getScreenshot();

    const blob =
      await fetch(imageSrc)
      .then((res) =>
        res.blob()
      );

    const file =
      new File(
        [blob],
        "camera.jpg",
        {
          type:
            "image/jpeg",
        }
      );

    setImage(file);

    const imageUrl =
      URL.createObjectURL(
        file
      );

    setPreview(imageUrl);

    setCameraOpen(false);
};

  

  
 
  // SEARCH
  // REPLACE ONLY THIS FULL handleSearch FUNCTION
    const handleSearch = async () => {

  

  setLoading(true);

  try {

    const formData = new FormData();

    if (image) {
  formData.append("image", image);
}

    formData.append(
      "search_text",
      searchText
    );

    const response = await fetch(
      "http://localhost:8000/api/search/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(
        "Backend API Error"
      );
    }

    const data =
      await response.json();

    console.log(data);

    // SEARCH TEXT
    const search =
      searchText.toLowerCase();
       

      const filteredData = data.filter((item) => {
  if (!search) return true;

  const query = search.toLowerCase();

  const category =
    (item.category || "").toLowerCase();

  const subcategory =
    (item.subcategory || "").toLowerCase();

  const detected =
    (item.detected_category || "").toLowerCase();

  return (
    category === query ||
    subcategory === query ||
    detected === query ||
    category.includes(query) ||
    subcategory.includes(query)
  );
});
    

      

    // CREATE PRODUCTS
    const expandedProducts =
      filteredData.map(
        (original, index) => {

          const imageList =

            original?.images?.length > 0

              ? original.images

              : original?.image

              ? [original.image]

              : [
                  "https://via.placeholder.com/300",
                ];

          return {

            ...original,

            id: index + 1,

            images: imageList,

            image: imageList[0],

            price:
              original.price ||
              Math.floor(
                Math.random() * 5000
              ) + 500,

            similarity: (
              Math.random() * 0.2 +
              0.8
            ).toFixed(2),

            offer:
              Math.floor(
                Math.random() * 60
              ) + 10,

            season:
              original.season ||
              "Summer",

            rating: (
              Math.random() * 2 +
              3
            ).toFixed(1),

            detected_color:
              original.color ||
              "Black",

            pattern:
              original.pattern ||
              "Casual",

            style:
              original.style ||
              "Modern",

            detected_category:
              original.subcategory ||
              original.category ||
              "Fashion",

            gender:
              original.gender ||
              "Women",

            color:
              original.color ||
              "Black",
          };
        }
      );

    // SAVE RESULTS
    setResults(
      expandedProducts
    );

    localStorage.setItem(
      "searchResults",
      JSON.stringify(
        expandedProducts
      )
    );

    // SAVE HISTORY
    const imageUrl =
      await toBase64(image);

    const historyItem = {

      id: Date.now(),

      image: imageUrl,

      search:
        searchText ||
        "Visual Search",

      date:
        new Date().toLocaleString(),
    };

    const oldHistory =
      JSON.parse(
        localStorage.getItem(
          "searchHistory"
        )
      ) || [];

    const updatedHistory = [
      historyItem,
      ...oldHistory,
    ];

   try {
  localStorage.setItem(
    "searchHistory",
    JSON.stringify(history.slice(0, 20)) // keep only last 20
  );
} catch (e) {
  console.log("LocalStorage full, clearing old data");

  localStorage.removeItem("searchHistory");
}

    setHistory(updatedHistory);

  } catch (error) {

    console.log(error);

    alert(
      "Backend API Error"
    );
  }

  setLoading(false);
};



  // FILTER RESULTS
  const filteredResults =
    results.filter((item) => {
      let priceMatch = true;

      if (
        priceFilter ===
        "Below 1000"
      ) {
        priceMatch =
          item.price < 1000;
      }

      if (
        priceFilter ===
        "1000-3000"
      ) {
        priceMatch =
          item.price >= 1000 &&
          item.price <= 3000;
      }

      if (
        priceFilter ===
        "Above 3000"
      ) {
        priceMatch =
          item.price > 3000;
      }

      const genderMatch =
        genderFilter === "All"
          ? true
          : item.gender ===
            genderFilter;

      const categoryMatch =
        categoryFilter === "All"
          ? true
          : item.detected_category ===
            categoryFilter;

      return (
        priceMatch &&
        genderMatch &&
        categoryMatch
      );
    });

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom,#eef4ff,#f8fafc)",
        minHeight: "100vh",
        fontFamily:
          "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          background:
            "rgba(255,255,255,0.9)",
          backdropFilter:
            "blur(10px)",
          padding: "20px 40px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 999,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "42px",
            background:
              "linear-gradient(to right,#2563eb,#7c3aed)",
            WebkitBackgroundClip:
              "text",
            WebkitTextFillColor:
              "transparent",
          }}
        >
          AI Search
        </h1>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <div
  onClick={() =>
    navigate("/cart", {
      state: { cart }
    })
  }
  style={{
    background: "#dbeafe",
    padding: "12px 20px",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  🛒 Cart ({cart.length})
</div>

<div
  onClick={() =>
    navigate("/wishlist", {
      state: { wishlist }
    })
  }
  style={{
    background: "#fce7f3",
    padding: "12px 20px",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  ❤️ Wishlist ({wishlist.length})
</div>
            

         
   


</div>
      </div>

      {/* HERO */}
      <div
        style={{
          maxWidth: "1100px",
          margin:
            "50px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "35px",
            padding: "50px",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign:
                "center",
            }}
          >
            <h1
              style={{
                fontSize: "65px",
                marginBottom:
                  "10px",
                color: "#111827",
              }}
            >
              AI Visual Search
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "20px",
              }}
            >
              Explore Fashion
              using AI Powered
              Search
            </p>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "20px",
              marginTop: "35px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() =>
                uploadInputRef.current.click()
              }
              style={{
                background:
                  "linear-gradient(to right,#60a5fa,#2563eb)",
                color: "white",
                border: "none",
                padding:
                  "16px 35px",
                borderRadius:
                  "16px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
                fontSize: "17px",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,0.3)",
              }}
            >
              ⬆ Upload Image
            </button>

            <button
              onClick={() =>
                setCameraOpen(true)
              }
              style={{
                background:
                  "linear-gradient(to right,#c084fc,#7c3aed)",
                color: "white",
                border: "none",
                padding:
                  "16px 35px",
                borderRadius:
                  "16px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
                fontSize: "17px",
                boxShadow:
                  "0 8px 20px rgba(124,58,237,0.3)",
              }}
            >
              📸 Open Camera
            </button>
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search red saree under ₹2000"
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            style={{
              width: "100%",
              marginTop: "35px",
              padding: "20px",
              borderRadius:
                "18px",
              border:
                "1px solid #ddd",
              fontSize: "17px",
              outline: "none",
            }}
          />

          {/* FILTERS */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <select
              value={priceFilter}
              onChange={(e) =>
                setPriceFilter(
                  e.target.value
                )
              }
              style={{
                padding:
                  "14px 18px",
                borderRadius:
                  "14px",
                border:
                  "1px solid #ddd",
                fontSize: "15px",
              }}
            >
              <option>
                All
              </option>
              <option>
                Below 1000
              </option>
              <option>
                1000-3000
              </option>
              <option>
                Above 3000
              </option>
            </select>

            <select
              value={genderFilter}
              onChange={(e) =>
                setGenderFilter(
                  e.target.value
                )
              }
              style={{
                padding:
                  "14px 18px",
                borderRadius:
                  "14px",
                border:
                  "1px solid #ddd",
                fontSize: "15px",
              }}
            >
              <option>
                All
              </option>
              <option>
                Men
              </option>
              <option>
                Women
              </option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              style={{
                padding:
                  "14px 18px",
                borderRadius:
                  "14px",
                border:
                  "1px solid #ddd",
                fontSize: "15px",
              }}
            >
              <option>
                All
              </option>
              <option>
                Clothes
              </option>
              <option>
                Watches
              </option>
              <option>
                Shoes
              </option>
            </select>
          </div>

          {/* IMAGE */}
{image && (
  <div
    style={{
      textAlign:
        "center",
      marginTop: "35px",
    }}
  >
    <img
      src={preview}
      alt="preview"
      style={{
        width: "250px",
        height: "250px",
        objectFit:
          "cover",
        borderRadius:
          "24px",
        border:
          "5px solid #dbeafe",
      }}
    />

    <div
      style={{
        marginTop: "25px",
      }}
    >
      <button
        onClick={
          handleSearch
        }
        style={{
          background:
            "linear-gradient(to right,#2563eb,#7c3aed)",
          color: "white",
          border:
            "none",
          padding:
            "18px 40px",
          borderRadius:
            "16px",
          fontWeight:
            "bold",
          fontSize:
            "18px",
          cursor:
            "pointer",
        }}
      >
        {loading
          ? "Searching..."
          : "🔍 AI Search"}
      </button>
    </div>
  </div>
)}            
              

          {/* CAMERA */}
          {cameraOpen && (
            <div
              style={{
                marginTop: "30px",
              }}
            >
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  width: "100%",
                  borderRadius:
                    "24px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "center",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={
                    capturePhoto
                  }
                  style={{
                    background:
                      "#bbf7d0",
                    border:
                      "none",
                    padding:
                      "14px 24px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "bold",
                    cursor:
                      "pointer",
                  }}
                >
                  📸 Capture
                </button>

                <button
                  onClick={() =>
                    setCameraOpen(
                      false
                    )
                  }
                  style={{
                    background:
                      "#fecaca",
                    border:
                      "none",
                    padding:
                      "14px 24px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "bold",
                    cursor:
                      "pointer",
                  }}
                >
                  ❌ Close
                </button>
              </div>
            </div>
          )}

          {/* FILE INPUT */}
          <input
  type="file"
  accept="image/*"
  ref={uploadInputRef}
  style={{
    display: "none",
  }}
  onChange={(e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setImage(file);

    const imageUrl =
      URL.createObjectURL(
        file
      );

    setPreview(imageUrl);
  }}
/>
        </div>
      </div>

      {/* RECENT SEARCHES */}
      {history.length > 0 && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
            padding: "20px",
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px",
              fontSize: "34px",
            }}
          >
            Recent Searches
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              overflowX: "auto",
            }}
          >
            {history.map((item) => (
              <div
                key={item.id}
                style={{
                  minWidth:
                    "220px",
                  background:
                    "white",
                  borderRadius:
                    "20px",
                  padding: "15px",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "100%",
                    height:
                      "170px",
                    objectFit:
                      "cover",
                    borderRadius:
                      "16px",
                  }}
                />

                <h4>
                  {item.search}
                </h4>

                <p
                  style={{
                    color:
                      "#6b7280",
                    fontSize:
                      "13px",
                  }}
                >
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS */}
      <div
        style={{
          maxWidth: "1450px",
          margin: "auto",
          padding: "30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {filteredResults.map(
          (item) => (
            <div
              key={item.id}
              onClick={() =>
                setSelectedProduct(
                  item
                )
              }
              style={{
                background:
                  "white",
                borderRadius:
                  "28px",
                overflow:
                  "hidden",
                cursor:
                  "pointer",
                transition:
                  "0.3s",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  position:
                    "relative",
                }}
              >
                <img

  src={
    item?.images?.[0] ||
    item?.image ||
    "https://via.placeholder.com/300"
  }
  alt=""
  style={{
    width: "100%",
    height: "420px",
    objectFit: "cover",
  }}
/>
                

                <div
                  style={{
                    position:
                      "absolute",
                    top: "15px",
                    left: "15px",
                    background:
                      "#fee2e2",
                    color:
                      "#dc2626",
                    padding:
                      "8px 14px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "bold",
                  }}
                >
                  {item.offer}% OFF
                </div>
              </div>

              {/* DETAILS */}
              <div
                style={{
                  padding: "20px",
                }}
              >
                <h2>
                  {item.gender}{" "}
                  {item.color}
                </h2>

                <p
                  style={{
                    color:
                      "#6b7280",
                  }}
                >
                  👕{" "}
                  {
                    item.detected_category
                  }
                </p>

                <h1
                  style={{
                    color:
                      "#dc2626",
                  }}
                >
                  ₹{item.price}
                </h1>

                {/* TAGS */}
                <div
                  style={{
                    display:
                      "flex",
                    flexWrap:
                      "wrap",
                    gap: "8px",
                    marginTop:
                      "15px",
                  }}
                >
                  {[
                    item.detected_color,
                    item.pattern,
                    item.style,
                    item.detected_category,
                  ].map(
                    (
                      tag,
                      index
                    ) => (
                      <span
                        key={index}
                        style={{
                          background:
                            "#f3f4f6",
                          padding:
                            "8px 12px",
                          borderRadius:
                            "10px",
                          fontSize:
                            "13px",
                          fontWeight:
                            "600",
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* BUTTONS */}
                <div
                  style={{
                    display:
                      "flex",
                    gap: "10px",
                    flexWrap:
                      "wrap",
                    marginTop:
                      "20px",
                  }}
                >
                  <button
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      setCart([
                        ...cart,
                        item,
                      ]);
                    }}
                    style={{
                      flex: 1,
                      background:
                        "#fde68a",
                      border:
                        "none",
                      padding:
                        "12px",
                      borderRadius:
                        "12px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    🛒 Cart
                  </button>

                  <button
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      setWishlist([
                        ...wishlist,
                        item,
                      ]);
                    }}
                    style={{
                      flex: 1,
                      background:
                        "#fce7f3",
                      border:
                        "none",
                      padding:
                        "12px",
                      borderRadius:
                        "12px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    ❤️ Wishlist
                  </button>

                  <button
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      handleShare(
                        item
                      );
                    }}
                    style={{
                      flex: 1,
                      background:
                        "#dcfce7",
                      border:
                        "none",
                      padding:
                        "12px",
                      borderRadius:
                        "12px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    🔗 Share
                  </button>

                  <button
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation();

                      navigate(
                        "/buy",
                        {
                          state:
                            item,
                        }
                      );
                    }}
                    style={{
                      flex: 1,
                      background:
                        "#bfdbfe",
                      border:
                        "none",
                      padding:
                        "12px",
                      borderRadius:
                        "12px",
                      fontWeight:
                        "bold",
                      cursor:
                        "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* MODAL */}
      {selectedProduct && (
        <div
          onClick={() =>
            setSelectedProduct(
              null
            )
          }
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background:
                "white",
              width: "90%",
              maxWidth:
                "1100px",
              borderRadius:
                "28px",
              padding: "30px",
            }}
          >
            <h1>
              {
                selectedProduct.color
              }
            </h1>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap:
                  "wrap",
                marginTop:
                  "20px",
              }}
            >
              {selectedProduct.images &&
  selectedProduct?.images?.map(
             
                (
                  img,
                  index
                ) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    style={{
                      width:
                        "300px",
                      height:
                        "400px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "18px",
                    }}
                  />
                )
              )}
            </div>

            <h2
              style={{
                marginTop:
                  "20px",
                color:
                  "#dc2626",
              }}
            >
              ₹
              {
                selectedProduct.price
              }
            </h2>

            <button
              onClick={() =>
                setSelectedProduct(
                  null
                )
              }
              style={{
                marginTop:
                  "20px",
                background:
                  "#fecaca",
                border: "none",
                padding:
                  "14px 24px",
                borderRadius:
                  "14px",
                cursor:
                  "pointer",
                fontWeight:
                  "bold",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;