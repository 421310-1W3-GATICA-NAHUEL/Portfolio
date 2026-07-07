import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import app from './index';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
