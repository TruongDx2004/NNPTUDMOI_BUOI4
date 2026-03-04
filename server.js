const express = require('express');
const app = express();

const roleRoutes = require('./routes/role.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());

app.use('/roles', roleRoutes);
app.use('/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});