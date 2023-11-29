import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Route from "./routers";
import Spinner from "./components/Spinner";
import { spinnerAtom } from "./recoil/spinner";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/themes.scss";

function App() {
  const [_, setSpinner] = useRecoilState(spinnerAtom);
  const spinner = useRecoilValue(spinnerAtom);

  useEffect(() => {
    setSpinner(false);

    return () => {};
  }, [setSpinner]);

  return (
    <React.Fragment>
      <Spinner />
      {!spinner && <Route />}
    </React.Fragment>
  );
}

export default App;
