import { Routes, Route, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import de PropTypes
import UserForm from "./UserForm";
//import LoginForm from "./LoginForm";
import DocForm from "./DocForm";
import DocSearchForm from "./DocSearchForm";
import Home from "../src/Home";
import AuthWrapper from "./AuthWrapper";
import Navbar from "./Navbar";

import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import UserList from "./UserList";
import Page from "./Page";
import UserProfile from "./UserProfile";
import DocList from "./DocList";
import DocTaskList from "./DocTaskList ";
import TaskManager from "./TaskManager";

const AppRoutes = ({
  isAuthenticated,
  user,
  handleLogout,
 
}) => {
  const location = useLocation();

  return (
    <>
      <Navbar
        user={user}        
        onLogout={handleLogout}
        currentPath={location.pathname}
      />

      <Routes>
        <Route
          path="/profil"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <UserProfile
                user={user}                
                onLogout={handleLogout}
              />
            </AuthWrapper>
          }
        />

        <Route
          path="/"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <Home
                user={user}
                 onLogout={handleLogout}
              />
            </AuthWrapper>
          }
        />
        <Route
          path="/enroll-user"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <UserForm />
            </AuthWrapper>
          }
        />
      
        <Route
          path="/add-doc"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <DocForm user={user} />
            </AuthWrapper>
          }
        />
        <Route
          path="/search-doc"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <DocSearchForm user={user} />
            </AuthWrapper>
          }
        />
        <Route
          path="/list-doc"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <DocList user={user} />
            </AuthWrapper>
          }
        />
        <Route
          path="/tasklist"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <DocTaskList user={user} />
            </AuthWrapper>
          }
        />
        <Route
          path="/taskmanager"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <TaskManager user={user} />
            </AuthWrapper>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <Dashboard />
            </AuthWrapper>
          }
        />
        <Route
          path="/user-list"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <UserList />
            </AuthWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <Page />
            </AuthWrapper>
          }
        />
      </Routes>
    </>
  );
};
// Validation des props
AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default AppRoutes;
