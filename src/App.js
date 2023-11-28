import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Route from "./routers";
import Spinner from "./components/Spinner";
import { spinnerAtom } from "./recoil/spinner";
import { GetAll } from "./services/notification.service";
import { notificationAtom } from "./recoil/notification";
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/themes.scss";
import "./App.css";

function App() {
  const [_, setSpinner] = useRecoilState(spinnerAtom);
  const [notifications, setNotifications] = useRecoilState(notificationAtom);
  const spinner = useRecoilValue(spinnerAtom);

  useEffect(() => {
    // const getUsers = async () => {
    //     try {
    //         const user = await GetCurrentUser();
    //         GetAll({ user_id: user.id })
    //             .then((res) => {
    //                 setNotifications(res);
    //             })
    //             .catch(() => {});
    //         setCurrentUser(user);
    //     } catch (error) {
    //         console.log(error);
    //     }
    setSpinner(false);
    // };
    // getUsers();
    return () => {};
  }, [setSpinner, setNotifications]);

  return (
    <React.Fragment>
      <Spinner />
      {!spinner && <Route />}
    </React.Fragment>
  );
}

export default App;
