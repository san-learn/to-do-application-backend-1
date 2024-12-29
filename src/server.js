import express from 'express';

const application = express();

const PORT = process.env.PORT || 5000;

application.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
