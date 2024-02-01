import Body from "./components/Body";
import Register from "./components/Register";
import Login from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";
function App() {
  const approuter = createBrowserRouter([
    { path: "/users/tasks", element: <Body /> },
    { path: "/users/tasks/details/:task_id", element: <TaskDetails /> },
    { path: "/", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/users/addtask", element: <AddTask /> },
    { path: "/users/details", element: <TaskDetails /> }
  ]);

  return (
    <RouterProvider router={approuter}>
      <Register />
    </RouterProvider>
  );
}

export default App;
