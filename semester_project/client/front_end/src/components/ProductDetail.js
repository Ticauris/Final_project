import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./list_products.css";

function ProductDetailScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="product-detail-screen">
      <h1>{product.var_name}</h1>
      <Link to={`/products/${product.id}`}>
        <img className="prod_image" src={product.prod_image} alt={product.id} />
      </Link>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductDetailScreen;
