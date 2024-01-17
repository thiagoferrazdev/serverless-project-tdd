import { ClientEntity } from "src/domain/entities/ClientEntity";

export interface ClientRepositoryPort {
  create(data: ClientEntity): Promise<void>;
    findByCpf(cpf: string): Promise<ClientEntity | null>;
    update(data: ClientEntity): Promise<void>;
}
