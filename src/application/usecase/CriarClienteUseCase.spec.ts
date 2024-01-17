import { ClientEntity } from "@domain/entities/ClientEntity";
import { CepApiInputPort } from "@application/ports/input/CepApiInputPort";
import { ClientRepositoryPort } from "@application/ports/output/ClientRepositoryPort";
import { CriarClienteUseCase } from "./CriarClienteUseCase";

class MockClientRepository implements ClientRepositoryPort {
    findByCpf(cpf: string): Promise<ClientEntity> {
        console.log(cpf);
      throw new Error("Method not implemented.");
  }
    update(data: ClientEntity): Promise<void> {
        console.log(data);
      throw new Error("Method not implemented.");
  }
  async create(cliente: any): Promise<void> {
    console.log('Mocked create:', cliente);
  }
}

class MockCepApi implements CepApiInputPort {
    async consultarCep(cep: string): Promise<any> {
      console.log(cep);
    return {
      cep: '12345-678',
      logradouro: 'Mocked Street',
      bairro: 'Mocked Neighborhood',
      localidade: 'Mocked City',
      uf: 'MS',
    };
  }
}

describe('CriarClienteUseCase', () => {
  let clienteRepository: ClientRepositoryPort;
  let cepService: CepApiInputPort;
  let criarClienteUseCase: CriarClienteUseCase;

  beforeEach(() => {
    clienteRepository = new MockClientRepository();
    cepService = new MockCepApi();
    criarClienteUseCase = new CriarClienteUseCase(clienteRepository, cepService);
  });

  afterEach(() => { 
    jest.clearAllMocks();
  });

  it('should create a new client', async () => {
    const input = {
      cpf: '12345678901',
      cep: '12345-678',
      nome: 'John Doe',
      email: 'john@example.com',
    };

    const consultarCepSpy = jest.spyOn(cepService, 'consultarCep');
    const createSpy = jest.spyOn(clienteRepository, 'create');

    consultarCepSpy.mockResolvedValue({
      cep: '12345-678',
      logradouro: 'Mocked Street',
      bairro: 'Mocked Neighborhood',
      localidade: 'Mocked City',
      uf: 'MS'
    });

    await criarClienteUseCase.execute(input);

    expect(consultarCepSpy).toHaveBeenCalledWith(input.cep);
    expect(createSpy).toHaveBeenCalledWith({
      cpf: input.cpf,
      cep: '12345-678',
      logradouro: 'Mocked Street',
      bairro: 'Mocked Neighborhood',
      localidade: 'Mocked City',
      uf: 'MS',
      nome: input.nome,
      email: input.email,
    });
  });

  it('should throw an error when address is not found', async () => {
    const input = {
      cpf: '12345678901',
      cep: '12345-678',
      nome: 'John Doe',
      email: 'john@example.com',
    };

    const consultarCepSpy = jest.spyOn(cepService, 'consultarCep');
    const createSpy = jest.spyOn(clienteRepository, 'create');

    consultarCepSpy.mockRejectedValue("Endereco não encontrado");

    try {
      await criarClienteUseCase.execute(input);  
    } catch (err) {
      expect(err).toEqual("Endereco não encontrado");
    }
    

    expect(consultarCepSpy).toHaveBeenCalledWith(input.cep);
    expect(createSpy).not.toHaveBeenCalled();
  });

});
