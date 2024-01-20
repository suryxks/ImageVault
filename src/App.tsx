import { BrowserRouter } from "react-router-dom";
import { AppRoutes, Toast } from "./components";
import { GlobalStyles } from "./GlobalStyles";
function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toast />
      <GlobalStyles />
    </>
  );
}

export default App;
