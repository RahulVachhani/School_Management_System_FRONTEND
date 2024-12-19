import Login from "./Components/Login";
import Navbar from "./Components/Navbar"
import Register from "./Components/Register"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

import ProtectedRoutes from "./Components/ProtectedRoutes";
import Topbar from "./Components/Topbar";
import { useEffect, useState, createContext, useContext } from "react";
import api from "../api";
import ShowStudents from "./Components/Student/ShowStudents";
import AddStudent from "./Components/Student/AddStudent";
import AddClass from "./Components/Classes/AddClass";
import ShowEnrollClass from "./Components/Classes/ShowEnrollClass";
import ShowAllClass from "./Components/Classes/ShowAllClass";
import ClassDetails from "./Components/Classes/ClassDetails"
import ShowAllAssignment from "./Components/Assignments/ShowAllAssignment";
import SubmitAssignment from "./Components/Assignments/SubmitAssignment";
import CreateAssignment from "./Components/Assignments/CeateAssignment";
import ClassAssignment from "./Components/Assignments/ClassAssignment";
import TakeAttendance from "./Components/Attendance/TakeAttendance";
import ShowAttendance from "./Components/Attendance/ShowAttendance";
import GroupChat from "./Components/GroupChat/GroupChatApp";
import AddStudentInClass from "./Components/Classes/AddStudentInClass";
import RemoveStudentFromClass from "./Components/Classes/RemoveStudentFromClass";
import GradeDownload from "./Download"
import NotificationList from "./Notification";
import NotificationProvide from "./NotificationContext";

const UserContext = createContext();


export function useUser() {
  return useContext(UserContext);
}

function Logout() {
  const { setUserState } = useUser();

  useEffect(() => {
    localStorage.clear();
    setUserState({ role: null, data: {} });
  }, [setUserState]);

  return <Navigate to="/login" />;
}

function App() {
  const [userState, setUserState] = useState({ role: null, data: {} });

  const getData = async () => {
    const token = localStorage.getItem('access')

    if (token) {
      const res = await api.get("api/user/info/")

      if (res.data) {

        console.log("seting data")
        setUserState({
          role: res.data.role,
          data: res.data.data

        });

      }
      else {
        setUserState({ role: null, data: {} })
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])



  return (
    <>
       
      <UserContext.Provider value={{ ...userState, getData, setUserState }}>
              <NotificationProvide>

        <div className="flex flex-col md:flex-row">
          <Router>

            <div className="w-full md:w-2/12 min-h-screen bg-blue-50 text-gray-700 shadow-lg py-10 px-6 space-y-6">
              <Navbar />
            </div>


            <div className="w-full md:w-10/12 flex flex-col">

              <Topbar />


              <div className="flex-grow pt-10 px-6">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoutes>
                        <Home data={userState.data} />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <Register />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Login getData={getData} />
                    }
                  />
                  <Route
                    path="/logout"
                    element={
                      <Logout getData={getData} />
                    }
                  />
                  <Route
                    path="/show-students"
                    element={
                      <ShowStudents />
                    }
                  />
                  <Route

                    path="/add-student"
                    element={
                      <ProtectedRoutes>
                        <AddStudent />
                      </ProtectedRoutes>
                    }
                  />
                  <Route

                    path="/add-class"
                    element={
                      <ProtectedRoutes>
                        <AddClass />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/show-classes"
                    element={
                      <ProtectedRoutes>
                        <ShowEnrollClass />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/show-all-classes"
                    element={
                      <ProtectedRoutes>
                        <ShowAllClass />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/show-class-details/:id"
                    element={
                      <ProtectedRoutes>
                        <ClassDetails />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/show-assignment"
                    element={
                      <ProtectedRoutes>
                        <ShowAllAssignment />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/submit-assignment/:sid/:aid/:ver"
                    element={
                      <ProtectedRoutes>
                        <SubmitAssignment />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/create-assignment/:sid/:cid"
                    element={
                      <ProtectedRoutes>
                        <CreateAssignment />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/class-assignment/:cid/:sid"
                    element={
                      <ProtectedRoutes>
                        <ClassAssignment />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/take-attendance"
                    element={
                      <ProtectedRoutes>
                        <TakeAttendance />
                      </ProtectedRoutes>
                    }
                  />


                  <Route
                    path="/show-attendance"
                    element={
                      <ProtectedRoutes>
                        <ShowAttendance />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/group-chat"
                    element={
                      <ProtectedRoutes>
                        <GroupChat />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/add-student-class/:cid"
                    element={
                      <ProtectedRoutes>
                        <AddStudentInClass />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/remove-student/:cid"
                    element={
                      <ProtectedRoutes>
                        <RemoveStudentFromClass />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="/grade-download/:cid"
                    element={
                      <ProtectedRoutes>
                        <GradeDownload />
                      </ProtectedRoutes>
                    }
                  />

                  <Route
                    path="/notification"
                    element={
                      <ProtectedRoutes>
                        <NotificationList />
                      </ProtectedRoutes>
                    }
                  />
                </Routes>
              </div>
            </div>
          </Router>
        </div>
        </NotificationProvide>

      </UserContext.Provider>
    </>
  );
}

export default App;

