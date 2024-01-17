// __tests__/ViaCepAdapter.test.ts
import axios from 'axios';
import { CepApiInputPort } from 'src/application/ports/input/CepApiInputPort';
import { ViaCepAdapter } from './ViaCepApiAdapter';


jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ViaCepAdapter', () => {
  let viaCepAdapter: CepApiInputPort;

  beforeEach(() => {
    viaCepAdapter = new ViaCepAdapter();
  });

  it('should return endereco for valid cep', async () => {
  
    const mockedResponse = {
      data: {
        logradouro: 'Rua Teste',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        uf: 'TS',
        cep: '12345-678',
      },
    };

    mockedAxios.get.mockResolvedValue(mockedResponse);


    const result = await viaCepAdapter.consultarCep('12345-678');


    expect(result).toEqual({
      logradouro: 'Rua Teste',
      bairro: 'Bairro Teste',
      localidade: 'Cidade Teste',
      uf: 'TS',
      cep: '12345-678',
    });
  });

  it('should return null for invalid cep', async () => {
    const mockedResponse = {
      data: {
        erro: true,
      },
    };

    mockedAxios.get.mockResolvedValue(mockedResponse);

    const result = await viaCepAdapter.consultarCep('invalid-cep');

    expect(result).toBeNull();
  });

  it('should handle axios error', async () => {

    mockedAxios.get.mockRejectedValue(new Error('Network Error'));


    const result = await viaCepAdapter.consultarCep('12345-678');


    expect(result).toBeNull();
  });
  
});
