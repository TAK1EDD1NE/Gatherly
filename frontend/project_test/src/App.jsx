import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EventList from './pages/EventList';
import ConfirmationCode from './pages/ConfirmationCode';
import PasswordReset from './pages/PasswordReset';
import TasksPage from "./pages/TaskPage";
import SallePage from "./pages/SallePage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/forgotPassword";
import StripeId from "./pages/stripeId";
import Reservation from "./pages/reservation";
import CreateEvent from "./pages/createEvent";
import MyTasks from "./pages/MyTasks";
import EventManagement from "./pages/EventManagement";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>        
            <Route exact path="/" element={<LandingPage/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/editprofile" element={<EditProfile/>} />
            <Route path="/employees" element={<EmployeeList/>} />
            <Route path="/mytasks" element={<MyTasks/>} />
            <Route path="/tasks" element={<TasksPage/>} />
            <Route path="/events" element={<EventList/>} />
            <Route path="/salles" element={<SallePage/>} />
            <Route path="/confirm" element={<ConfirmationCode/>} />
            <Route path="/reset-password" element={<PasswordReset/>} />
            <Route path="/signin" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />  
            <Route path="/forgotpassword" element={<ForgotPassword/>} />     
            <Route path="/stripeid" element={<StripeId/>} /> 
            <Route path="/reservation" element={<Reservation/>} />      
            <Route path="/createevent" element={<CreateEvent/>} />
            <Route path="/eventmanagement" element={<EventManagement/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;