import axios from 'axios';
import { CepApiInputPort } from 'src/application/ports/input/CepApiInputPort';
import { Address } from 'src/domain/entities/Address';

export class ViaCepAdapter implements CepApiInputPort {
  private apiUrl = 'https://viacep.com.br/ws';

  async consultarCep(cep: string): Promise<Address | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/${cep}/json`);
      const data = response.data;

      if (data.erro) {
        return null; 
      }

      const endereco: Address = {
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.localidade,
        uf: data.uf,
        cep: data.cep,
      };

      return endereco;
    } catch (error) {
      console.error('Erro ao consultar CEP na API:', error.message);
      return null;
    }
  }
}
