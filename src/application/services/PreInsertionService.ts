import { ClientEntity } from "src/domain/entities/ClientEntity";
import { ClientRepositoryPort } from "../ports/output/ClientRepositoryPort";


export class PreInsertionService {
  constructor(private repository: ClientRepositoryPort) {}

  async preInsertData(): Promise<void> {
    const data: ClientEntity[] = [
  {
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "cpf": "123.456.789-01",
    "logradouro": "Rua A, 123",
    "bairro": "Centro",
    "localidade": "Cidade A",
    "uf": "SP",
    "cep": "12345-678"
  },
  {
    "nome": "Maria Oliveira",
    "email": "maria.oliveira@email.com",
    "cpf": "987.654.321-09",
    "logradouro": "Avenida B, 456",
    "bairro": "Bairro B",
    "localidade": "Cidade B",
    "uf": "RJ",
    "cep": "98765-432"
  },
  {
    "nome": "Carlos Santos",
    "email": "carlos.santos@email.com",
    "cpf": "456.789.012-34",
    "logradouro": "Rua C, 789",
    "bairro": "Bairro C",
    "localidade": "Cidade C",
    "uf": "MG",
    "cep": "34567-890"
  },
  {
    "nome": "Ana Pereira",
    "email": "ana.pereira@email.com",
    "cpf": "567.890.123-45",
    "logradouro": "Avenida D, 012",
    "bairro": "Bairro D",
    "localidade": "Cidade D",
    "uf": "BA",
    "cep": "56789-012"
  },
  {
    "nome": "Roberto Costa",
    "email": "roberto.costa@email.com",
    "cpf": "234.567.890-12",
    "logradouro": "Rua E, 345",
    "bairro": "Bairro E",
    "localidade": "Cidade E",
    "uf": "PR",
    "cep": "23456-789"
  },
  {
    "nome": "Fernanda Lima",
    "email": "fernanda.lima@email.com",
    "cpf": "789.012.345-67",
    "logradouro": "Avenida F, 678",
    "bairro": "Bairro F",
    "localidade": "Cidade F",
    "uf": "SC",
    "cep": "78901-234"
  },
  {
    "nome": "Ricardo Souza",
    "email": "ricardo.souza@email.com",
    "cpf": "345.678.901-23",
    "logradouro": "Rua G, 901",
    "bairro": "Bairro G",
    "localidade": "Cidade G",
    "uf": "RS",
    "cep": "34567-890"
  },
  {
    "nome": "Cristina Santos",
    "email": "cristina.santos@email.com",
    "cpf": "901.234.567-89",
    "logradouro": "Avenida H, 234",
    "bairro": "Bairro H",
    "localidade": "Cidade H",
    "uf": "GO",
    "cep": "90123-456"
  },
  {
    "nome": "Lucas Oliveira",
    "email": "lucas.oliveira@email.com",
    "cpf": "678.901.234-56",
    "logradouro": "Rua I, 567",
    "bairro": "Bairro I",
    "localidade": "Cidade I",
    "uf": "MT",
    "cep": "67890-123"
  },
  {
    "nome": "Patrícia Lima",
    "email": "patricia.lima@email.com",
    "cpf": "123.456.789-90",
    "logradouro": "Avenida J, 890",
    "bairro": "Bairro J",
    "localidade": "Cidade J",
    "uf": "ES",
    "cep": "12345-678"
  }
];

    for (const item of data) {
      await this.repository.create(item);
    }
  }
}