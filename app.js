const express = require('express');
const titleRoutes = require('./routes/title');
const app = express();
app.set('view engine', 'pug');
app.use('/I/want/title',titleRoutes);


app.use('*', (request, response) => {
    response.status(404).send("The requested page not found...")
});

app.listen(3000, () => {
    console.log('Server is running on PORT:3000...');
})