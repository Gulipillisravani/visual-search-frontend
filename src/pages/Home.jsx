import axios from "axios"
import { useEffect, useState } from "react"

import UploadImage from "../components/UploadImage"


function Home() {

  const [products, setProducts] = useState([])

  const [searchResults, setSearchResults] = useState([])

  const [loading, setLoading] = useState(false)


  useEffect(() => {

    fetchProducts()

  }, [])


  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      )

      setProducts(response.data)

    } catch (error) {

      console.log(error)
    }
  }


  return (

    <div className="container py-5">

      {/* Heading */}
      <h1 className="text-center mb-5 fw-bold">
        AI Visual Search Engine
      </h1>


      {/* Upload Section */}
      <div className="d-flex flex-column align-items-center mb-5">

        <h3 className="mb-4">
          Upload Image
        </h3>

        <UploadImage
          setSearchResults={setSearchResults}
          setLoading={setLoading}
        />

      </div>


      {/* Loading */}
      {
        loading && (

          <h4 className="text-center mb-4">
            Searching...
          </h4>
        )
      }


      {/* No Results */}
      {
        searchResults.length === 0 && !loading && (

          <p className="text-center text-muted mb-5">
            No similar products searched yet
          </p>
        )
      }


      {/* Similar Products */}
      {
        searchResults.length > 0 && (

          <div className="mb-5">

            <h2 className="text-center mb-4">
              Similar Products
            </h2>

            <div className="row justify-content-center">

              {
                searchResults.map((item) => (

                  <div
                    className="col-md-3 col-sm-6 mb-4"
                    key={item.id}
                  >

                    <div className="card shadow h-100">

                      <img
                        src={`http://127.0.0.1:8000${item.image}`}
                        alt={item.name}
                        className="card-img-top"
                        style={{
                          height: "250px",
                          objectFit: "cover"
                        }}
                      />

                      <div className="card-body text-center">

                        <h5>{item.name}</h5>

                        <p>{item.brand}</p>

                        <p className="fw-bold">
                          ₹ {item.price}
                        </p>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>

          </div>
        )
      }


      {/* All Products */}
      <h2 className="text-center mb-4">
        All Products
      </h2>

      <div className="row justify-content-center">

        {
          products.map((item) => (

            <div
              className="col-md-3 col-sm-6 mb-4"
              key={item.id}
            >

              <div className="card shadow h-100">

                <img
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body text-center">

                  <h5>{item.name}</h5>

                  <p>{item.brand}</p>

                  <p className="fw-bold">
                    ₹ {item.price}
                  </p>

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Home
