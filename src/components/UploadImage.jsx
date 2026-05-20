import { useState } from "react"
import axios from "axios"

function UploadImage({
  setSearchResults,
  setLoading
}) {

  const [image, setImage] = useState(null)

  const [preview, setPreview] = useState(null)

  const [query, setQuery] = useState("")


  const handleImage = (e) => {

    const file = e.target.files[0]

    setImage(file)

    setPreview(
      URL.createObjectURL(file)
    )
  }


  const handleUpload = async () => {

    const formData = new FormData()

    formData.append("image", image)

    formData.append("query", query)

    try {

      setLoading(true)

      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/search/",
        formData
      )

      setSearchResults(
        response.data
      )

      setLoading(false)

    } catch (error) {

      console.log(error)

      setLoading(false)
    }
  }


  return (

    <div className="mb-5">

      <input
        type="file"
        className="form-control"
        onChange={handleImage}
      />


      <input
        type="text"
        placeholder="Find similar but in red under ₹2000"
        className="form-control mt-3"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />


      {
        preview && (

          <div className="mt-4">

            <img
              src={preview}
              alt="preview"
              style={{
                width: "250px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />

          </div>
        )
      }


      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
      >
        AI Search
      </button>

    </div>
  )
}

export default UploadImage