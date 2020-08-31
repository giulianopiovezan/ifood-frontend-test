import { renderHook } from '@testing-library/react-hooks';

import { useToast, ToastProvider } from 'hooks/toast';

jest.mock('@material-ui/core', () => {
  const materialUI = jest.requireActual('@material-ui/core');
  return {
    ...materialUI,
    Grow: jest.fn(({ children }) => children),
  };
});

describe('Toast hook', () => {
  it('Should be able to show Toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.show({
      severity: 'error',
      description: 'Teste toast error',
    });

    expect(result.current.currentMessage.severity).toBe('error');
    expect(result.current.currentMessage.description).toBe('Teste toast error');
  });

  it('Should be able to close Toast', () => {
    const { result } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    result.current.show({
      severity: 'error',
      description: 'Teste toast error',
    });

    expect(result.current.currentMessage.severity).toBe('error');
    expect(result.current.currentMessage.description).toBe('Teste toast error');

    result.current.close();

    expect(result.current.currentMessage).toEqual({});
  });
});
