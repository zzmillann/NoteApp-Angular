const express = require('express');
import pipeline from './configexpress/configPipeline';
const app = express();
require('dotenv').config();

pipeline(app);


app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});