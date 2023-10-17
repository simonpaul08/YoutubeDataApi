import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import corsOptions from './config/corsOptions.js';
import YoutueRoutes from './routes/youtube.js';
import MailRoutes from './routes/mail.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;


// middlewares
app.use(cors(corsOptions))
app.use(express.json());


app.use('/youtube', YoutueRoutes);
app.use('/mail', MailRoutes);


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})