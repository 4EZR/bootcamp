const fs = require('fs');
const http = require('http');
const port = 3000;

const renderHTML = (path, res) =>{
    fs.readFile(path,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('Error : page not found');
        } else {
            res.write(data)
        }
        res.end();
    })
}

http
    .createServer((req,res)=>{
        const url = req.url;
        console.log(url);
        
        res.writeHead(200,{
            'Content-Type': 'text/html',
        });
        
        if(url==='/about'){
            renderHTML('./about.html',res);
        } else if(url==='/contact'){
            renderHTML('./contact.html',res);
        } else {
            // res.write('Hello World!');
            renderHTML('./index.html',res);
        }

            
    })
    .listen(port,()=>{
        console.log(`Server is listening on port ${port}...`);
    });
