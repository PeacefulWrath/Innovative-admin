import { createContext, useContext, useEffect, useState } from "react";



const LoginContext = createContext();

function LoginProvider({ children }) {
 const [loginValidity, setLoginValidity] = useState(false);
 const [adminEmail,setAdminEmail]=useState("")

  return (
    <LoginContext.Provider value={{ loginValidity,setLoginValidity,adminEmail,setAdminEmail}}>
      {children}
    </LoginContext.Provider>
  );
}

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };