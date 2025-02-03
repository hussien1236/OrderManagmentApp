import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authentication/AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error,seterror] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    seterror("");
    if (authContext) {
      try{
      await authContext.login(username, password);
      navigate("/customers");
      }catch{
        seterror("Invalid username or password");
    }
  }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" 
      className="w-full p-3 border border-orange-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password"
      className="w-full p-3 border border-orange-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
      onChange={(e) => setPassword(e.target.value)} />
      <button type="submit"
      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">Login</button>
    </form>
    </div>
    </div>
  );
};

export default Login;
