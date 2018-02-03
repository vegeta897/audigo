import express from 'express';
import path from 'path';

export default PORT => {
    const app = express();
    app.use(express.static('dist'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
    app.listen(PORT);
};