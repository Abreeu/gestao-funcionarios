import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  listarFuncionarios,
  criarFuncionario,
  deletarFuncionario,
} from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    dataAdmissao: "",
    salario: "",
    status: "ATIVO",
  });

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const carregarFuncionarios = async () => {
      try {
        setLoadingFuncionarios(true);
        const data = await listarFuncionarios();
        setFuncionarios(data);
      } catch {
        toast.error("Erro ao carregar funcionários");
      } finally {
        setLoadingFuncionarios(false);
      }
    };

    carregarFuncionarios();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    toast.success("Logout realizado");
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarFuncionario({
        ...formData,
        salario: parseFloat(formData.salario),
      });
      toast.success("Funcionário cadastrado!");
      setFormData({ nome: "", dataAdmissao: "", salario: "", status: "ATIVO" });
      setShowForm(false);

      setFuncionarios((prev) => [
        ...prev,
        { ...formData, salario: parseFloat(formData.salario), id: Date.now() },
      ]);
    } catch {
      toast.error("Erro ao cadastrar funcionário");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este funcionário?"))
      return;
    try {
      await deletarFuncionario(id);
      toast.success("Funcionário excluído!");
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      toast.error(err.message || "Erro ao excluir funcionário");
    }
  };

  const formatSalario = (salario) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(salario);

  const totalAtivos = funcionarios.filter((f) => f.status === "ATIVO").length;
  const totalSalarios = funcionarios.reduce(
    (acc, f) => acc + (f.salario || 0),
    0,
  );

  if (!localStorage.getItem("token")) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#0a0a0f] text-[#e8e8f0] font-sans overflow-x-hidden">
      <div className="fixed -top-50 -left-50 w-150 h-150 rounded-full bg-gradient-radial from-[#6366f11f] to-transparent pointer-events-none z-0"></div>
      <div className="fixed -bottom-50 -right-25 w-125 h-125 rounded-full bg-gradient-radial from-[#14b8a614] to-transparent pointer-events-none z-0"></div>

      <nav className="sticky top-0 z-50 flex items-center justify-between px-10 h-16 bg-[rgba(10,10,15,0.85)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2 font-syne font-extrabold text-white text-lg">
          <span className="w-2 h-2" />
          Gestão de Funcionários
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs text-white/40">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-1 border border-white/10 text-white/50 rounded-lg text-xs font-sans hover:border-red-400/50 hover:bg-red-600/5 hover:text-red-400 transition cursor-pointer"
          >
            Sair
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-300 mx-auto px-10 py-12 md:px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-indigo-500 mb-1">
              Painel de controle
            </p>
            <h1 className="font-syne font-extrabold text-3xl text-white leading-none">
              Funcionários
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-3 rounded-xl font-medium text-sm text-white transition shadow-lg bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${
              showForm
                ? " bg-red-600 hover:bg-red-700 font-medium text-white hover:translate-y-0"
                : ""
            }`}
          >
            {showForm ? "✕ Cancelar" : "+ Novo Funcionário"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative bg-white/5 border border-white/7 rounded-2xl p-6 hover:border-white/14 transition">
            <p className="text-xs font-medium uppercase tracking-wide text-white/35 mb-3">
              Total de funcionários
            </p>
            <p className="font-syne font-bold text-2xl text-white">
              {funcionarios.length}
            </p>
          </div>
          <div className="relative bg-white/5 border border-white/7 rounded-2xl p-6 hover:border-white/14 transition">
            <p className="text-xs font-medium uppercase tracking-wide text-white/35 mb-3">
              Funcionários ativos
            </p>
            <p className="font-syne font-bold text-2xl text-green-400">
              {totalAtivos}
            </p>
          </div>
          <div className="relative bg-white/5 border border-white/7 rounded-2xl p-6 hover:border-white/14 transition">
            <p className="text-xs font-medium uppercase tracking-wide text-white/35 mb-3">
              Folha de pagamento
            </p>
            <p className="font-syne font-bold text-xl md:text-2xl text-green-400">
              {formatSalario(totalSalarios)}
            </p>
          </div>
        </div>

        {showForm && (
          <div className="bg-white/5 border border-white/8 rounded-2xl p-8 mb-6 animate-slideDown">
            <h3 className="font-syne font-bold text-lg text-white mb-6">
              Cadastrar novo funcionário
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-indigo-400 focus:bg-indigo-900/5 outline-none transition"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) =>
                    setFormData({ ...formData, dataAdmissao: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-indigo-400 focus:bg-indigo-900/5 outline-none transition"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Salário (R$)"
                  value={formData.salario}
                  onChange={(e) =>
                    setFormData({ ...formData, salario: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-indigo-400 focus:bg-indigo-900/5 outline-none transition"
                  required
                />
              </div>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-indigo-400 focus:bg-indigo-900/5 outline-none transition"
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-700 rounded-lg px-4 py-3 font-medium text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
              >
                Salvar funcionário
              </button>
            </form>
          </div>
        )}

        <div className="bg-white/5 border border-white/7 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-[2fr_1.2fr_1.2fr_1fr] bg-white/5 border-b border-white/6 px-7 py-3">
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              Nome
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              Admissão
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/30">
              Salário
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-white/30 hidden md:inline">
              Status / Ações
            </span>
          </div>

          {loadingFuncionarios ? (
            <div className="py-16 text-center text-white/30 text-sm">
              Carregando<span className="animate-pulse">...</span>
            </div>
          ) : funcionarios.length === 0 ? (
            <div className="py-16 text-center text-white/20 text-sm">
              Nenhum funcionário cadastrado ainda
            </div>
          ) : (
            funcionarios.map((func, i) => (
              <div
                key={func.id}
                className="grid grid-cols-3 md:grid-cols-[2fr_1.2fr_1.2fr_1fr] px-7 py-4 border-b border-white/5 items-center hover:bg-white/5 transition"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationName: "fadeRow",
                  animationDuration: "0.3s",
                  animationFillMode: "both",
                }}
              >
                <span className="text-white font-medium">{func.nome}</span>
                <span className="text-white/50 text-sm">
                  {new Date(func.dataAdmissao).toLocaleDateString("pt-BR")}
                </span>
                <span className="text-white font-medium">
                  {formatSalario(func.salario)}
                </span>
                <div className="flex items-center gap-2 justify-end">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      func.status === "ATIVO"
                        ? "text-teal-400 border border-teal-200"
                        : "bg-white/5 text-white/30 border border-white/8"
                    }`}
                  >
                    {func.status === "ATIVO" ? "Ativo" : "Inativo"}
                  </span>
                  <button
                    onClick={() => handleDelete(func.id)}
                    className="text-red-500 border rounded-full border-red-500 hover:text-red-400 text-xs font-medium px-2 py-1 hover:bg-red-600/10 transition cursor-pointer"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <style>
        {`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeRow {
            from { opacity: 0; transform: translateX(-8px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
