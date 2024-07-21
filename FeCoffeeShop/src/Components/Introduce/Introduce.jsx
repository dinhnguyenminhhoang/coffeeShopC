import React from "react";
import HeroImg from "@/assets/coffee2.png";

const Introduce = () => {
    return (
        <div className="min-h-[90.5vh]  bg-brandDark flex justify-center items-center text-white">
            <div className="container pb-8 sm:pb-0">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div className="order-2 sm:order-1 flex flex-col justify-center gap-6">
                        <h1
                            data-aos="fade-up"
                            data-aos-once="true"
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                        >
                            Chào mừng đến với
                            <span
                                data-aos="zoom-out"
                                data-aos-delay="300"
                                className="text-primary font-cursive text-5xl ml-2"
                            >
                                COFFEE HOUSE
                            </span>{" "}
                        </h1>
                        {/* <div data-aos="fade-up" data-aos-delay="400">
                            <button className="bg-gradient-to-r from-primary to-secondary border-2 border-primary rounded-full px-4 py-2 text-white hover:scale-105 duration-200">
                                Coffee with Code
                            </button>
                        </div> */}
                    </div>
                    {/*Image section*/}
                    <div
                        data-aos="zoom-in"
                        className="min-h-[450px] flex justify-center items-center order-1 sm:order-2 relative"
                    >
                        <img
                            src={HeroImg}
                            alt=""
                            className="w-[300px] sm:w-[450px] sm:scale-110 m-auto spin"
                        />
                        <div
                            data-aos="fade-left"
                            className="bg-gradient-to-r from-primary to-secondary absolute top-10 left-10 p-3 rounded-xl"
                        >
                            <h1>Coffee Lovers</h1>
                        </div>
                        <div
                            data-aos="fade-right"
                            className="bg-gradient-to-r from-primary to-secondary absolute bottom-10 right-10 p-3 rounded-xl"
                        >
                            <h1>Drink Coffee</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduce;
