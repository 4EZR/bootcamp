const express = require('express');
const path = require('path');

const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow requests from localhost:5173 and higher ports
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            /^http:\/\/localhost:517[3-9]$/,
            /^http:\/\/localhost:51[8-9][0-9]$/,
            /^http:\/\/localhost:5[2-9][0-9]{2}$/,
            /^http:\/\/127\.0\.0\.1:517[3-9]$/,
            /^http:\/\/127\.0\.0\.1:51[8-9][0-9]$/,
            /^http:\/\/127\.0\.0\.1:5[2-9][0-9]{2}$/
        ];

        if (allowedOrigins.some(allowedOrigin =>
            (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) ||
            allowedOrigin === origin
        )) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use('/', routes);


app.use((req, res) => {
    res.status(404).render('404', { data: { title: '404', message: 'Page Not Found' }, layout: 'layouts/error' });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
