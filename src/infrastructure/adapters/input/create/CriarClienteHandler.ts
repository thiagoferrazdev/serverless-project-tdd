// src/handlers/CriarClienteHandler.ts
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CepApiInputPort } from '@application/ports/input/CepApiInputPort';
import { ClientRepositoryPort } from '@application/ports/output/ClientRepositoryPort';
import { CriarClienteUseCase } from '@application/usecase/CriarClienteUseCase';
import { MemoryClienteRepository } from '@infra/adapters/output/db/repositories/MemoryClienteRepository';
import { ViaCepAdapter } from '../via-cep/ViaCepApiAdapter';


export const criarClienteHandler: APIGatewayProxyHandler = async (event) => {

  const { cpf, cep, nome, email } = JSON.parse(event.body);

    const clienteRepository: ClientRepositoryPort = new MemoryClienteRepository();
    const cepService: CepApiInputPort = new ViaCepAdapter();

  const criarClienteUseCase = new CriarClienteUseCase(clienteRepository, cepService);

  try {
    await criarClienteUseCase.execute({ cpf, cep, nome, email });
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Cliente criado com sucesso' }),
    };
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno ao criar cliente' }),
    };
  }
};
