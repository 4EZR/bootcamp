const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes');


const app = express();
const port = 3000;

app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('mysecretkey'));
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);


app.use((req, res) => {
    res.status(404).render('404', { data: { title: '404', message: 'Page Not Found' }, layout: 'layouts/error' });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
