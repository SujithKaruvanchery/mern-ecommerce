import React from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function SellerProductCards({ product }) {
  return (
    <div>
      <Link to={`/seller/product-details/${product._id}`}>
        <Card className="w-90 mb-1 container rounded-none text-black">
          <CardHeader
            shadow={false}
            floated={false}
            className="h-96 rounded-none"
          >
            <img
              src={product.image}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-1 items-center justify-between">
              <div>{product.title}</div>
            </div>
            <div className="items-center justify-between">
              <div>Rs.{product.price}</div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}

export default SellerProductCards;
