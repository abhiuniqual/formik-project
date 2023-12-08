import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "./Contexts/AuthContext";
import { Suspense } from "react";
import Loader from "./Components/Loader";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
