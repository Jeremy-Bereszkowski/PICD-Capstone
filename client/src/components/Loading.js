import React from "react";
const loading =
    "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
    <div className="">
        <div className="d-flex justify-content-center">
            <div className="spinner">
                <img src={loading} alt="Loading" />
            </div>
        </div>
    </div>
);

export default Loading;
