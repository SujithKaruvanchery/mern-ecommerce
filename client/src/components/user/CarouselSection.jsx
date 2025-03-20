import React from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function CarouselSection() {
  return (
    <div className="mt-1 mb-1">
      <Carousel className="rounded-none">
        <div className="relative h-full w-full">
          <img
            src="https://shop.mango.com/cms-assets/v3/assets/blt351b9b24ac05a648/blt8426eb0870977331/674f0552889e771a7a637336/MAN_LANDING.jpg?imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(1024,439)"
            alt="image 1"
            className="w-full h-[600px] object-cover object-top"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Step Up Your Style with Our Men’s Collection
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Where style meets strength and sophistication—our collection is
                designed for the modern man who demands both comfort and class.
              </Typography>
              <div>
                <Link to={"/products/men"}>
                  <Button size="lg" color="white" className="rounded-none">
                    Browse Men’s Fashion
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://shop.mango.com/cms-assets/v3/assets/blt351b9b24ac05a648/blt1c9acd52f7d0aa27/67693fa14b8e236f426bb398/ALTA_LANDING_KIDS_PUNTO.jpg?imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(2332.5,800)"
            alt="image 2"
            className="w-full h-[600px] object-cover object-top"
          />
          <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
            <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Fun, Fashionable, and Fabulous: Explore Our Kids’ Collection
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                Style starts young—our collection is designed to keep your kids
                looking cute and feeling confident, no matter the occasion.
              </Typography>
              <div>
                <Link to={"/products/kids"}>
                  <Button size="lg" color="white" className="rounded-none">
                    Get the Best for Your Little One
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://shop.mango.com/cms-assets/v3/assets/blt351b9b24ac05a648/bltd0674cdaa0fb64ab/67691caac6486761b33ee76a/LANDING_FIESTA_EVENTOS.jpg?imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(819.2,439)"
            alt="image 3"
            className="w-full h-[600px] object-cover object-top"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
            <div className="w-3/4 text-center md:w-2/4">
              <Typography
                variant="h1"
                color="white"
                className="mb-4 text-3xl md:text-4xl lg:text-5xl"
              >
                Embrace Elegance: Explore Our Women’s Collection
              </Typography>
              <Typography
                variant="lead"
                color="white"
                className="mb-12 opacity-80"
              >
                The right dress doesn’t just fit your body—it empowers your
                soul, elevating every moment into something extraordinary
              </Typography>
              <div>
                <Link to={"/products/women"}>
                  <Button size="lg" color="white" className="rounded-none">
                    Explore the Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselSection;
