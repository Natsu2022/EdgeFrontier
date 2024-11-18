const express = require('express');

// Initialize Express app
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });

