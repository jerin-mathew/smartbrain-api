
const express =require('express')// with es6 import is still in experimental feature in express

const app=express();

app.listen(3000,()=>{
    console.log('app is running');
});
