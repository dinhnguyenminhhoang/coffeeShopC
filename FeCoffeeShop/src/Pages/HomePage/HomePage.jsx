import React, { useEffect, Suspense, lazy, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spiner from "@/Components/Spiner/Spiner";
import UploadImage from "../../Components/UploadImage/UploadImage";
const Banner = lazy(() => import("@/Components/Banner/Banner"));
const Introduce = lazy(() => import("@/Components/Introduce/Introduce"));
const Services = lazy(() => import("@/Components/Services/Services"));
const Testimonial = lazy(() => import("@/Components/Testimonial/Testimonial"));
const ProductShow = lazy(() => import("@/Components/ProductShow/ProductShow"));

const HomePage = () => {
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 700,
            easing: "ease-in",
            delay: 100,
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            <Suspense fallback={<Spiner />}>
                <Introduce />
            </Suspense>
            <Suspense fallback={<Spiner />}>
                <Services />
            </Suspense>
            <Suspense fallback={<Spiner />}>
                <ProductShow />
            </Suspense>
            <Suspense fallback={<Spiner />}>
                <Banner />
            </Suspense>
            <Suspense fallback={<Spiner />}>
                <Testimonial />
            </Suspense>
        </div>
    );
};

export default HomePage;
