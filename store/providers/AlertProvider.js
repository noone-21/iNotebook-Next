'use client'

import { useState } from "react";
import AlertContext from "@/store/context/alertContext";

const AlertProvider = (props) => {

    const [alert, setAlert] = useState(null)

    const showAlert = (msg, type) => {
      setAlert({
        msg: msg,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }


    return (
        <AlertContext.Provider value={{ showAlert, alert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertProvider