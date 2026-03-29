package com.desafio.gestao_funcionarios.controller;

import com.desafio.gestao_funcionarios.dto.FuncionarioRequestDTO;
import com.desafio.gestao_funcionarios.dto.FuncionarioResponseDTO;
import com.desafio.gestao_funcionarios.service.FuncionarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listar() {
        return ResponseEntity.ok(funcionarioService.listarTodos());
    }

    @PostMapping
    public ResponseEntity<FuncionarioResponseDTO> criar(@RequestBody FuncionarioRequestDTO request) {
        FuncionarioResponseDTO response = funcionarioService.criar(request);
        return ResponseEntity.ok(response);
    }
}