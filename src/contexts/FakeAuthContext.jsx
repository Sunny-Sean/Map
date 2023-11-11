import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
};

const srcSean = "/sean.jpg";
// const imagePath = path.join(__dirname, "../public", "100.jpg");

const FAKE_USER = {
  name: "SunnySean",
  email: "SunnySean@example.com",
  password: "xanxan",
  // avatar: "https://i.pravatar.cc/100",
  avatar: srcSean,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error("Sai thông tin đăng nhập");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Lỗi đăng nhập");
  return context;
}

export { AuthProvider, useAuth };
