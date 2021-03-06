/*jshint esversion: 6 */

const PORT = 4444,
      http = require('http'),
      fs = require('fs'),
      url = require('url'),
	  CHAT = 'chat.txt',

	  qParse = requrl => url.parse(requrl, true).query;

//    TODO: обернуть промисами fs.методы
     
module.exports = new Promise( resolve=>{     
		  http.createServer((req, res)=>{
		  	
			  switch (  req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()  ) {
				  case '/add' :
				       res.writeHead(200, {'Content-Type': 'text/html'});
					   let addedMessage = qParse(req.url).addedMessage;
					   if (addedMessage) {
				       		res.write( `<h2>Добавляем ${addedMessage}!</h2>` ); 
					   	    fs.appendFile(CHAT, '\n'+addedMessage, err=>{
					   	    	if (err) throw err;
								res.end( `<h2>Добавлено ${addedMessage}!</h2>` ); 
					   	    });
					   } else {
							res.end( `<h2>Нечего добавлять!</h2>` );
					   }  
				       
					   //whatToDo('about called!');
				       break;
				  case '/read' : 	   
					   res.writeHead(200, {'Content-Type': 'text/html'});
					   res.write('<h2>Читаем...</h2>');
					   fs.readFile(CHAT, (err, what)=>{
					   	   if (err) throw err;
						   res.end(`<pre>${what}</pre>`);
					   });
					   break;

				  default:
				       res.writeHead(200, {'Content-Type': 'text/html'});
				       fs.readFile('public/form.html', (err, what)=>{
				          if (err) throw err;
				          res.end(what);
				       });
			 }
			
		  })
		     .listen(process.env.PORT || PORT,()=>
		  		  	        resolve(`--> Port ${process.env.PORT || PORT} listening!`)
		  	         );
		   });   		  