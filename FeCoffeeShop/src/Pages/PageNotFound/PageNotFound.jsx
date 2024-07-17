import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="wrapper">
            <h1>404 Page Not Found</h1>

            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <Link to={"/"} className="more-link">
                    RETURN PAGE
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
