// // frontend/src/components/VisualLens.jsx

// import { useState } from "react";

// export default function VisualLens() {

//   const [image, setImage] = useState(null);

//   const [results, setResults] = useState([]);

//   const [loading, setLoading] = useState(false);


//   const handleSearch = async () => {

//     if (!image) {

//       alert("Please upload image");

//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();

//     formData.append("image", image);

//     try {

//       const response = await fetch(
//         "http://127.0.0.1:8000/api/products/search/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       setResults(data);

//     } catch (error) {

//       console.log(error);

//     }

//     setLoading(false);
//   };


//   return (

//     <div className="min-h-screen bg-gray-100">

//       {/* Header */}
//       <header className="bg-black text-white p-5 flex justify-between items-center">

//         <h1 className="text-3xl font-bold">
//           AI Visual Search
//         </h1>

//       </header>


//       {/* Main */}
//       <div className="max-w-6xl mx-auto p-6">

//         {/* Upload Section */}
//         <div className="bg-white rounded-xl shadow p-8">

//           <h2 className="text-2xl font-bold mb-6">
//             Upload Image
//           </h2>

//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="mb-4"
//           />

//           {/* Image Preview */}
//           {
//             image && (

//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="preview"
//                 className="w-64 h-64 object-cover rounded-lg mb-6"
//               />
//             )
//           }

//           <button
//             onClick={handleSearch}
//             className="bg-black text-white px-6 py-3 rounded-lg"
//           >

//             {
//               loading
//                 ? "Searching..."
//                 : "AI Search"
//             }

//           </button>

//         </div>


//         {/* Results */}
//         <div className="mt-10">

//           <h2 className="text-3xl font-bold mb-6">
//             Similar Products
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//             {
//               results.map((item) => (

//                 <div
//                   key={item.id}
//                   className="bg-white rounded-xl shadow overflow-hidden"
//                 >

//                   <img
//                     src={`http://127.0.0.1:8000${item.image}`}
//                     alt={item.name}
//                     className="w-full h-64 object-cover"
//                   />

//                   <div className="p-4">

//                     <h2 className="text-xl font-bold">
//                       {item.name}
//                     </h2>

//                     <p className="text-gray-500">
//                       {item.brand}
//                     </p>

//                     <p className="text-gray-500">
//                       {item.category}
//                     </p>

//                     <p className="text-lg font-semibold mt-2">
//                       ₹{item.price}
//                     </p>

//                   </div>

//                 </div>
//               ))
//             }

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }