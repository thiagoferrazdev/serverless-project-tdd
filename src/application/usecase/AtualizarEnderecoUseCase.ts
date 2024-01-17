import { CepApiInputPort } from "../ports/input/CepApiInputPort";
import { ClientRepositoryPort } from "../ports/output/ClientRepositoryPort";

interface AtualizarEnderecoUseCaseInput {
  cpf: string;
  cep: string;
}

export class AtualizarEnderecoUseCase {
  constructor(
    private clienteRepository: ClientRepositoryPort,
    private cepService: CepApiInputPort
  ) {}

  async execute({ cpf, cep }: AtualizarEnderecoUseCaseInput): Promise<void> {
    const clienteExistente = await this.clienteRepository.findByCpf(cpf);

    if (clienteExistente) {
      await this.atualizarEndereco(clienteExistente, cep);
    }
  }

  private async atualizarEndereco(clienteExistente, cep): Promise<void> {
    const enderecoAtualizado = await this.cepService.consultarCep(cep);

    if (enderecoAtualizado) {
      clienteExistente.cep = enderecoAtualizado.cep;
      clienteExistente.logradouro = enderecoAtualizado.logradouro;
      clienteExistente.bairro = enderecoAtualizado.bairro;
      clienteExistente.localidade = enderecoAtualizado.localidade;
      clienteExistente.uf = enderecoAtualizado.uf;

      await this.clienteRepository.update(clienteExistente);
    }
  }
}
