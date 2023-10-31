import React, { useState } from "react";
import { Spinner } from "reactstrap"; 
import { useRecoilValue } from "recoil";
import { spinnerAtom } from "../../recoil/spinner";
const Component = () => {
  let spinner = useRecoilValue(spinnerAtom);
  return (
    <React.Fragment>
      {spinner && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100vw", height: "100vh", zIndex: 1000 }}
        >
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default Component;
