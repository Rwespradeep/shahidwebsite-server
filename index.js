import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mailgun from 'mailgun-js';

dotenv.config({ path: './process.env' });
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"))

app.use(express.json());
app.use(cors());

const mg = mailgun({ apiKey: '554ccdb3ddf751fbc6dd110eba7061d5-6b161b0a-625db0ed', domain: 'sandbox3a8193538db54910a9451a97ac74a62b.mailgun.org' });

app.post('/api/sendMail', (req, res) => {
    const { name, email, message } = req.body;

    const data = {
        from: email, // The user's email address
        to: 'shahidphotography12@gmail.com', // The fixed email address
        subject: `New client from your webpage with name as: ${name}`,
        text: message,
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error(error);
        } else {
            console.log(body);
            res.status(200).send("Email sent Successfully")
        }
    });


});

app.get("/", (req, res) => res.status(200).send("hello world"));

app.listen(port, () => console.log(`Backend started on: ${port}`));

export default app;