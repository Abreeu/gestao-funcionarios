package com.desafio.gestao_funcionarios.repository;

import com.desafio.gestao_funcionarios.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}