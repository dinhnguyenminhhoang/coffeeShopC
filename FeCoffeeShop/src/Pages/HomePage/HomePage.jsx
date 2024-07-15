import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

import Banner from "@/Components/Banner/Banner";
import Footer from "@/Components/Footer/Footer";
import Introduce from "@/Components/Introduce/Introduce";
import Navbar from "@/Components/Navbar/Navbar";
import Services from "@/Components/Services/Services";
import Testimonial from "@/Components/Testimonial/Testimonial";
import ProductShow from "../../Components/ProductShow/ProductShow";

const HomePage = () => {
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 700,
            easing: "ease-in",
            delay: 100,
        });
    });
    return (
        <div className="overflow-x-hidden">
            <Introduce />
            <Services />
            <ProductShow />
            <Banner />
            <Testimonial />
        </div>
    );
};

export default HomePage;
