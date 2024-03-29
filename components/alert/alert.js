'use client'

import AlertContext from "@/store/context/alertContext";
import { useContext } from "react";

export default function Alert() {

    const alertCtx = useContext(AlertContext)


  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'error'
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{height: "50px"}} >
      {alertCtx.alert && <div className={`alert alert-${alertCtx.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{alertCtx.alert.type==='warning'?'':`${capitalize(alertCtx.alert.type)}:`}</strong> {alertCtx.alert.msg}
      </div>}
    </div>

  )
}