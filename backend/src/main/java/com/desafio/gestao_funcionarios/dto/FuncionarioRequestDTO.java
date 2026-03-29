package com.desafio.gestao_funcionarios.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FuncionarioRequestDTO {
    private String nome;
    private LocalDate dataAdmissao;
    private BigDecimal salario;
    private String status;
}