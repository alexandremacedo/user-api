import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    const { user } = request.body;
    return response.json({ user });
});

app.listen(3333, () => console.log('🖖 Server is running...'));
