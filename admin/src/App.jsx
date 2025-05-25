
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './component/dashboard';
import LoginPage from './component/login';

function App() {

  return (
  <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
