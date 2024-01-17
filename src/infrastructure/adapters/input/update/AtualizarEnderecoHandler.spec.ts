import { AtualizarEnderecoUseCase } from "@application/usecase/AtualizarEnderecoUseCase";
import { atualizarEnderecoHandler } from "./AtualizarEnderecoHandler";

describe('AtualizarEnderecoHandler', () => {
  it('should update client address', async () => {

    const mockEvent: any = {
      body: JSON.stringify({
        cpf: '12345678901',
        cep: '12345-678',
      }),
    };

    const atualizarEnderecoUseCaseSpy = jest.spyOn(AtualizarEnderecoUseCase.prototype, 'execute').mockImplementation(()=> Promise.resolve());

    const result = await atualizarEnderecoHandler(mockEvent, {} as any, () => {}) as any;

    expect(atualizarEnderecoUseCaseSpy).toHaveBeenCalledWith({
      cpf: '12345678901',
      cep: '12345-678',
    });
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: 'Endereço atualizado com sucesso' });
  });

  it('should handle internal server error', async () => {
    const mockEvent: any = {
      body: JSON.stringify({
        cpf: '12345678901',
        cep: '12345-678',
      }),
    };

    const atualizarEnderecoUseCaseMock = jest.spyOn(AtualizarEnderecoUseCase.prototype, 'execute');
    atualizarEnderecoUseCaseMock.mockRejectedValueOnce(new Error('Erro interno'));

    const result = await atualizarEnderecoHandler(mockEvent, {} as any, () => {}) as any;

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ message: 'Erro interno ao atualizar endereço' });
  });
});
