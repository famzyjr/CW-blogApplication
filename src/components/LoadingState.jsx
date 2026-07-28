import React from "react";
import { ThreeDot } from "react-loading-indicators";
const LoadingState = () => {
  return (
    <div className="loading_state">
      <div>
        <ThreeDot
          variant="bounce"
          color="#0b0b0b"
          size="large"
          text="Loading Blog"
          textColor=""
        />
      </div>
    </div>
  );
};

export default LoadingState;
