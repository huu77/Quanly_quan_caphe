import { RouterProvider, useNavigate } from "react-router-dom";
import { routers } from "./modules/router";
import { useEffect } from "react";


function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accesstoken')?.split('.');
    if (token?.length === 3) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
