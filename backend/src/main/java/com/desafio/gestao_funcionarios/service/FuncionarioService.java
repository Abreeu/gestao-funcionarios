package com.desafio.gestao_funcionarios.service;

import com.desafio.gestao_funcionarios.dto.FuncionarioRequestDTO;
import com.desafio.gestao_funcionarios.dto.FuncionarioResponseDTO;
import com.desafio.gestao_funcionarios.model.Funcionario;
import com.desafio.gestao_funcionarios.repository.FuncionarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public List<FuncionarioResponseDTO> listarTodos() {
        return funcionarioRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public FuncionarioResponseDTO criar(FuncionarioRequestDTO request) {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(request.getNome());
        funcionario.setDataAdmissao(request.getDataAdmissao());
        funcionario.setSalario(request.getSalario());
        funcionario.setStatus(request.getStatus());

        Funcionario saved = funcionarioRepository.save(funcionario);
        return toResponseDTO(saved);
    }

    private FuncionarioResponseDTO toResponseDTO(Funcionario funcionario) {
        return new FuncionarioResponseDTO(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getDataAdmissao(),
                funcionario.getSalario(),
                funcionario.getStatus()
        );
    }
}