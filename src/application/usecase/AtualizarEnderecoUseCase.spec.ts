import { ClientEntity } from "src/domain/entities/ClientEntity";
import { CepApiInputPort } from "../ports/input/CepApiInputPort";
import { ClientRepositoryPort } from "../ports/output/ClientRepositoryPort";
import { AtualizarEnderecoUseCase } from "./AtualizarEnderecoUseCase";


class MockClientRepository implements ClientRepositoryPort {
  create(data: ClientEntity): Promise<void> {
      console.log(data)
      return Promise.resolve();
  }
    async findByCpf(cpf: string): Promise<any> {
    console.log(cpf);
    return {
      cpf: '12345678901',
      cep: '12345-678',
      logradouro: 'Mocked Street',
      bairro: 'Mocked Neighborhood',
      localidade: 'Mocked City',
      uf: 'MS',
    };
  }

  async update(cliente: any): Promise<void> {
    console.log('Mocked update:', cliente);
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

describe('AtualizarEnderecoUseCase', () => {
  let clienteRepository: ClientRepositoryPort;
  let cepService: CepApiInputPort;
  let atualizarEnderecoUseCase: AtualizarEnderecoUseCase;

  beforeEach(() => {
    clienteRepository = new MockClientRepository();
    cepService = new MockCepApi();
    atualizarEnderecoUseCase = new AtualizarEnderecoUseCase(clienteRepository, cepService);
  });

  it('should update client address when client exists', async () => {
    const input = {
      cpf: '12345678901',
      cep: '12345-678',
    };

    const findByCpfSpy = jest.spyOn(clienteRepository, 'findByCpf');
    const consultarCepSpy = jest.spyOn(cepService, 'consultarCep');
    const updateSpy = jest.spyOn(clienteRepository, 'update');

    await atualizarEnderecoUseCase.execute(input);

    expect(findByCpfSpy).toHaveBeenCalledWith(input.cpf);
    expect(consultarCepSpy).toHaveBeenCalledWith(input.cep);
    expect(updateSpy).toHaveBeenCalledWith({
      cpf: '12345678901',
      cep: '12345-678',
      logradouro: 'Mocked Street',
      bairro: 'Mocked Neighborhood',
      localidade: 'Mocked City',
      uf: 'MS',
    });
  });

  it('should not update client address when client does not exist', async () => {
    const input = {
      cpf: 'nonexistent-cpf',
      cep: '12345-678',
    };

    const findByCpfSpy = jest.spyOn(clienteRepository, 'findByCpf').mockRejectedValue(new Error('Error'));
      const consultarCepSpy = jest.spyOn(cepService, 'consultarCep');
    const updateSpy = jest.spyOn(clienteRepository, 'update');

    try {
        await atualizarEnderecoUseCase.execute(input);    
    } catch (err) {
        expect(err.message).toEqual('Error');
    }  
    

    expect(findByCpfSpy).toHaveBeenCalledWith(input.cpf);
    expect(consultarCepSpy).not.toHaveBeenCalled();
    expect(updateSpy).not.toHaveBeenCalled();
  });
});
