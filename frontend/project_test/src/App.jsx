import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EventList from './pages/EventList';
import ConfirmationCode from './pages/ConfirmationCode';
import PasswordReset from './pages/PasswordReset';
import TasksPage from "./pages/TaskPage";
import SallePage from "./pages/SallePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>        
            <Route exact path="/" element={<LandingPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/employees" element={<EmployeeList/>} />
            <Route path="/tasks" element={<TasksPage/>} />
            <Route path="/events" element={<EventList/>} />
            <Route path="/salles" element={<SallePage/>} />
            <Route path="/confirm" element={<ConfirmationCode/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;