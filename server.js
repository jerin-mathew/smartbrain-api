
const express = require('express')//  es6 import is still in experimental feature in express
const bcrypt = require('bcrypt');
const cors = require('cors')

const app = express();
app.use(express.json());// to parse body  as json
app.use(cors());
const database = {

    users: [{
        id: '123',
        name: 'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '456',
        name: 'sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    }]
}

app.listen(4000, () => {
    console.log('server is up and  running on port 4000');
});

/*
different routes to be created

/ root -get- repond success
/sign in- post -returns -success/fails
/register - post -retuns created user
/profile/userid- get-retunrs user profile details page
/image- put- retuns user details with updated count and rank

*/
//get method of root 
app.get('/', (req, res) => {
    res.json(database.users)
})

//post request for sign in

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    }
    else {
        res.json('username and password are incorrect ');
    }


});

//post for register

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    database.users.push({
        id: '789',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    }

    )
    res.json(database.users[database.users.length - 1]);//retunr the last users

});

// get for the user /profiel/123 to use this we are using the following format

app.get('/profile/:id', (req, res) => {

    const { id } = req.params;
    let foundUser = false;

    database.users.forEach((item) => {
        if (item.id === id) {
            foundUser = true;
            return res.json(item);//we need to break the loop so retuning
        }

    });
    if (!foundUser) {
        res.status(404).json('user not found')
    }
});

// to update the count

app.put('/image', (req, res) => {
    const { id } = req.body;
    let foundUser = false;
    database.users.forEach((item) => {
        if (item.id === id) {
            item.entries++;
            foundUser = true;
            return res.json(item);//we need to break the loop so retuning
        }

        if (!foundUser)  {
            res.status(404).json('user not found')
        }

    });

});


