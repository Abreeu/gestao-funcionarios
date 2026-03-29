import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { listarFuncionarios, criarFuncionario } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [loadingFuncionarios, setLoadingFuncionarios] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    dataAdmissao: '',
    salario: '',
    status: 'ATIVO'
  });

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    carregarFuncionarios();
  }, [navigate]);

  const carregarFuncionarios = async () => {
    try {
      setLoadingFuncionarios(true);
      const data = await listarFuncionarios();
      setFuncionarios(data);
    } catch {
      toast.error('Erro ao carregar funcionários');
    } finally {
      setLoadingFuncionarios(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    toast.success('Logout realizado');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarFuncionario({ ...formData, salario: parseFloat(formData.salario) });
      toast.success('Funcionário cadastrado!');
      setFormData({ nome: '', dataAdmissao: '', salario: '', status: 'ATIVO' });
      setShowForm(false);
      carregarFuncionarios();
    } catch {
      toast.error('Erro ao cadastrar funcionário');
    }
  };

  const formatSalario = (salario) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salario);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Gestão de Funcionários</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{userEmail}</span>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
            Sair
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Funcionários</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {showForm ? 'Cancelar' : '+ Novo Funcionário'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Cadastrar Funcionário</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Salário"
                  value={formData.salario}
                  onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="ATIVO">Ativo</option>
                <option value="INATIVO">Inativo</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Salvar
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loadingFuncionarios ? (
            <div className="text-center py-12">Carregando funcionários...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Nome</th>
                  <th className="px-6 py-3 text-left">Data Admissão</th>
                  <th className="px-6 py-3 text-left">Salário</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-gray-500">
                      Nenhum funcionário cadastrado
                    </td>
                  </tr>
                ) : (
                  funcionarios.map((func) => (
                    <tr key={func.id} className="border-t">
                      <td className="px-6 py-4">{func.nome}</td>
                      <td className="px-6 py-4">{new Date(func.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">{formatSalario(func.salario)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            func.status === 'ATIVO' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {func.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;