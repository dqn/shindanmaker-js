import { diagnose } from '../src/shindan';

const shindanId = 953698;

describe('diagnose', () => {
  test('Normal', async () => {
    const result = await diagnose(shindanId, 'TEST_NAME');
    expect(result).toEqual(expect.stringMatching(/TEST_NAME/));
  });

  test('Empty name', async () => {
    const result = await diagnose(shindanId, '');
    expect(result).toEqual(expect.stringMatching(/名無しの[A-Z]/));
  });

  test('Abbrevate', async () => {
    const result = await diagnose(shindanId);
    expect(result).toEqual(expect.stringMatching(/名無しの[A-Z]/));
  });

  test('Include HTML', async () => {
    const result = await diagnose(shindanId, '"&#<>');
    expect(result).toEqual(expect.stringMatching(/"&#<>/));
  });
});
