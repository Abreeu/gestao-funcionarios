-- Migration V2: Inserção de dados iniciais

-- Inserindo usuário admin
-- Senha: admin123 (criptografada com BCrypt)
INSERT INTO usuario (email, senha)
VALUES (
  'admin@empresa.com',
  '$2a$10$G/0MakO3PszbCbh1GvwsUuS6pmwDCbXSfo2PDwG.JGApmfSsE.Jti'
);

-- Funcionários
INSERT INTO funcionario (nome, data_admissao, salario, status)
VALUES ('João Silva', '2023-01-15', 3500.00, 'ATIVO');

INSERT INTO funcionario (nome, data_admissao, salario, status)
VALUES ('Maria Santos', '2023-03-20', 4200.00, 'ATIVO');