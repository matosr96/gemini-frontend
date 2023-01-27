import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./constants-definitions/Routes";
import Institution from "./screens/institution/institution";
import Inventary from "./screens/inventary/inventary";
import Signin from "./screens/signin/signin";
import Signup from "./screens/signup/signup";
import Welcome from "./screens/welcome/welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PublicRoutes.SIGNIN} element={<Signin />} />
        <Route path={PublicRoutes.SIGNUP} element={<Signup />} />
        <Route path={PrivateRoutes.WELCOME} element={<Welcome />} />
        <Route path={PrivateRoutes.REGISTER_INSTITUTION} element={<Institution />} />
        <Route path={PrivateRoutes.INVENTARY} element={<Inventary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
