import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPosts from "./UserList/UserPosts";
import User from "./UserList/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/userPosts/:userId",
    element: <UserPosts />,
  },
]);
function App() {
  return (
    <div className="text-center">
      <h1 className="p-4 font-extrabold">Directory</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
