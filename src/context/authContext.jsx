import { createContext, useContext, useEffect, useState } from "react"; // para crear un estado desde un archivo externo
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebaseAuth";

export const authContext = createContext(); // devuelve un objeto, con esto puedo definir un proveerdor y crear o devolver objetos

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //Con este estado, podemos guardar los datos del usuario logueado
  const [loading, setLoading] = useState(true); // Esto es para cuando inicialmente el user está en null

  const signup = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Enviando email de verificación del correo electrónico
      await sendEmailVerification(auth.currentUser);

      //Actualizando el nombre asociado al correo de registro
      await updateProfile(user, {
        displayName,
      });
    } catch (error) {}
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    // Verificando que el correo no esté registrado
    const allUsers = (await axios.get("/usuarios")).data;
    const findUserByEmail = (allUsers, email) =>
      allUsers.find((user) => user.email === email);
    const user = await findUserByEmail(allUsers, result.user.email);
    if (!user) {
      // Envía los datos del usuario a tu servidor de Node.js
      await axios.post("/usuarios", {
        fullName: result.user.displayName,
        userName: result.user.displayName.split(' ')[0],
        image: result.user.photoURL,
        email: result.user.email,
        type: "usuario",
        status: true,
      });
    }
    return result;
  };

  const logout = () => signOut(auth); //Con esta función se puede cerrar sesión

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  ); // De esta manera, todo componente hijo podrá acceder a los datos del componente padre
}
