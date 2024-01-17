import { ClientRepositoryPort } from "@application/ports/output/ClientRepositoryPort";
import { ClientEntity } from "@domain/entities/ClientEntity";


export class MemoryClienteRepository implements ClientRepositoryPort {
  private store: Map<string, ClientEntity> = new Map();

  async create(data: ClientEntity): Promise<void> {
    this.store.set(data.cpf, data);
  }

  async findByCpf(cpf: string): Promise<ClientEntity | null> {
    const result = this.store.get(cpf);
    return result || null;
  }


  async update(data: ClientEntity): Promise<void> {
    const existingData = this.store.get(data.cpf);

    if (!existingData) {
      throw new Error('Cliente não encontrado para atualização.');
    }

    Object.assign(existingData, data);
    this.store.set(data.cpf, existingData);
  }
}
