import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export function AccountPage() {
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();
    const auth = getAuth();

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
            <Navbar user={currentUser} />

            <section>
                <article>
                    <div>Pagina de Perfil</div>
                </article>
            </section>
        </>
    )
}