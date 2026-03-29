package com.desafio.gestao_funcionarios.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FuncionarioResponseDTO {
    private Long id;
    private String nome;
    private LocalDate dataAdmissao;
    private BigDecimal salario;
    private String status;

    public FuncionarioResponseDTO(Long id, String nome, LocalDate dataAdmissao, BigDecimal salario, String status) {
        this.id = id;
        this.nome = nome;
        this.dataAdmissao = dataAdmissao;
        this.salario = salario;
        this.status = status;
    }
}