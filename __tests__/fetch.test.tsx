import '@testing-library/jest-dom'
import { fetchPostList } from '@/api/posts/interface'

describe('Page', () => {
  it('test fetch', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'name1',
        },
      ],
    } as Response);

    const result = await fetchPostList();

    expect(result).toEqual([
      {
        id: 1,
        name: 'name1',
      },
    ]);
  })
})
