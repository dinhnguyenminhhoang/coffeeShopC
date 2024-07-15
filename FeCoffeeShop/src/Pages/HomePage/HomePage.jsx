import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

import Banner from "@/Components/Banner/Banner";
import Footer from "@/Components/Footer/Footer";
import Introduce from "@/Components/Introduce/Introduce";
import Navbar from "@/Components/Navbar/Navbar";
import Services from "@/Components/Services/Services";
import Testimonial from "@/Components/Testimonial/Testimonial";

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
            <Navbar />
            <Introduce />
            <Services />
            <Banner />
            <Testimonial />
            <Footer />
        </div>
    );
};

export default HomePage;
