// src/handlers/AtualizarEnderecoHandler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CepApiInputPort } from '@application/ports/input/CepApiInputPort';
import { ClientRepositoryPort } from '@application/ports/output/ClientRepositoryPort';
import { MemoryClienteRepository } from '@infra/adapters/output/db/repositories/MemoryClienteRepository';
import { ViaCepAdapter } from '../via-cep/ViaCepApiAdapter';
import { AtualizarEnderecoUseCase } from '@application/usecase/AtualizarEnderecoUseCase';


export const atualizarEnderecoHandler: APIGatewayProxyHandler = async (event) => {
  const { cpf, cep } = JSON.parse(event.body);

  const clienteRepository: ClientRepositoryPort =  new MemoryClienteRepository();
  const cepService: CepApiInputPort = new ViaCepAdapter();

  const atualizarEnderecoUseCase = new AtualizarEnderecoUseCase(clienteRepository, cepService);

  try {
    await atualizarEnderecoUseCase.execute({ cpf, cep });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Endereço atualizado com sucesso' }),
    };
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno ao atualizar endereço' }),
    };
  }
};
