import { useRecoilValue } from "recoil";
import AuthPage from "./components/AuthPage";
import userAtom from "./atoms/userAtom";
import Logout from "./components/Logout";
import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import MoviePage from "./components/MoviePage";
import WatchListPage from "./components/WatchListPage";
import FavoritesPage from "./components/FavoritesPage";
import CreateMovie from "./components/CreateMovie";
import ManageUsers from "./components/ManageUsers"; // Ensure this import is correct

function App() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  // console.log("Current user:", user); // Log user data for debugging

  return (
    <div
      style={{
        backgroundImage: "url('homebg.jpg')", // Ensure the path is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {user ? <Header /> : ""}
      <Container maxW={"1200px"}>
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/movies/:id" element={user ? <MoviePage /> : <Navigate to="/auth" />} />
          <Route path="/watchlist" element={user && user?.username !== 'yash11' ? <WatchListPage /> : <Navigate to="/auth" />} />
          <Route path="/favorites" element={user && user?.username !== 'yash11' ? <FavoritesPage /> : <Navigate to="/auth" />} />
          <Route path="/create" element={user?.username === 'yash11' ? <CreateMovie /> : <h1>Page Not Found</h1>} />
          <Route path="/manage-users" element={user?.username === 'yash11' ? <ManageUsers /> : <h1>Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
