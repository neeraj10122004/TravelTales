import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Signin } from './pages/Signin';
import { Userpage } from './pages/Userpage';
import axios from 'axios'; // Import axios

function App() {
  const [auth, setAuth] = useState(false); // To manage authentication status
  const [user, setUser] = useState(null); // To store user data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [umail, setUmail] = useState(""); // To store email

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get("email");
        setUmail(email);

        if (email) {
          const response = await axios.get(
            "https://3000-neeraj10122-traveltales-40o2lf52eu2.ws-us117.gitpod.io/user",
            { params: { email } }
          );
          setUser(response.data);
          setAuth(true); // Set authentication to true when data is successfully fetched
          localStorage.setItem('user',umail)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  // Render the SignIn page if not authenticated
  if (!auth) {
    return <Signin />;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={<Home mail={umail} name={user?.name} photo={user?.photourl} />}
          />
          <Route
            path="/about"
            element={<About mail={umail} name={user?.name} photo={user?.photourl} />}
          />
          <Route path="/" element={<Signin />} />
          <Route
            path="/userpage"
            element={<Userpage mail={umail} name={user?.name} photo={user?.photourl} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
