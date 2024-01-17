// __tests__/MemoryClienteRepository.test.ts

import { ClientEntity } from "@domain/entities/ClientEntity";
import { MemoryClienteRepository } from "./MemoryClienteRepository";


describe('MemoryClienteRepository', () => {
  let repository: MemoryClienteRepository;

  beforeEach(() => {
    repository = new MemoryClienteRepository();
  });

  describe('create', () => {
    it('should add a new cliente to the repository', async () => {
      const clienteData: ClientEntity = {
        nome: 'João',
        email: 'joao@example.com',
        cpf: '12345678901',
        cep: '12345-678',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };

      await repository.create(clienteData);

      const result = await repository.findByCpf(clienteData.cpf);
      expect(result).toEqual(clienteData);
    });

    it('should overwrite existing cliente with the same CPF', async () => {

      const cpf = '12345678901';
      const initialData: ClientEntity = {
        cpf,
        cep: '12345-678',
        nome: 'João',
        email: 'joao@example.com',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };
      const updatedData: ClientEntity = {
        cpf,
        cep: '98765-432',
        nome: 'João da Silva',
        email: 'joaodasilva@example.com',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };


      await repository.create(initialData);
      await repository.create(updatedData);


      const result = await repository.findByCpf(cpf);
      expect(result).toEqual(updatedData);
    });
  });

  describe('findByCpf', () => {
    it('should return null for non-existing CPF', async () => {
      const nonExistingCpf = '99999999999';

      const result = await repository.findByCpf(nonExistingCpf);

 
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update existing cliente data', async () => {
      // Arrange
      const initialData:ClientEntity = {
        cpf: '12345678901',
        nome: 'João',
        email: 'joao@example.com',
        cep: '12345-678',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };
      const updatedData:ClientEntity = {
        cpf: '12345678901',
        nome: 'João da Silva',
        email: 'joaodasilva@example.com',
        cep: '12345-678',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };

      // Act
      await repository.create(initialData);
      await repository.update(updatedData);

      // Assert
      const result = await repository.findByCpf(initialData.cpf);
      expect(result).toEqual(updatedData);
    });

    it('should throw error for non-existing cliente', async () => {
      // Arrange
      const nonExistingData = {
        cpf: '99999999999',
        cep: '55555-555',
        nome: 'Cliente Inexistente',
        email: 'clienteinexistente@example.com',
        logradouro: "Av. Paulista",
        bairro: "Centro",
        localidade: "São paulo",
        uf: "RS"
      };

      // Act and Assert
      await expect(repository.update(nonExistingData)).rejects.toThrowError('Cliente não encontrado para atualização.');
    });
  });

});
