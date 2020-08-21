import { renderHook } from 'react-hooks-testing-library';
import { useRequest } from './index';

// Use a separate test file to test hooks, as useAxios hooks need actual axios
// but the axios mock can't unmock in same file
describe('useRequest hook', () => {
  const url = '/api';

  test('with default options', () => {
    const { result } = renderHook(() => useRequest(url));
    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
  });
});
