import { ClientEntity } from "src/domain/entities/ClientEntity";
import { CepApiInputPort } from "../ports/input/CepApiInputPort";
import { ClientRepositoryPort } from "../ports/output/ClientRepositoryPort";

interface CriarClienteUseCaseInput {
  cpf: string;
  cep: string;
  nome: string;
  email: string;
}

export class CriarClienteUseCase {
  constructor(
    private clienteRepository: ClientRepositoryPort,
    private cepService: CepApiInputPort
  ) {}

  async execute({ cpf, cep, nome,email }: CriarClienteUseCaseInput): Promise<void> {
    const enderecoNovo = await this.cepService.consultarCep(cep);

    if (enderecoNovo) {
      const novoCliente:ClientEntity = {
          cpf,
          cep: enderecoNovo.cep,
          logradouro: enderecoNovo.logradouro,
          bairro: enderecoNovo.bairro,
          localidade: enderecoNovo.localidade,
          uf: enderecoNovo.uf,
          nome,
          email
      };

      await this.clienteRepository.create(novoCliente);
    }
  }
}
