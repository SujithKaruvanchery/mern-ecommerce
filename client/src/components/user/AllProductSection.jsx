import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function AllProductSection() {
  return (
    <div>
      <div className="relative h-full w-full">
        <img
          src="https://shop.mango.com/cms-assets/v3/assets/blt351b9b24ac05a648/blt25d00a1b99e0e391/67691cdca8278421b1a26e4d/LANDING_ON_ROAD.jpg?imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(3229.5,1144.5)"
          alt="image 1"
          className="w-full h-[600px] object-cover object-top"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Browse Through All Products
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              From timeless classics to the latest trends, discover everything
              we have to offer. Explore our full range and find the perfect
              piece for you.
            </Typography>
            <div>
              <Link to={"/products"}>
                <Button size="lg" color="white" className="rounded-none">
                  View All Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductSection;
