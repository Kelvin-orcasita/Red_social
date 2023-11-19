import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/register.js";
import { Navbar } from "./components/Navbar.jsx";
import { ContentHome } from "./components/ContentHome.jsx";

export function HomePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = auth.currentUser;
    if (user) { 
      setCurrentUser(user)
    } else {
      navigate('/');
    }
  }, []);


  return (
    <>
      <section>
        <article>
          <Navbar user={currentUser} />
        </article>
      </section>

      <ContentHome user={currentUser}/>
      
    </>
  )

}
