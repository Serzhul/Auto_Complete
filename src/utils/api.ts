const parseToJSON = (res: Response) => {
    if (!res.ok) {
        throw new Error('Something went wrong');
    }
    return res.json();
};

export default {
    async get(url: string) {
        return fetch(url).then(parseToJSON);
    },
};
