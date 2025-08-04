
import './App.css';
import LoginPage from './components/Login';
import { Suspense} from "react";
import { useRoutes, Routes, Route, BrowserRouter as Router} from "react-router-dom";
import  ManagerDashboard  from './pages/ManagerDashboard';
import EmployeeDashboard  from './pages/EmployeeDashboard';
import ErrorDashboard from './pages/Error';
function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
      {/* <ScrollToTop />      */}
      <Router>
      <Routes>
        {/* <Route path="/test" element={ <Test />} /> */}
        <Route path="/manager" element={ <ManagerDashboard/>} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/notfound" element={<ErrorDashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
      </Router>
      </>
    </Suspense>
  );
}
export default App;
