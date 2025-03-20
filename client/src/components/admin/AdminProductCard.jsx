import React from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function AdminProductCard({ product, onDelete }) {
  return (
    <div>
      <Link to={`/admin/product-details/${product._id}`}>
        <Card className="w-90 mb-1 container rounded-none text-black">
          <CardHeader
            shadow={false}
            floated={false}
            className="h-96 rounded-none"
          >
            <img
              src={product.image}
              alt="product"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-1">
              <div>{product.title}</div>
            </div>
            <div className="mb-2">Rs.{product.price}</div>
            <div className="flex gap-2"></div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}

export default AdminProductCard;
