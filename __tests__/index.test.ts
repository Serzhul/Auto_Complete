import { getItems } from '../src/utils/fetch';

import '@testing-library/jest-dom';

describe('api test', () => {
    const realFetch = global.fetch;

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = realFetch;
    });

    test('get items', async () => {
        const spyGet = jest.spyOn(global, 'fetch');

        await getItems('가');
        expect(spyGet).toHaveBeenCalledTimes(1);
        expect(spyGet).toBeCalledWith(
            'https://5qfov74y3c.execute-api.ap-northeast-2.amazonaws.com/web-front/autocomplete?value=가'
        );
    });
});
