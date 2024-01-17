import { CriarClienteUseCase } from "@application/usecase/CriarClienteUseCase";
import { criarClienteHandler } from "./CriarClienteHandler";

describe('CriarClienteHandler', () => {
    it('should create a new client', async () => {
    const mockEvent: any = {
      body: JSON.stringify({
        cpf: '12345678901',
        cep: '12345-678',
        nome: 'John Doe',
        email: 'john@example.com',
      }),
    };

    const executeSpy = jest.spyOn(CriarClienteUseCase.prototype, 'execute');
    executeSpy.mockImplementation(() => (Promise.resolve()))

    const result = await criarClienteHandler(mockEvent, {} as any, () => {}) as any;


    expect(executeSpy).toHaveBeenCalledWith({
      cpf: '12345678901',
      cep: '12345-678',
      nome: 'John Doe',
      email: 'john@example.com',
    });
    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({ message: 'Cliente criado com sucesso' });
  });

  it('should handle internal server error', async () => {
    const mockEvent: any = {
      body: JSON.stringify({
        cpf: '12345678901',
        cep: '12345-678',
        nome: 'John Doe',
        email: 'john@example.com',
      }),
    };

    jest.spyOn(CriarClienteUseCase.prototype, 'execute').mockRejectedValueOnce(new Error('Erro interno'));

      const result = await criarClienteHandler(mockEvent, {} as any, () => { }) as any;


    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ message: 'Erro interno ao criar cliente' });
  });
});
