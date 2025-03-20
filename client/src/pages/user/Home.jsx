import React from "react";
import AllProductSection from "../../components/user/AllProductSection";
import CarouselSection from "../../components/user/CarouselSection";
import PromoSections from "../../components/user/PromoSections";
import Login from "./Login";

function Home() {
  return (
    <div>
      <div>
        <CarouselSection />
      </div>
      <div>
        <AllProductSection />
      </div>
      <div>
        <PromoSections />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default Home;
