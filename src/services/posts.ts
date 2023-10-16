const baseUrl = 'https://jsonplaceholder.typicode.com/';

export const getPosts = async () => {
    try {
        const response = await fetch(`${baseUrl}posts`);
        return response.json();
    } catch (e) {
        console.log('Fetch error: ', e);
    }
};
