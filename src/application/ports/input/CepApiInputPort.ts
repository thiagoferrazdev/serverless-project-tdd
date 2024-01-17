import { Address } from "src/domain/entities/Address";

export interface CepApiInputPort {
  consultarCep(cep: string): Promise<Address | null>;
}