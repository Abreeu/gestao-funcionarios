// URL base da API 
const API_URL = 'http://localhost:8080/api';

// Função que eu vou fazer a chamada  para os Tokens
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
    throw new Error('Não autorizado');
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}

// Função de login
export async function login(email, senha) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Erro ao fazer login');
  }
  
  return data;
}

// Função para listar funcionários
export async function listarFuncionarios() {
  return request('/funcionarios', {
    method: 'GET',
  });
}

// Função para criar funcionário
export async function criarFuncionario(funcionario) {
  return request('/funcionarios', {
    method: 'POST',
    body: JSON.stringify(funcionario),
  });
}
// Função para deletar, vou deixar na espera 
export const deletarFuncionario = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:8080/funcionarios/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Erro ao deletar funcionário');
  return true;
};