import { useState } from "react";

/**
 * validity 체크하는 hook
 * @param {"email" || "password"} type
 * @returns
 */
const useValidate = (type) => {
  const [validity, setValidity] = useState(false);
  const [warnList, setWarnList] = useState([]);

  const oncheckValidity = (text) => {
    const warnList = [];
    if (!text) {
      return setValidity(false);
    }
    const regexforValAuth = {
      password: {
        warnText: "",
        fn: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"),
      },
      email: {
        warnText: "",
        fn: new RegExp("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"),
      },
    };
    const { warnText, fn } = regexforValAuth[type];
    if (!fn.test(text)) {
      warnList.push(warnText);
    }

    setWarnList(warnList);
    if (warnList.length > 0) {
      setValidity(false);
    } else {
      setValidity(true);
    }
  };
  return [validity, warnList, oncheckValidity];
};

export default useValidate;
