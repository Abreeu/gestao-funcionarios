import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../services/api";
import Logo from "../assets/gestao-func.png";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, senha);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", data.email);
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4 relative overflow-x-hidden font-sans text-[#e8e8f0]">
      <div className="bg-[#0a0a15] border border-white/10 rounded-2xl shadow-xl p-8 max-w-md w-full z-10">
        <div className="text-center mb-8">
          <img
            src={Logo}
            alt="Logo Gestão de Funcionários"
            className="mx-auto mt-4 w-32 h-32 object-contain"
          />
          <h1 className="text-3xl font-extrabold text-white mt-4">
            Gestão de Funcionários
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Faça login para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: admin@empresa.com"
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Teste: admin@empresa.com / admin123</p>
        </div>
      </div>

      <div className="absolute bottom-4 w-full flex justify-center">
        <a
          href="https://github.com/abreeu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors"
        >
          <FaGithub size={32} />
          <span className="text-sm mt-1 font-bold">Abreeu</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
