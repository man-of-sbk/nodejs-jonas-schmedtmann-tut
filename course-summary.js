-1. NOTICES
	* if we want to run a js file in a Nodejs project having some effects toward the project dependently => we still have to start it from the root folder, if not, the js file won;t run properly

	* --optionName is a convention of define an option for an npm/node cmd

	* MongoDB present fields having Date type in form of a String. However, when we work with field having Date type we still have to pass a Date Object
		to the fields having Date type => MongoDB will automatically convert the Date Object to a appropriate data type it need to work with Date fields

	* set process.env in diffirent computer operation
		1. window
			* $ set NODE_ENV=...

		1. mac
			* $ export NODE_ENV=...

0. dependencies & new terms & vscode plugins:
	1. dependencies
		* npm i slugify
			=> transform a phrase into a slug (read about the slug below)

		* npm i nodemon --save-dev

		* npm i superagent
			+ create request in nodejs

		* npm i express

		* npm i morgan
			=> helps us console.log important information of a request & response like: HTTP method, response time,... automatically

		* npm i dotenv
			=> automatically add new Environment variables defined in a .env file to process.env Object

		* npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import
			eslint-plugin-jsx-ally eslint-plugin-react --save-dev
			=> linting module

		* npm i mongoose
			=> a mongodb driver helping us modeling as well as do CRUD, aggregation,... operations easily

		* npm i validator
			=> validate data

		* npm i ndb
			=> connect our application to a Chrome debugger automatically without setting up anything. Thus,
				we could leverage all useful debugging features of Chrome debugger

				+ the Chrome Debugger 'ndb' helps us to connect to is a 'REAL TIME' one which reflects changes we make in files inside it to the files in our IDE

		* npm i bcryptjs

	2. new terms
		* query string
			+ exp
				- 'https://www.natours.dev/api/v1/tours?duration=5&difficulty=easy'
					=> '?duration=5&difficulty=easy' is a query string

		* slug
			=> a long phrase whose words are seperated by a special character

			+ exp
				- ducati-panigale-v4

		* backpressure
			+ reading data from disk via a readble stream is much faster than sending chunks of data over the network via response stream(a writable one)
				=> this could cause the response can not send the data nearly as fast as it receives which could overwhelm
				the response stream

				=> readableStream.pipe(writableStream) automatically handle this problem for us

		* JSend
			=> a JSON format for HTTP response

			+ JSend format:
				{
					"status": "success",
					"data": {
						...
					},
					"message": ... // *** => this is for error
				}

		* mongodb 'query operator'
			=> since mongodb query using JSON format which can;t represent tasks like greater/lesser comparisons, update,...
				mongodb offers 'query operator' helping us do that with our db query

				+ exp:
					-  find a document having 'price' field lesser than or equal 500
						=>  db.tours.find({
									price: {
										$lte: 500 // *** $lte is a 'query operator' & means 'lesser than or equal'
									}
								});

					-  find a document having 'price' field lesser than 500 & and it;s 'rating' is greater than or equal to 4.8
						=>  db.tours.find({
									price: {
										$lt: 500
									},
									rating: {
										$gte: 4.8
									}
								})

					- find a document having 'price' field lesser than 500 & 'or' it;s 'rating' is greater than or equal to 4.8
						=>  db.tours.find({
									$or: [
										{
											price: {
												$lt: 500
											},
										},
										{
											rating: {
												$gte: 4.8
											}
										}
									]
								})

		* cluster (in atlas)
			=> is an instance of a mongodb server

		* db driver
			=> a software allow our application to connect to a db

		* Projection
			=> to only includes or uninclude a certain fields from the result of a db query

		* alias middleware
			=> a kind of middleware that add 'query string' implicitly to 'req.query' Object in order to create a simple route interface
				to leverage controllers of other routes via the implicitly-added 'query string'

	3. vscode plugins
		* DotENV => prettier .env file (highlight color & file icon)

		* ESlint

		* Image preview

		* Prettier

		* Pug beautify

		* tabNine

	4. response status code
		200: success

		201: success created

		204: delete success, the deleted data is gone, nothing to send back to client

1. Welcome, Welcome, Welcome!:
	1. Course Structure and Projects / 2. READ BEFORE YOU START / 3. Let;s Install Node.js
		=> nothing

2. Introduction to Node.js and NPM:
	1. Section Intro
		=> nothing

	2. What Is Node.js and Why Use It
		* nodejs is a js run-time built on gg;s open source v8 engine

		* nodejs is a web server
			=> it;s perfect for being a web server as it allows us to access & deal with to filesystem, network

		* What is a js run-time ?
			+ is an enviroment which could understands & execute js codes

	3. Running Javascript Outside the Browser
		* start a nodejs process in terminal (RELP):
			=> $ node // *** start nodejs process
				 $ const = abc;
				 $ abc // *** nodejs process in terminal works the same as how console in browser works

		* exit a nodejs process in terminal (RELP):
			=> ctrl + d

			=> $ .exit // *** could see in nodejs documentation in 'RELP' section

			=> $ process.exit();

		* see all global variables in nodejs RELP:
			=> tab (2 times)

		* _ variable in nodejs RELP
			=> returns results of a previous calculation inside terminal.
				+ exp:
					- $ 2 + 3
						$ _ + 5 // *** => _ variable store the result of '2 + 3' => result of this calculation is 10
						$ _ - 10 // *** => 0

	4. Using Modules 1 Core Modules
		* start a nodejs file
			=> $ node fileName.js

	5. Reading and Writing Files
		* fs module
			+ .readFileSync(filePath, resultEncode)
				=> return a file content

				- NOTICES
					* if we don;t specify the second arg which indicates encoding type for the target file, the method;s result will return a Buffer

			+ .writeFileSync(filePath, fileContent)
				=> write fileContent to a file

				- NOTICES
					* if the first arg doesn;t exist, the method will automatically create a new file based on the path we provide

					* the method will override all contents of a file with a new one, the second arg

	6. Blocking and Non-Blocking Asynchronous Nature of Node.js
		* nodejs runs on one single thread => If one user do a synchronously reading file task taking 2 seconds => not until the
			synchronously reading task finish, other users can;t do anything

	7. Reading and Writing Files Asynchronously
		* fs module
			+ .readFile(filePath, resultEncode, (err, data) => {})
				=> read a file asynchronously

			+ .writeFile(filePath, fileContent, err => {})
				=> write content to a file asynchronously

	8. Creating a Simple Web Server
		* http module
			+ .createServer((req,res) => {})
				=> create a nodejs server

				- each time there;s a request to this server, the callback function will be called

				- NOTICES:
					* when there;s a request to our server, the callback function will be called twice since if the request comes from a browser,
						the browser will automatically perform a request on it own to get our site;s 'favicon'. To see this more explicitly
						console.log(req.url) to see it in detail

						+ despite the fact that the callback function is still called when the 'favicon' request is sent, it will eventually
							not be able to send any response to the client. // *** continue reading

			+ server.listen(port, ipAdress, () => {})
				- ipAdress: String
				- port: Number

				=> run a server on the second arg ('localhost' or '127.0.0.1' are acceptable) with a given port (the first arg)

				- when the server is started successfully, the callback function will be called

				- exp:
					* const server = http.createServer((req, res) => {
						  res.end("Hello from the server !");
						});

						server.listen(8000, "localhost", () => {
						  console.log("listening to requests on port 8000");
						});

	9. Routing
		* NOTICES:
			+ when there;s a request to our server, the callback function will be called twice since if the request comes from a browser,
				the browser will automatically perform a request to get our site;s 'favicon'. To see this more explicitly
				console.log(req.url) to see request;s url in detail

				- despite the fact that the callback function is still called when the 'favicon' request is sent, it will eventually
					ends up not being able to send any response to the client.

		* what is header of a response/request ?
			=> a piece of information about the response/request

			=> default status of an http request in Nodejs is 200 

		* http module
			+ response object
				- .end(texts)
					=> the method;s arg will be rendered to the browser

				- .writeHead(status, headerInfor)
					=> create custom status, information for a http header

					* exp:
						+ res.writeHead(404, {
				        "Content-type": "text/html",
				        "my-own-header": "hello-world"
				      });

	10. Building a (Very) Simple API
		* what is an api(shortly)
			=> is a service from which we could get data

		* __dirname variable
			=> is a global variable which returns the path of the file that we;re currently executing 

		* a case to use readFileSync() method
			=> when we want to read data that of a file when the server loads for the first time only. Therefore, we don;t need to access the
				file for each request.

				+ In this case, asynchronously or synchronously read the file for the first time doesn;t matter as we only do that only one time

				+ exp:
					- const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
						...
						case "/api":
				      res.writeHead(200, {
				        "Content-type": "application/json"
				      });

				      res.end(data);
				      break;

	11. HTML Templating Building the Templates
		=> nothing - just set up a few ui Templates (using our own in-house Template-engine)

	12. HTML Templating Filling the Templates
		=> create our own in-house Template-engine handler

		* regular expression
			+ /someText/g
				=> g in the expression above is global => which indicates all 'someText' in a string

	13. Parsing Variables from URLs
		* url module
			=> help us handle(parse, v.v...) requests; url

			+ .parse(url, parseUrlQueryStrings)
				- parseUrlQueryStrings: Boolean

				=> parse an url. If the second arg is set to true, the method will parse 'query strings' of the given url to an object as well as
					the url or else, the method only parse the given url

	14. Using Modules 2 Our Own Modules
		* module system
			=> every single file is treated as a module

			+ when we use require statement to get sth from a module, the require statement actually returns the module.exports object of the
				required module.

			+ exports.aVarOrAFunc = ...:
				=> is a shorthand of: module.exports.aVarOrAFunc = ...; => we;re indeed create a aVarOrAFunc property for the exports
						object which is a property of module object

			+ when we want to make a default exports, we have to write: module.exports = aVarOrAFunc; which is indeed overriding
				the exports object of module object. It;s obviouly we could not write: exports = aVarOrAFunc; as exports in this context
				is just a normal variable of a file which has no effects on module system

	15. Introduction to NPM and the package.json File
		=> nothing, just introduce to npm

	16. Types of Packages and Installs
		* npm
			+ regular dependencies
				=> are ones that our projects depend on to work properly

				- syntax:
					* npm i aDependency // *** => install a dependency as a regular one

			+ dev dependencies
				=> are tools for development like a code bundler like webpack or debugger or testing libraries which play no roles in production
					state

				- syntax:
					* npm i aDevDependency --save-dev // *** => install a dependencies as a dev one

			+ install locally
				=> dependencies are installed with in our projects; node-modules directory only, we can;t use them anywhere else

			+ install globally
				=> dependencies are installed on our computer;s system which means that we could use them in any projects inside our computer

				=> we should install a dependency globally if it provides executable command that we need to run in all of our project
					- syntax:
						npm i aGlobalDependency --global

			+ create a custom npm command
				1. go to 'package.json' file

				2. add a new property to 'scripts' object whose name will be treatd as a new npm command

				3. specify the command we want as a value of the newly created 'scripts';s property

				4. run the newly created command by
					 $ npm newlyCreatedCommandName

				- exp:
					* {
						  "name": "1-node-farm",
						  "version": "1.0.0",
						  "description": "",
						  "main": "index.js",
						  "scripts": { // *** scripts object containing custom npm commands
						    "test": "echo \"Error: no test specified\" && exit 1", // *** custom npm command
						    "start": "nodemon index.js"
						  },
						  "keywords": [],
						  "author": "",
						  "license": "ISC",
						  "dependencies": {
						    "slugify": "^1.3.6"
						  },
						  "devDependencies": {
						    "nodemon": "^1.19.4"
						  }
						}

						$ npm start // *** see start property of the scripts object a bove

	17. Using Modules 3 3rd Party Modules
		=> introduce to slugify module which helps us transform a phrase into a slug (read about slug in new term section)

	18. Package Versioning and Updating
		* npm update number:
			=> an npm update number always has 3 numbers and a special character:
				1. main version
					=> introduce breaking changes which is almost diffirent from the previous one

				2. minor version
					=> introduce new features, not a breaking changes

				3. patch version
					=> the bugs-fixing version

				4. a prefix
					1. ^
						=> when we update a package ($ npm update), npm will update a module with the latest minor & patch version

					2. ~
						=> when we update a package ($ npm update), npm will update a module with the latest patch version only

					3. *
						=> when we update a package ($ npm update), npm will update a module with all latest versions (main, minor, patch)

				+ exp:
					- "nodemon": "^1.19.4"

					- "nodemon": "~1.19.4"

					- "nodemon": "*1.19.4"
		
		* npm module
			+ how to see out-dated modules
				=> $ npm outdated

			+ how to install a module with a specified version
				=> $ npm install moduleName@version

				- exp:
					* $ npm install slugify@1.0.0

			+ how to update modules
				=> $ npm update // *** => update all modules

				=> $ npm update moduleName // *** => update a specified module

			+ delete a module
				=> $ npm uninstall moduleName

	19. Setting up Prettier in VS Code
		* Prettier - vscode plugin
			+ how to configure Prettier
				1. create a file name: '.prettierrc'

				2. add configuration in a JSON format (see Prettier doc to know more)

				- exp:
					* {
						  "singleQuote": true
						}

	20. Recap and What;s Next
		=> nothing

3. Introduction to Back-End Web Development
	1. Section Intro
		=> nothing

	2. An Overview of How the Web Works
		* what is a DNS (domain name server)
			=> a domain name is not the real address of a website which is just a nice name that is easy for us to memorize. the DNS which is
				a special server, a 'phone-books' of the internet will help us convert a domain name to the real ip address of a website.
				This is done by the website;s internet service provider (ISP)

		* how TCP & IP protocol work
			1. TCP:
				=> TCP breaks out request and response into thousands of small chunks of data before they are sent and then when they gets to
					their destination, the TCP will reassemble all of them into the original request/response

			2. IP:
				=> IP sends and routes all of the chunks through the internet to where they need to reach by attaching an IP address to
					each chunk when they;re sent 

		1. a client enter an url

		2. the url is sent to the DNS by an ISP

		3. the url is converted to the real ip address of the website by the DNS

		4. a TCP/IP connection which is a standard about how data is moved across the internet is established between browser & server, &
			this connect will be kept alive for the entire time it takes to transfer all the files of the website

		5. then an HTTP request is made
			+ request header
				=> information about the request

			+ request body
				=> data comes with the request

		6. server sends response Back-End
			+ response header
				=> information about the response

			+ response body
				=> data comes with the response

		7. an html is loaded by browser
			=> if there;re additional <script> & <link> tags pointing to additional files => browser will make more requests to get those files

	3. HTTP in Action / 4. Front-End vs. Back-End Web Development
		=> nothing

	5. Static vs Dynamic vs API
		* static website
			=> is a website only serves static html,css,js file

			=> it;s content are always the same

		* Dynamic website
			=> is a website that is built on the server each time the server receives a request

			=> it;s content changes according to it;s database or user;s action

4. How Node.js Works A Look Behind the Scenes
	1. Section Intro
		=> nothing

	2. Node, V8, Libuv and C++
		=> introducing v8 & Libuv, details about these 2 things will be mentioned on next sections

		* what is a thread pool
			=> is where heavy tasks like handling filesystem, cryptography, compression, DNS tasks,... These heavy tasks are automatically
				pushed to thread pool to execute by an event loop if a task is likely to block the event loop itself

		* v8
			=> converts js codes to machine codes which computers could understand

			+ written in both c++ & js

		* Libuv
			=> open source libraries with a strong focus on asynchronous i/o which give us ability to access network, filesystem,... which
				provides nodejs 2 very crucial mechanism: event loop & thread pool

			+ completely written in c++

	3. Processes, Threads and the Thread Pool

		* what is a process
			=> just a program which is in execution

		* what is a thread
			=> a thread is like a box where our codes are executed in

		* nodejs is a c++ program => when we run a nodejs app, there wil be a node process running on that computer which
		  uses only one single thread to execute nodejs codes

	4. The Node.js Event Loop
		* when a nodejs application starts, an event loop will be instantiated which is essentially just a loop whose iterations is called
			'tick' & the condition keeping this loop running are 'pending' tasks running the background. If there aren;t any 'pending' tasks in
			the background => the event loop & the program will stop running

		* event loop offloads expensive tasks such as: filesystem, cryptography, compression, DNS tasks,... to 'thread pool' which are
			multi-threaded to execute.

		* event loop in nodejs breaks callbacks into diffirent phases and execute them one by one according to each phase;s order, &
			the event loop only run the next iteration/tick when there;re 'pending' asynchronous functions being performed in the background

		* main event loop phases:
			1. timer:
				=> this phase executes callbacks scheduled by setTimeout() and setInterval()

			2. poll:
				=> execute I/O related callbacks

			3. setImmediate:
				=> setImmediate() callbacks are invoked here

				=> setImmediate() is a special Timer whose callback runs after TImer phase & poll phase, instead of running in Timer phase

			4. close:
				=> some close callbacks are executed here, e.g. socket.on('close', ...)

		* process.nextTick() queue phase & microtask queue (executes resolved callbacks of Promises)
			=> these are 'exceptions', if there;re callbacks in one of these queue, they;ll be executed right after the current phase which
				is running instead of waiting for the entire loop to finish. (except for close phase)

				+ process.nextTick() is used when we really need to do sth right after the current phase

				+ exp:
					- a Promise is resolved & returns some data fetched from an api while a callback of a timer event is running => the callback
						from the fetching process will be executed right after the one from the timer event

		* NOTICES:
			+ avoid blocking the event loop by avoiding following tasks
				1. don;t use sync version methods of fs, crypto & zlib modules

				2. don;t perform complex operations such as: loops inside loops

				3. be careful with JSON operations with large object as it could take times to .parse() or .toString() a JSON

				4. don;t use too complex regular expression such as: nested qualifiers

				=> we could use some methods to deal with blocking problem like
					- manually pushes heavy operations to thread pool

					- using child processes

	5. The Event Loop in Practice
		* thread pool size
			=> thread pool has a default size is 4 which indicates the number of thread the thread pool could leverage the number of functions it could handle at once

			+ we could set a thread pool size via:
				- in 'linux'
					=> process.env.UV_THREADPOOL_SIZE = targetThreadPoolSize;
				
				- in 'window'
					=> $ set UV_THREADPOOL_SIZE=targetThreadPoolSize & node app.js

					* NOTICES
						+ the cli above still works even if the cmd or terminal through err

			+ exp:
				- if we have 4 'crypto' tasks running which will be offloaded into the thread pool by the event loop & the thread pool size is 
					set to 2 => the thread pool will execute the first 2 crypto functions first and then execute the 2 left ones later when the
					first 2 finishes

					* const crypto = require("crypto");
 
						process.env.UV_THREADPOOL_SIZE = 2; // *** set thread pool's size to 2 meaning that it will execute 2 tasks at once

				    const start = Date.now();

				    // *** these 2 functions are execute in thread pool first as the thread pool could only handle 2 tasks at once
				    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
				      console.log(Date.now() - start, "password encrypted");
				    });
				    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
				      console.log(Date.now() - start, "password encrypted");
				    });

				    // *** these 2 functions are executed later in the event loop after above 2 tasks are finishes
				    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
				      console.log(Date.now() - start, "password encrypted");
				    });
				    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
				      console.log(Date.now() - start, "password encrypted");
				    });

	6. Events and Event-Driven Architecture / 7. Events in Practice
		* http, fs, Timer module are all built around the Event-Driven Architecture
			+ exp:
				- const http = require('http');

					http.createServer();

					http.on('request', (req, res) => {
						console.log(`receives a request ${req.url} in the first http callback`);
						res.end('receives a request');
					});

					http.on('request', (req, res) => {
						console.log(`receives a request ${req.url} in the second http callback`);
					});

					server.on("close", () => {
					  console.log(`server has just closed ${req.url}`);
					});

					server.listen(8080, "localhost", () => {
					  console.log("waiting for requests...");
					});

		* events module
			+ when a set of condition met, an event emitter could emit events which will be picked up by an event listener whose
				callback functions will be execute when the event listener receives the appropriate event from the event emitter
			
			+ Event-Emitter logic is also called 'Observer pattern' in js programming
				=> Observer is the event listener which keep observing new notification from an emitter

			+ methods
				- .on(eventName, callback)
					=> create an event listener

				- .emit(eventName, arg1, arg2, arg3, ...)
					=> emit an event

				- exp:
					* const EventEmitter = require("events");

						const myEmitter = new EventEmitter();

						myEmitter.on("newSale", () => {
						  console.log("* there's a new sale");
						});

						myEmitter.on("newSale", (productName, stock) => {
						  console.log(
						    `* customer's name: Hunq purchased a ${productName}\nThere are now ${stock} items left in stock.`
						  );
						});

						myEmitter.emit("newSale", "ducati v4", 10);

			+ inherit from events module
				- we could use es5 approach or leverage extends feature of class in es6

				- exp:
					* class MyOwnEventEmitter extends EventEmitter {
						  constructor() {
						    super();
						  }
						}

	8. Introduction to Streams / 9. Streams in Practice
		* stream is a approach to read & write data piece by piece. a stream passes Buffers(chunks of data) 'over time' to
			a target place which brings us the ability to handle small pieces of data from a big data as they come, instead of waiting for
			the whole big data to be completely arrived.

			+ Buffer is a temporary storage storing a chunk of data that is being passed from one place to an another one

			+ a Buffer has a certain size, when data fill up it;s size, it will be sent to a target place
 	
			+ a Buffer can vary in size according to the type of data it store.

			=> watch this video: https://www.youtube.com/watch?v=GlybFFMXXmQ&list=PLFE7ykHg0KbcpKkwOOt6ZpM13LXVHGqti&index=47&t=5s

		* streams are instances of EventEmitter() => stream could emit as well as listen to events

		* 4 types of stream:
			1. readable streams
				+ like: http request object, read file

				+ important events
					- data => is emitted whenever a chunk of data arrives

					- end => when all chunks arrive

					- error => on error

				+ important methods
					- .pipe(aWritableSteam)
						=> each time a chunk arrives, it will be passed to a writable stream immediately and when the writable stream finishes
							this method will automatically call .end() method of the writable stream

					- .read() => // *** continue

			2. writable streams
				+ like: http response object, write file

				+ important events
					- draint => // *** continue

					- finish => // *** continue

				+ important methods
					- .write(aChunkOfData) => receives a chunk of data as an arg and then puts it into the stream

					- .end() => receives no args => it ends a writable stream. like: response.end()

			3. duplex streams
				+ this stream is both readable and writable. Both are independent & each has it own internal Buffer

				+ like: web socket

			4. transform streams
				+ like duplex stream which is both readable stream & writable stream. However, it allows us to modify & transform data
					when it;s read or written

				+ like: zlib module

	10. How Requiring Modules Really Works
		* each file in nodejs is treated as a seperate module

		* nodejs uses Commonjs module system (require & module.exports)

		* what happens when we require a file in nodejs
			1. the path to the target file is loaded
				1. if the module;s name doesn;t begin ./ or ../ => nodejs will try to load a built-in module

				2. if the module;s name begins with ./ or ../ => nodejs will try to load a developer module

				3. if no file found => nodejs will try to find an index.js file inside the folder with the given module name

				4. else nodejs goes to 'node_modules' folder and find the target module there

			2. the module;s codes are wrapped with a special function
				1. the wrapper function gives us access to numbers of special objects
					+ (function(exports, require, module, __filename, __dirname) {
							// *** our codes
						});

						- NOTICES:
							* module variable passed down to our codes by the wrapper function is essentially just a reference to the module.exports
								object. Therefore, we can call exports without module.exports

				2. this function also creates a function scope which prevent variables from a module from being a global ones

			3. file is executed

			4. require returns module.exports obj of the required file

			5. file is cached
				=> which means the required file is executed only in the first call

	11. Requiring Modules in Practice
		* since our codes are wrapped inside a wrapper function, we could just simply use properties of a function
			+ exp:
				- console.log(arguments); // *** since our codes are wrapped inside a function, we could do this

		* module system in nodejs is a module
			+ exp:
				- console.log(require("module").wrapper); // *** logs the wrapper function

5. [Optional] Asynchronous JavaScript Promises and AsyncAwait
	1. Section Intro
		=> nothing
		
	2. The Problem with Callbacks Callback Hell
		=> nothing

	3. From Callback Hell to Promises
		=> nothing

	4. Building Promises
		* NOTICES:
			+ only the callback function of 'resolve' & 'reject' methods of a Promise run asynchronously, the callback function of a Promise
				itself runs synchronously

				- exp:
					* var asyncFunc = new Promise((resolve, reject) => {
							console.log("Promise body"); // *** synchronous
							resolve();
						});

						asyncFunc.then(() => {
							console.log("Promise resolve"); // *** asynchronous
						});


						console.log("start"); // *** synchronous

	5. Consuming Promises with AsyncAwait / 6. Returning Values from Async Functions
		* an async function automatically returns a Promise & the returned Promise automatically runs it;s 'resolve' function. In additional,
			what an async function returns will be treated as a parameter for the 'resolve' function returned by the async function

			+ exp:
				- const asyncFunc = async () => {
						return "resolve success"; // *** treated as a parameter for the 'resolve' function returned automatically by this async func
					}

					asyncFunc().then((data) => {
						console.log(data); // *** => "resolve success"
					})

		* an async function returns a Promise object => when we execute an async function, it runs similarly to a Promise
			+ exp:
				-
					1. Promise
						* var asyncFunc = new Promise((resolve, reject) => {
								console.log("Promise body"); // *** synchronous
								resolve();
							});

							asyncFunc.then(() => {
								console.log("Promise resolve"); // *** asynchronous
							});


							console.log("start"); // *** synchronous

					2. async function
						* var asyncFunc = async () => {
							  console.log("Promise body"); // *** synchronous
							}

							asyncFunc().then(() => {
							  console.log("Promise resolve"); // *** asynchronous
							});


							console.log("start"); // *** synchronous//

		* all operations put after an await run asynchronously as they;re considered to be callback operations of the await

		* await receives a Promise and returns a result returned by the .then()/resolve() of a  Promise, not .catch()/reject();
			
		* we could only handle exception of an await by using try-catch block

	7. Waiting for Multiple Promises Simultaneously
		* Promise.all(arrOfPromises)
			+ arrOfPromises: Array
				- an array containing Promises

			=> receives an array of Promises & returns an array of values returned by the Promises

			=> this method only returns a result once all Promise 'resolve'

			=> since an async function returns a Promise, we could leverage Promise.all() with an array of async functions which return some
				values in it;s 'resolve' function

			+ NOTICES:
				- this method will execute it;s 'reject' function if one Promise in the Promise array passed to it 'rejects' 

6. Express Let;s Start Building the Natours API!
	1. Section Intro
		=> nothing

	2. What is Express
		=> nothing

	3. Installing Postman
		=> nothing

	4. Setting up Express and Basic Routing
		* express module
			+ require('express')
				=> returns a function which returns a 'server' when it;s executed. It essentially uses:

					require('http').createServer((req, res) => {
						// ...
					});
					
					under the hood

				- .listen(port, () => {})
					=> host a server on a port

				- .use((req, res, next) => {}),
					.get(url, () => (req, res, next)),
					.post(url, () => (req, res, next)), 
					.patch(url, () => (req, res, next)), 
					...

					=> callback functions passed to above methods are 'middleware' which runs when an expressjs app receives a request

					* exps:
						1.  // *** below middleware will be executed each time the app receives a request with any HTTP method as well as any url.
								app.use(function (req, res, next) {
								  console.log(`a request is triggered regardless of it's HTTP method`)
								  next()
								});

						2.  // *** below middleware is executed whenever there's a request to '/movies' regardless of the request's HTTP method.
								app.use('/movies', function(req, res, next) {
									console.log(`a request to '/movies' is triggered regardless of it's HTTP method`)
									next()
								});

						3.  // *** below middleware will be called each time the app receives a request to '/movies' with GET HTTP method
								app.get('/movies', function (req, res, next) {
								  console.log(`a request to '/movies' with GET HTTP method is triggered`)
								});

	5. APIs and RESTful API Design
		* api
			=> is a piece of software that can be used in an another one in order to allow apps to communicate with each other

		* REST Architecture
			=> a way of building web api which makes them easy to use

			+ steps of building a REST Architecture
				1. create diffirent endpoints
					- exp:
						1. http://www.myApi.com/tours => tours is an endpoint

						2. http://www.myApi.com/users => users is an endpoint

						3. http://www.myApi.com/reviews => reviews is an endpoint

				2. add HTTP method to endpoints (only for 'CRUD' operations)
					=>  instead of using diffirent endpoints to perform 'CRUD' actions around a piece of data. Such as:
								1. '/addNewTour'

								2. '/getTour'

								3. '/updateTour'

								4. '/deleteTour'

						  we should have only one endpoints: '/tours' with diffirent HTTP methods to diffirentiate goals of the endpoint. Such as:
								
								1. GET => read data
									=> 'GET' /tours

									=> 'GET' /tours/:tourId

								2. POST => add || create data
									=> 'POST' /tours

								3. PUT => update data with a whole object
									=> 'PUT' /tours/:tourId

								4. PATCH => update data with just a part of an object
									=> 'PATCH' /tours/:tourId

								5. DELETE => delete data
									=> 'DELETE' /tours/:tourId

				3. make endpoints return JSON format (usually)
					=> we;ll need to follow a standard JSON format. Such as:

						- 'JSend' format:
							+ {
									"status": "success",
									"data": {
										...
									},
									"message": ... // *** => this is for error
								}

				4. keep apis stateless
					=> apis are only in charge of handling 'output' 'coming' from 'clients', 'not' from the 'server'

	6. Starting Our API Handling GET Requests
		* expressjs
			+ 'response' object:
				- .status(statusCode)
					* statusCode: Number
					
					=> return a new 'response' object with a custom status code

				- .json(aJSONobj)
					* aJSONobj: Object

					=> end an response which sends a given JSON object to client 

	7. Handling POST Requests
		* expressjs:
			+ require('express').json(); // *** a middleware
				=>  Since, 'request' object of an express app as well as a nodejs app is a 'readable stream' => it;ll be difficult to
						get a 'request body' out of a request. This middleware helps us get 'request body' of a request. However, it only accept
						'request body' in JSON format only

				=> after parsing the JSON 'request body', this method put the result in 'request.body' object

			+ NOTICES:
				- whenever a .json file is saved/written, the server containing it will be restarted which means js files handle nodejs operations
					will be re-ran (this doesn;t depend on 'nodemon', it;s a nodejs;s feature)

	8. Responding to URL Parameters
		* define an endpoint with Parameters in expressjs app:
			+ exp:
				1. fixed Parameters:
					* app.get('/tours/:id/:name', (req, res) => {});
						=> 'id' & 'name' are 'must have' Parameters

				2. optional Parameters
					* app.get('/tours/:id/:name?', (req, res) => {});
						=> 'id' is a 'must have' Parameter & 'name' is an optional one 

		* get Parameters from a defined endpoint:
			+ exp:
				- app.get('/tours/:id', (req, res) => {
					  console.log(req.params); // *** => req.params returns: { id: ... }
					});

	9. Handling PATCH Requests / 10. Handling DELETE Requests
		=> nothing

	11. Refactoring Our Routes
		* expressjs
			+ require('express')()
				- .route('route')
					.get((req, res) => {})
					.post((req, res) => {})
					...
					
					=> create a base endpoint for HTTP methods working on a same endpoint together

					* exp:
						+ app
							  .route('/api/v1/tours')
							  .get((req, res) => {})
							  .post((req, res) => {});

							app
							  .route('/api/v1/tours/:id')
							  .get((req, res) => {})
							  .patch((req, res) => {})
							  .delete((req, res) => {});

	12. Middleware and the Request-Response Cycle
		* what is middlewares
			=>  middlewares in expressjs are functions handling operations between a request & response cycle. It could be implemented in both
	        request & response

	    + in expressjs, everything are middlewares

	  * what is a middleware stack
	  	=> is a 'stack' of middlewares

	  	=> the orders of middlewares of a middleware stack are defined by the orders that are defined in the code. Which means that
	  		 a middleware that appears first is executed before one that appears later

	  * .next() in a middleware
	  	=>  is used to execute the next middleware, If u call .next() with an argument, that argument is assumed to be an internal error
	  			with 500 response status code & other middlewares won;t run

	  			+ exp:
	  				- app.use((req, res, next) => {
							  console.log('this is my middleware');
							  next('sth wrong happened');
							});

	  					// *** => server returns 500 status code => internal error

	  * NOTICES:
	  	+ we CAN NOT assign the 'request' object to a value. If we do so, nothing gonna happen, all we could do are add & modify a property

	  * we could add a customed property to 'request' object in order to make communication between middlewares
	  	+ exp:
	  		- app.use((req, res, next) => {
	  				req = 'fuck';
					  req.aaa = 'fuck';
					  next();
					});

					app.use((req, res, next) => {
					  console.log(req.aaa);
					  next();
					});

	13. Creating Our Own Middleware
		* exp:
			+ this one runs in all middlewareapp.use((req, res, next) => {
				  console.log('this is my own middleware');
				  next();
				});

	14. Using 3rd-Party Middleware
		* morgan module
			=> helps us console.log diffirent important information of a request & response like: HTTP method, response time,...

	15. Implementing the Users Routes
		=> nothing

	16. Creating and Mounting Multiple Routers
		* require('express')
			+ .Router()
				=> returns a mini-expressjs app intergrated with route system & each one could have it;s own customed middlewares

				=> when the current app receives a request, the Router() instance we created will filter the address that the request target to,
					if the target address of the request match the address the defined in the route system of a Router(), that Router() instance
					will be executed

				- exp:
					* const express = require('express')
						const customRouter = express.Router()

						// middleware that is specific to the 'customRouter'
						customRouter.use(function timeLog (req, res, next) {
						  console.log('Time: ', Date.now());
						  next();
						});

						// define the home page route
						customRouter.get('/', function (req, res) {
						  res.send('Birds home page');
						});

						// define the about route
						customRouter.get('/about', function (req, res) {
						  res.send('About birds');
						});

				- create a base endpoint for a Router()
					* exp:
						+ const express = require('express');
							const userRouter = express.Router();

							userRouter
							  .route('/') // *** base endpoint with no additional Parameters
							  .get((req, res) => {})
							  .post((req, res) => {});

							userRouter
							  .route('/:id') // *** base endpoint with id parameter
							  .get((req, res) => {})
							  .patch((req, res) => {})
							  .delete((req, res) => {});

							app.use(
								'/users', // *** this is the base endpoint of the 'userRouter', a instance of require('express').Router();
								userRouter
							);

	17. A Better File Structure
		* it;s a good Practice to have everything related to 'server' in one file which will be treated an entry nodejs file &
			one another one keeping things related to 'expressjs'

	18. Param Middleware
		* require('express')()
			+ .param(aTargetEndpointParam, (req, res, next, paramVal) => {});
				- aTargetEndpointParam: String

				=> is a middleware running whenever, an expressjs app receives a specific-pre-defined parameter from an endpoint

				- exp:
					* const express = require('express');

						// *** Router() returns an mini-expressjs app ingerated with route system and can have it's own middlewares
						// ***** since 'router' is an expressjs app, it;s param middleware only works on it;s scope
						const router = express.Router();

						// *** this one is executed whenever this expressjs app receives an 'id' parameter defined below, from an endpoint
						router.param('id', (req, res, next, paramVal) => {
						  console.log(`tour id is: ${paramVal}`);
						  next();
						});

						router
						  .route('/')
						  .get(tourController.getAllTours)
						  .post(tourController.createTour);

						router
						  .route('/:id')
						  .get(tourController.getTour)
						  .patch(tourController.updateTour)
						  .delete(tourController.deleteTour);

	19. Chaining Multiple Middleware Functions
		* exp:
			+ runs a series of middlewares on a specific HTTP method

				const express = require('express');

				const app = express();

				app.post('/users',
					(req, res, next) => {},
					(req, res, next) => {},
					(req, res, next) => {}
				);

	20. Serving Static Files
		* require('express').static(staticFolderPath);
			=> is a middleware which automatically create routes associated to the folder which is specified via the first arg of
				the .static() method. These routes will serve/returns files related to the specified folder

			+ NOTICES:
				- as being a middleware, if the folder Structure match the api routes Structure & it;s put before api routes => routes created by
					this middleware will overrider api routes & vice versa

			+ exp:
				-
					1. this is our project;s folder Structure
						/project
							/public

								/css
									/index.css

								/js
									/index.js

								/img
									/logo.png
									/banner.jpg

								/index.html

							/app.js

					2. when we enter our url:
						'http://localhost:3000/index.html'
						or
						'http://localhost:3000/img/logo.png'

						=> it won;t work since we haven;t define any route matching ones above or may be we defined them. However, we didn;t
							make those routes serve/return files related to them

					3. we could use this middleware. Therefore, we don;t have to do above task in step '.3' manually
						=> in app.js file:
							const express = require('express');

							const app = express();

							app.use(express.static(`${__dirname}/public`));

					4. now, if we enter:
						'http://localhost:3000/index.html' => browser will return index.html file
						or
						'http://localhost:3000/img/logo.png' => browser will return logo.png img

	21. Environment Variables
		* process.env is a global variable appearing in all nodejs files & is used to contain environment settings

		* application enviroment modes:
			+ nodejs app & expressjs app can run in diffirent enviroment modes, 2 most prevelent ones are 'development' & 'production'.

		* require('express')().get('env')
			=> get expressjs;s own enviroment mode returning 'development' by default

		* process.env.NODE_ENV
			=> this property doesn;t exist at the beginning, 'NODE_ENV' is just a convention name of a variable containing enviroment mode value

		* ways to set enviroment mode:
			1. using terminal
				+ $ set NODE_ENV=development
				
				+ $ set NODE_ENV=production

				=> above command add the 'NODE_ENV' property automatically to the process.env object as well as automatically change the value
					of require('express')().get('env')

			2. using a configuration file
				1. $ npm i dotenv
					=> automatically add new Environment variables into process.env object of nodejs defined in a .env file

				2. create 'config.env' file in the root folder whose name is a convention name for environment config file

				3. add customed environment variables (this file stores all custom Environment variables, not only 'NODE_ENV')
					+ exp:
						- NODE_ENV=development // *** environment in UPPERCASE is a convention
							// *** other environment variables
							PORT=3000
							USER=jonas
							PASSWORD=123456

				4. leverage 'dotenv' module
					- const dotenv = require('dotenv');

						// *** add new environment variables defined in './config.env' to 'process.env' object
						dotenv.config({ path: './config.env' }); // *** this line should be put on top of everything but of course after the require

				+ NOTICES:
					- this method won;t override properties of process.env that are defined via the first method using terminal or properties
						created by nodejs by default

						READ MORE: https://github.com/motdotla/dotenv#what-happens-to-environment-variables-that-were-already-set 

	22. Setting up ESLint + Prettier in VS Code
		=> nothing
		
7. Introduction to MongoDB
	1. Section Intro
		=> nothing

	2. What is MongoDB
		=> nosql db
				* collection => table in sql

				* document => row in sql

				* field => title of each column in sql

		=> uses a similar data format to JSON which is BSON. BSON looks similar to JSON, but each property of it has it;s data type

		* NOTICES:
			+ each document in MongoDB has maximum size of 16mb

			+ each document has it;s own unique id acting as a primary key of that document which is automatically generated by MongoDB

	3. Installing MongoDB on macOS
		=> nothing

	4. Installing MongoDB on Windows
		* install steps
			1. choose download server in MongoDB site

			2. choose community ver

			3. current version

			4. choose OS

			5. package => MSI

			6. download

			7. run file

			8. choose 'complete' version

			9. tick the install MongoDB compass

		* set up a MongoDB server to the default folder Structure & location of mongodb which will contains mongodb databases
			1. go to 'C:\Program Files\MongoDB\Server\4.2\bin' or 'where we install MongoDB\MongoDB\Server\4.2\bin'

			2. create a folder containing MongoDB databases
				=> like xampp, we have 'xampp' folder containing mySql databases & being created automatically when we;re installing xampp

				=> with MongoDB, we have to create one manually
					1. go to the outermost/root disk containing installed MongoDB

					2. create a folder whose name MUST be 'data'

					3. inside the 'data' folder, create a folder whose name MUST be 'db'

					4. run: $ mongod.exe (inside the '\MongoDB\Server\4.2\bin' folder)

					5. check the 'waiting for connections on port' line to find the port in which the newly-created mongodb server is hosted

		* set up a MongoDB server with a customed folder Structure & location => google it

		* connect to a running mongodb server in terminal (mongo shell)
			1. create/start a mongodb server like in the second '*'

			2. go to 'C:\Program Files\MongoDB\Server\4.2\bin' or 'where we install MongoDB\MongoDB\Server\4.2\bin'

			3. run: $ mongo.exe

			4. now, we could run mongodb commands to work with the running mongodb server in this terminal (mongo shell)

		* quit a mongo shell
			$ quit()

	5. Creating a Local Database (mongo shell)
		* to create/run a mongodb db or switch from a db to an another one (since a mongodb server containing multiple databases, just like
			apache server when we install xampp)
			$ use dbName

		* create a 'collection'
			$ db.collectionName.insertOne(newDocumentInJSONformat)
				+ db: a 'global' variable which points to the current running db which is defined via '$ use dbName' like above

				+ newDocumentInJSONformat: Object

				+ exp:
					$ db.tours.insertOne({
							name: "the forest hiker",
							price: 297,
							rating: 4.7
						});

		* check the existence of a 'collection'
			$ db.collectionName.find()

		* show all databases inside a mongodb server
			$ show dbs

		* show all collections of a mongodb db
			$ show collections

		* quit a mongo shell
			$ quit()

	6. CRUD Creating Documents
		* CREATE
			+ db.collectionName.insertMany(arrOfDocuments);
				- exp:
					* db.tours.insertMany([
							{
								name: "the sea explorer",
								price: 497,
								rating: 4.8
							},
							{
								name: "the snow adventurer",
								price: 997,
								rating: 4.9,
								difficulty: "easy"
							},
						]);

	7. CRUD Querying (Reading) Documents
		* search a document via it;s fields
			+ db.collectionName.find({ propOfTheDocumentWeWantToFind: ..., propOfTheDocumentWeWantToFind: ... });
				- exp:
					* db.tours.find({
							price: 997,
							rating: 4.9
						});

		* mongodb 'query operator'
			=> since mongodb query using JSON format => it can hardly perform tasks like greater, lesser comparisons,... In these cases,
				we can intergrate 'query operator' with our query

				+ exp:
					-  find a document having 'price' field lesser than or equal 500
						=>  db.tours.find({
									price: {
										$lte: 500 // *** $lte is a 'query operator' & means 'lesser than or equal'
									}
								});

					-  find a document having 'price' field lesser than 500 & 'and' it;s 'rating' is greater than or equal to 4.8
						=>  db.tours.find({
									price: {
										$lt: 500
									},
									rating: {
										$gte: 4.8
									}
								})

					- find a document having 'price' field lesser than 500 & 'or' it;s 'rating' is greater than or equal to 4.8
						=>  db.tours.find({
									$or: [
										{
											price: {
												$lt: 500
											},
										},
										{
											rating: {
												$gte: 4.8
											}
										}
									]
								})

		* only retrieve specific fields
			=> each query has a second arg (an Object) indicating specific fields that the query can return

			=> the fields inside the second arg has 2 types of value:
				+ 0
					=> fields with 0 value will not be returned

				+ !== 0
					=> only return fields with value !== 0

				+ all fields inside this second arg MUST have same values
			
			+ exp:
				- db.tours.find(
						{
							price: {$gt: 500}
						},
						// *** second arg specifying which fields are shown & which ones are not in the result of a query
						{
							// *** => 0 means not show / !== 0 means only show fields with !== 0 value
							// ***** all properties/fields defined in this second obj MUST have same values. In this case, it is: 0
							name: 0,
							rating: 0
						}
					)

	8. CRUD Updating Documents
		* db.collectionName.updateOne({ propOfTheDocumentWeWantToFind:... }, { $set: { fieldToUpdate:... } });

			+ exp:
				- update 'price' field of the document whose name field is "the snow adventure"
					=> db.tours.updateOne({ name: "the snow adventure" }, { $set: { price: 597 } })

		* db.collectionName.updateMany({ propOfTheDocumentWeWantToFind:... }, { $set: { fieldToUpdate:... } });
			=> same to .updateOne()

		* replace a whole document to a new one
			=> db.collectionName.replaceOne() || db.collectionName.replaceMany() => these are same as .updateOne() & .updateMany() (see above)

	9. CRUD Deleting Documents
		* db.collectionName.deleteOne() || db.collectionName.deleteMany() => same as .find() (see in video num 7.)

		* delete everything
			=> db.collectionName.deleteMany({})

			=> above is the complete command, we just simply pass an empty object to .deleteMany() & it;ll delete all documents of a collection

	10. Using Compass App for CRUD Operations
		=> mongodb compass is similar to the xampp;s dashboard

		=> watch the video for more information

	11. Creating a Hosted Database with Atlas
		* Atlat is a service provides hosting service for mongodb db. It takes all the pains of managing as well as scaling db away from us

		* Atlat is a cloud service meaning that we can develop from everywhere don;t have to upload db from local machine

		* new terms
			+	cluster (in atlas)
				=> is an instance of a mongodb server

		=> watch the video to see how to start with atlas

	12. Connecting to Our Hosted Database
		=> watch this video in order to understand how to set up atlas cluster, connect mongodb compass/terminal with clusters in atlas,...

8. Using MongoDB with Mongoose
	1. Section Intro
		=> nothing

	2. Connecting Our Database with the Express App / 3. What Is Mongoose
		* working with connect string that mongo atlas offers:
			=> replace the 'test' word in the string with a db;s name we need to connect to

			=> replace the '<password>' with the password we defined via atlas

			+ exp:
				-
					* original connection string atlas offers:
						=> mongodb+srv://hunqvux:<password>@cluster0-squio.mongodb.net/test?retryWrites=true&w=majority

					* replace with: (check the 'test' word of the original connection string above)
						=> mongodb+srv://hunqvux:<password>@cluster0-squio.mongodb.net/natours?retryWrites=true&w=majority

		* local mongodb connection string
			=> mongodb://localhost:27017/{{databaseName}}
			+ exp:
				- mongodb://localhost:27017/natours

		* mongoose
			=> is an ODM (Object Data Modeling) & is a 'mongodb driver' too, which is a software allow application to connect to mongodb db.
				It provides a high level of abstraction over 'mongodb driver' (the navtive-official driver for mongodb), similar to
				expressjs also providing a high level of abstraction over nodejs

				+ READMORE about the navtive-official driver for mongodb: http://mongodb.github.io/node-mongodb-native/

			+ what is a mongoose schema:
				=> where we model/describe the Structure of our data as well as to be used in validating the data

			+ what is a mongoose model:
				=> is a wrapper Object for the schema, providing an interface for CRUD operations

			+ connect to a db via mongoose
				- require('mongoose').connect(connectionString, options)
					* connectionString: String

					* options: Object
						+ useNewUrlParser: Boolean
							=> mongodb only accept connection string to connect our app with mongodb database (some languages use Object). Thus,
								in order to obtain information from the connection string, mongodb uses a "parser" to parse it. However,
								mongodb are planning to use a new connection string. So that, in order to give pp using the old connection string
								time to switch to a new one, they give us this option

						+ most other options are used with the same reason to the 'useNewUrlParser' & they can be found here:
							=> READMORE: https://mongoosejs.com/docs/deprecations.html

					=> receives a connection String & connection options then connect an app to a mongodb db & returns a Promise

					* exp:
						+ require('mongoose').connect(
								// *** connection string
								"mongodb+srv://hunqvux:KyidTwEPShs0j1Tq@cluster0-squio.mongodb.net/natours?retryWrites=true&w=majority",
								// *** connection option
								// *** READMORE: https://mongoosejs.com/docs/deprecations.html
								{
									useNewUrlParser: true,
									useUnifiedTopology: true,
    							useFindAndModify: false
								}
							)
							.then(con => {...})
							.catch(err => {...});

	4. Creating a Simple Tour Model
		1. we need schemas used to describe data, set default value & validate data of a document

		2. create a model used to assign the newly-created schema to a 'collection' in order to do CRUD operations over documents
			of the 'collection'

		* methods of mongoose used to create a schema & a model:
			1. new require('mongoose').Schema(schemaObj)
				+ schemaObj: Object

				=> create a schema for a mongoose model used to describe data, validate data, set default value of a document

				+ exp
					- const mongoose = require('mongoose');

						const tourSchema = new mongoose.Schema({
						  name: {
						    type: String,
						    required: [
						    	true,
						    	// *** => error message for 'required' (only work for 'built-in validators')
						    	// ***** READMORE: https://mongoosejs.com/docs/validation.html#built-in-validators
						    	'A tour must have a name'
						    ],
						    // *** 'unique' is not a 'built-in validator', it just tells mongoose to add a unique index to a field
						    // *** the error that 'unique' returns is entirely handled from mongodb server, not from mongoose 
					    	// ***** READMORE: https://stackoverflow.com/questions/38945608/custom-error-messages-with-mongoose
					    	// ================================================================================================
					    	// *** for creating custom error message for 'unique' & others things like 'unique'
					    	// ***** READMORE https://mongoosejs.com/docs/middleware.html#error-handling-middleware
						    unique: true
						  },
						  rating: {
						    type: Number,
						    default: 4.5
						  },
						  price: {
						    type: Number,
						    required: [
						    	true,
						    	// *** => error message for 'required' (only work for validation param)
						    	// ***** READMORE: https://mongoosejs.com/docs/validation.html#built-in-validators
						    	'A tour must have a price'
						    ]
						  },
						  discount: Boolean, // *** shorthand for field that only need defining data type
						  summery: {
						    type: String,
						    trim: true // *** like trim()
						  },
						  images: [String], // *** => an array of String
						  createdAt: {
						    type: Date,
						    default: Date.now(),
						    select: false // *** never includes this field in the result of a query
						  },
						  difficulty: {
					      type: String,
					      required: [true, 'A tour must have a difficulty'],
					      // *** value of 'difficulty' field MUST be: easy or medium or difficulty
					      enum: {
					        values: ['easy', 'medium', 'difficult'],
					        message: 'Difficulty is either: easy, medium, difficulty'
					      }
					    },
						});

				+ NOTICES:
					=> fields that are not defined this a schema won;t be saved to db even if we add that fields manually into a mongoose document
						such as when we add our own fields to a mongoose document in a mongoose 'save ' middleware

						- READMORE about mongoose in video 24. this section below

			2. require('mongoose').model(collectionName, mongooseSchema);
				+ mongooseSchema: new require('mongoose').Schema()

				=> to do CRUD operations over mongodb documents of a given collection whose name is equal to a given collection name

				+ exp:
					- assign the above schema to a collection whose name is 'Tour'
						=> const Tour = mongoose.model('Tour', tourSchema);

		* NOTICES:
			+ the schema only validates a document once when the document is created

			+ when a field has Date type receives a String, or a number, mongodb will try to parse them into Date. If MongoDB can;t =>
				it will throw error 

	5. Creating Documents and Testing the Model
		* create a document from a model and save it to a given collection
			+ exp:
				- const Tour = mongoose.model('Tour', tourSchema); // *** assign 'tourSchema' to 'Tour' collection

				  const testTour = new Tour({ // *** create a document of 'Tour' collection based on 'tourSchema'
				    name: 'the park camper',
				    rating: 4.7,
				    price: 997
				  });

				  testTour // *** save the newly-created document to 'Tour' collection
				    .save()
				    .then(doc => {
				      console.log(doc);
				    })
				    .catch(err => {
				      console.log(err);
				    });

				- NOTICES:
					* if we pass fields that doesn;t exist in the 'tourSchema' => mongoose will ignore them

	6. Intro to Back-End Architecture MVC, Types of Logic, and More
		* mvc:
			+ model
				=> bake input from 'controller' / 'router' app;data & do business logics

			+ controller
				=> handles app;s request, interact with model (CRUD) & response to clients

			+ view
				=> if we have ui in our app => it contains view templates generating views

			+ mvc flow:
				1. server receives requests

				2. routers => filter requests

				3. appropriate 'controller' are ran & interact with an appropriate 'model'

				4. when the 'model' completely handle logics, it returns result to the 'controller' & the 'controller' returns
					response back to clients

				5. if we render site server-side => the 'controller' will returns the res returned by the 'model' to an appropriate view 

	7. Refactoring for MVC
		=> nothing

	8. Another Way of Creating Documents
		* in order to create a new document in mongoose, we could use:
			+ exp:
				- const Tour = mongoose.model('Tour', tourSchema); // *** assign 'tourSchema' to 'Tour' collection

				  const testTour = new Tour({ // *** create a document of 'Tour' collection based on 'tourSchema'
				    name: 'the park camper',
				    rating: 4.7,
				    price: 997
				  });

				  testTour // *** save the newly-created document to 'Tour' collection
				    .save()
				    .then(doc => {
				      console.log(doc);
				    })
				    .catch(err => {
				      console.log(err);
				    });

		* or we could use a more simple way:
			+ exp:
				- const Tour = mongoose.model('Tour', tourSchema); // *** assign 'tourSchema' to 'Tour' collection

					Tour.create({
						name: 'the park camper',
				    rating: 4.7,
				    price: 997
					})
						.then(doc => {})
						.catch(err => {});

				- NOTICES:
					* the .create() method above also except an Array

	9. Reading Documents
		* find all documents
			+ mongooseModel.find();
				- returns a Promise

		* find a document by it;s id
			+ mongooseModel.findById(documentId)
				- documentId: String

				- returns a Promise

				=> this is the same as:
					* mongooseModel.findOne({ _id: documentId });

				- NOTICES:
					* id in MongoDB
						1. an id in mongodb is stored in bytes, not String in order to reduce the id;s size

						2. a mongodb;s id is a 12-byte value based on 3 values:
							+ 4-bytes: the seconds when an id is created
							
							+ 5-bytes: random value
							
							+ 3-bytes: a counter which starts with a random value

						2. to show us the id in String format, mongodb uses ObjectId Object, a wrapper Object which can help us convert an id from
							String to bytes & vice versa, it also helps us to retrieve diffirent information of an id, such as the first 4-bytes, the
							next 5-bytes value of an id

						=> the mongooseModel.findById(documentId) automatically convert a given id from a String to byte value

	10. Updating Documents
		* mongooseModel.findByIdAndUpdate(documentId, dataToUpdate, options)
			+ documentId: String

			+ dataToUpdate: Object

			+ options: Object
				- new: Boolean
					=> true to return the updated document rather than the original one. defaults to false

				- runValidators: Boolean
					=> the schema only validates a document once when the document is created => set this to true, mongoose will validate the new
						Data (fields of the second arg) via the schema

			+ returns a Promise

			+ NOTICES:
				=> this method only updates fields of a document found in the second arg meaning that it only works with PATCH HTTP method

	11. Deleting Documents
		* mongooseModel.findByIdAndDelete(documentId);
			+ documentId: String

			+ returns a Promise

			+ NOTICES
				* it;s a convention not to return anything on a response;s body of a deleting request

		* mongooseModel.deleteMany();
			=> delete all documents inside a collection (no args)

	12. Modelling the Tours
		=> read the 'methods of mongoose used to create a schema & a model:' in video 4. in this section above

	13. Importing Development Data
		=> nothing

	14. Making the API Better Filtering
		* query string
			+ exp
				- 'https://www.natours.dev/api/v1/tours?duration=5&difficulty=easy'
					=> '?duration=5&difficulty=easy' is a query string

		* how to get query string in expressjs app
			=> req.query

		* chaining queries(query builder) in mongoose
			+ NOTICES:
				=> 'chaining' queries 'is NOT' 'executing queries', 'chaining' queries is 'Building queries'

			+ exp
				1.	// // *** BUILDING QUERIES & EXECUTE at once by leveraging async/await
						const res = await mongooseModel.find()
							.where('duration')
							.lte(5)
							.where('difficulty')
							.equals('easy');

				2.  // *** BUILDING QUERIES
						const query = mongooseModel.find()
							.where('duration')
							.lte(5)
							.where('difficulty')
							.equals('easy')
							// *** EXECUTE A QUERY
							.exec((err, data) => {});
							// *** OR .then() instead of .exec()
							// .then(data => {}).catch(err => {});

				3.	// *** BUILDING QUERIES
						const query = mongooseModel.find({ name: "test" }); // *** find documents whose name equals to "test"
						
						query = query.sort("price"); // *** sort documents returned by the above query by their "price" field

						// *** EXECUTE A QUERY
						const res = await query;

	15. Making the API Better Advanced Filtering
		* expressjs helps us parse 'mongodb query operators' from a query string if we write the query string like this
			+ '?duration[$gte]=5&difficulty=easy'
				- $gte => greater than & equal => is a mongodb query operator

				=> req.query => returns:
					* {
							duration: { '$gte': '5' },
							difficulty: 'easy'
						}

			+ NOTICES:
				* due to query string convention, pp don;t include '$' sign before 'query operations' in a 'query string'
					=> we have to replace the above 'query string' with
						+ '?duration[gte]=5&difficulty=easy'

						+ & add '$' sign to the object req.query returns manually

	16. Making the API Better Sorting
		* sort one field
			+ exp:
				- mongooseModel.sort("price");
					=> sort documents of a collection by it;s "price" field in ascending order

				- mongooseModel.sort("-price");
					=> sort documents of a collection by it;s "price" field in descending order

		* sort multiple fields
			+ exp:
				- mongooseModel.sort("price -ratingsAverage");
					=> sort documents of a collection by it;s "price" field & it;s "rating" field simultaneously (not one after another one)

	17. Making the API Better Limiting Fields
		* only includes a certain fields to or excludes a certain ones from the result of a query (this kind of action is called 'Projection')
			+ exp:
				- mongooseModel.select("name");
					=> only includes "name" field

				- mongooseModel.select("-price");
					=> excludes "price" field

		* includes/excludes multiple fields
			+ exp:
				- mongooseModel.select("name duration difficulty price");
					=> only includes "name", "duration", "difficulty" & "price" fields

				- mongooseModel.select("-name -duration -difficulty -price");
					=> excludes "name", "duration", "difficulty" & "price" fields

		* includes/excludes right inside a schema
			=> read: 'methods of mongoose used to create a schema & a model/1.' in video 4. above in this section

		* NOTICES:
			=> Projection cannot have a mix of inclusion and exclusion.
				+ exp:
					- mongooseModel.select("name duration -difficulty price"); => error

	18. Making the API Better Pagination
		* mongooseModel.skip(numbersOfDocToSkip)
			+ numbersOfDocToSkip: Number

			=> skip/ignore a numbers of document(the first arg) before starting other queries

			+ exp:
				- skip/ignore 7 documents before retrieving all documents (db has 9 documents)
					* let query = Tour.skip(7); // *** skip/ignore 7 documents before calling other queries

						query = query.find(); // *** only retrieve 2

					=> the above code only retrieve 2 documents as 7 ones are ignored/skipped by the .skip() methodd

			+ NOTICES:
				- .skip() doesn;t accept negative value

		* mongooseModel.limit(numbersOfDoc)
			+ numbersOfDoc: Number

			=> the numbers of document we want a query to return

		* make Pagination from a query string
			+ query string
				- '?page=2&limit=10'

			+ goal
				=> Paginate: 1 - 10/page1, 11-20/page2, 21-30/page3

			+ solution (we have 20 documents)
				- const { page, limit } = req.query; // *** express

					// *** if page === 1 => we skips 0 (1 - 1) * 10 document meaning that we'll start other queries from the first document
					// *** if page === 2 => we skips 10 (2 - 1) * 10 document meaning that we'll start other queries from the document number 11
					// *** if page === 3 => we skips 20 (3 - 1) * 10 document meaning that we'll start other queries from the document number 21
					const skip = (page - 1) * limit;

					mongooseModel.skip(skip).limit(limit)

		* ways to execute a queries
			+ exp
				1.	// // *** BUILDING QUERIES & EXECUTE at once by leveraging async/await
						const res = await mongooseModel.find()
							.where('duration')
							.lte(5)
							.where('difficulty')
							.equals('easy');

				2.  // *** BUILDING QUERIES
						const query = mongooseModel.find()
							.where('duration')
							.lte(5)
							.where('difficulty')
							.equals('easy')
							// *** EXECUTE A QUERY
							.exec((err, data) => {});
							// *** OR .then()/.catch() instead of .exec()
							// .then(data => {}).catch(err => {});

				3.	// *** BUILDING QUERIES
						const query = mongooseModel.find({ name: "test" }); // *** find documents whose name equals to "test"
						
						query = query.sort("price"); // *** sort documents returned by the above query by their "price" field

						// *** EXECUTE A QUERY
						const res = await query;

		* count all documents:
			=> .countDocuments();
	
	19. Making the API Better Aliasing
		=> READMORE about alias middleware in the 'dependencies & new terms & vscode plugins/new terms/alias middleware'

	20. Refactoring API Features
		=> sometime, we;ll want to store helper functions inside a class or a constructor function in order to perform
			'chaining' function execution

	21. Aggregation Pipeline Matching and Grouping
		* what is Aggregation ?
			+ is a opertaion taking multiple values & returning a single value. such as: sum, average, count, minimunm,...

		* Aggregation in MongoDB
			+ Aggregation in MongoDB works like pipeline of stages(functions). mongodb Documents are processed through the stages in
				sequence 

			+ stages in MongoDB Aggregation:
				=> there;re many stages but here;re the main ones

				=> stages can be set in distinct orders & be call multiple times in an aggregation opertaion
					(just like when we build a query by chaining small queries)

				1. 'project'
					=> perform projection (indicates which data is included & which one is expluded from the result)

				2. 'match'
					=> filter documents by their fields

				3. 'group'
					=> group input documents to small groups by a specific field of them

				4. 'sort' 
					=> sort the end result of an Aggregation query

					- fields assigned to -1 are sorted in descending

					- fields assigned to 1 are sorted in ascending

				5. 'unwind'
					=> deconstruct an Array field from input documents & then output one document for each element of the Array

		* how to do Aggregation operations in mongodb:
			=> mongooseModel.aggregate(arrayOfStages)

			+ NOTICES
				- a db query can be a combination of small queries(query chaining => we need to call .then()/.exec()/await to execution the
					combination). so is a Aggregation pipeline which is essentially a combination of stages

			+ accumulator opertators/aggregation expressions
				=> just like 'query opertators', but for aggregation

			+ exp
				1. fake data
					[
						{
							_id: 1,
							difficulty: "easy",
							price: 1
						},
						{
							_id: 2,
							difficulty: "medium",
							price: 2
						},
						{
							_id: 3,
							difficulty: "medium",
							price: 3
						},
						{
							_id: 4,
							difficulty: "difficult",
							price: 4
						},
						{
							_id: 5,
							difficulty: "difficult",
							price: 5
						}
					]

				2. we want to group above documents via it;s 'difficulty' field
					=>  // *** .aggregate receives an array of stages. each stage is an Object having a name used to specify a certain stage
							const stats = await mongooseModel.aggregate([
								// *** match stage using 'query operators'($gte, $lte,...)
					      {
					        $match: {
					          ratingsAverage: { $gte: 4.5 }
					        }
					      },
					      // *** group stage
					      {
					        $group: {
					        	// *** '_id' is a REQUIRED property which indicates which field do mongodb rely on to group documents into groups
					          _id: '$difficulty',
					          // *** we could use 'accumulator opertators/aggregation expressions' here too
					          // _id: { $toUpper: '$difficulty' },

					          // *** 'maxPrice' is an optional property, calculating results of an 'accumulator opertators/aggregation expressions'
					          maxPrice: {
					          	// *** '$max' is a 'accumulator opertators/aggregation expressions' which is used to
					          	// ***** get maximum value of field 'price' in each group
					          	// ============================================================
					          	// *** '$price' is the field 'price' of documents in a group
					          	$max: '$price'
					          },
					          minPrice: {
					          	// *** '$min' accumulator operator is used to get minimum value of field 'price' in each group
					          	$min: '$price'
					          },
					          sum: {
					          	// *** when this aggregation runs through a document, the 'sum' property will be assigned to: 'sum + 1'
					          	// ***** => following accumulator in this case is used to count the number of documents in a group
					          	$sum: 1
					          },
					          sumPrice: {
					          	// *** when this aggregation runs through a document, the 'sum' property will be assigned to:
					          	// ***** 'sum + (value of the current document's 'price' field)'
					          	// ***** => following accumulator in this case is used to get the summary of all 'price' field in a group
					          	$sum: '$price'
					          },
                    avgPrice: {
                    	// *** $avg accumulator operator find the average value of all 'price' fields in a group
                    	$avg: '$price'
                    },
					        }
					      },
					      // *** sort stage
					      {
					      	// *** only sort properties returned by 'group' stage, not the fields of documents in a group
					      	$sort: {
					      		// *** ascending 'avgPrice'
					      		avgPrice: 1
					      	}
					      }
					    ]);

				3. result of the above aggregation
					=> 	stats = [
		            {
		                _id: "easy",
		                maxPrice: 1,
		                minPrice: 1,
		                sum: 1,
		                sumPrice: 1,
		                avgPrice: 0.5 
		            },
		            {
		                _id: "medium",
		                maxPrice: 3,
		                minPrice: 2,
		                sum: 2,
		                sumPrice: 5,
		                avgPrice: 2.5
		            },
		            {
		                _id: "difficult",
		                maxPrice: 5,
		                minPrice: 4,
		                sum: 2,
		                sumPrice: 9,
		                avgPrice: 4.5
		            }
		        ]

  22. Aggregation Pipeline Unwinding and Projecting
  	* MongoDB presents fields having Date type in form of a String. However, when we do db query like: update, insert,... we still have to pass a
  		Date Object to the fields having Date type => MongoDB helps us convert/compare our Date Object to the value of the fields having Date type
  		under the hood, that;s why we could pass Date Object without any problem

  	* more aggregation stages:
	  	+ 'unwind' stage
	  		- deconstructs an Array field from documents of a target collection & then output one document for each element of the Array. Regardless of
	  			if the Array;s elements are duplicated. Each output document is an input document itself with the 'unwind' stage;s target Array field is
					replaced with an element of the Array field itself

  			- exp:
  				=> do aggregation with unwind stage on the 'startDates' field of documents below
  				1. fake data
						* [
								{
									_id: 1,
									price: 1,
									// *** notice that this field which will be the target field of the below aggregation in unwind stage has two duplicate value
									// ***** unwind stage doesn't care about duplicated elements of an Array
									startDates: [
										"2021-07-19T03:00:00.000Z",
										"2021-07-19T03:00:00.000Z",
									],
								},
								{
									_id: 2,
									price: 2,
									startDates: [
										"2021-07-19T03:00:00.000Z",
										"2021-09-06T03:00:00.000Z",
									],
								}
							]

					2. do the aggregation
						* const aggregationRes = await mongooseModel.aggregate([
					      {
					      	// *** $unwind is the 'unwind' stage
					      	// *** $startDates is the 'startDates' field
					        $unwind: '$startDates'
					      }
					    ]);

					3. result
						=>  [
									// *** each output document is an input document itself with the 'unwind' stage;s target Array field is
									// ***** replaced with an element of the Array field itself
									// ***** this output document's original 'startDates' field is:
									/*
									  startDates: [
											"2021-07-19T03:00:00.000Z",
											"2021-07-19T03:00:00.000Z",
										],
									*/
									{
										_id: 1,
										price: 1,
										startDates: "2021-07-19T03:00:00.000Z"
									},
									{
										_id: 1,
										price: 1,
										startDates: "2021-07-19T03:00:00.000Z"
									},
									{
										_id: 2,
										price: 2,
										startDates: "2021-07-19T03:00:00.000Z"
									},  
									{
										_id: 2,
										price: 2,
										startDates: "2021-09-06T03:00:00.000Z"
									}
								]

			+ 'addFields' stage
				- add new fields into documents returned by a aggregation with given values
					* exp:
						+ const aggregation = await mongooseModel.aggregate([
					      {
					        $group: {
					          _id: {
					            $month:'$startDates'
					          }
					        }
					      }, {
					      	// *** add new 'month' field to each document this operator go through
					        $addFields: {
					          month: '$_id'
					        }
					      }
					    ]);

			+ 'project' stage
				=> similar to 'addFields' but to do projection.

				- exp:
					* const aggregationRes = await mongooseModel.aggregate([
				      {
				        $group: {
				          _id: {
				            $month:'$startDates'
				          }
				        }
				      },
				      {
				        $addFields: {
				          month: '$_id'
				        }
				      },
				      {
				        $project: {
				        	// *** - included fields will have val !== 0
									// *** - excluded fields will have val === 0
				          _id: 0
				        }
				      }
				    ]);

			+ 'limit' stage
				=> limit the numbers of documents that an aggregation operation could return
		* some more aggregation opertators to work with Date
			+ $month
				=> returns the month of a field having Date type as a Number between 1 & 12
				- exp:
					* await mongooseModel.aggregate([
							{
								$group: {
									_id: {
										$month: '$startDates' // => return 'month' of the 'startDates' field only
									}
								}
							}
						]);

			+ $week / $year / $minute
				=> work similarly to $month

			+ $push
				=> with each documents an aggregation go through, this opertator will find value of a target field and push it to the field which contains
					this opertator;s value

					- exp:
						* const aggregationRes = await mongooseModel.aggregate([
					      {
					        $group: {
					          _id: {
					            $month:'$startDates'
					          },
					          numTourStarts: {
					            $sum: 1
					          },
					          tours: {
					            $push: '$name'
					          }
					        }
					      }
					    ]);

	23. Virtual Properties
		=> virtual properties(fields) are not stored in mongodb db, they;re just used to computed fields of documents

		* as being not stored in db, we cannot query virtual properties/fields

		* exp:
			1. define a virtual property calculating the numbers of weeks based on the numbers of days stored in 'duration' field of a document
				+ mongooseSchema
						// *** define a virtual property
						.virtual('durationWeeks')
						// *** define a method returning value for the 'durationWeeks' above when this virtual property is computed(is called)
						.get(function() {
							// *** 'this' of this function refers to a document & it's properties are the document's fields
						  return this.duration / 7;
						});

			2. display pre-defined virtual properties of a document when we return the document to client
				+ const mongooseSchema = new mongoose.Schema(
						{
							...
						},
						// *** second arg of .schema() defines options of a mongoose Model
						{
							// *** mongoose documents Object (mongoose.Document) have a .toObject() method used to convert a mongoose document into a plain JS-Object.
							// ***** This method is typically called when we execute db queries as db queries returns a plain JS-Object
							toObject: {
								// *** compute & display a document's pre-defined virtual properties/fields when the mongooseDocument.toObject() is called
								virtuals: true
							},
							// *** works similarly like mongooseDocument.toObject() method. This is used to convert a mongoose Document into a JSON format
							// ***** this method is typically called when JSON.stringify() or res.json() or res.send() is called
							toJSON: {
								virtuals: true
							}
						}
					);

					const MongooseModel = mongoose.model('MongooseModel', mongooseSchema);

				=> now, whenever 'MongooseModel' Model execute a query, the result of the query will show all of the virtual properties defined inside the
					"MongooseModel" Model

				+ NOTICES:
					- we;ll need to add 'virtuals' option for both 'toObject' & 'toJSON' methods like above since if we get rid of the option on 'toJSON'
						method, queries; result sent to clients won;t show any virtuals properties/fields. Instead, the virtuals properties ONLY appear on the
						the queries; result in BACKEND because res.json()/res.send() execute mongooseDocument.toJSON(), while the 'virtuals' option of .toJSON()
						method is set to false by default => the mongooseDocument.toJSON() neither compute nor display any virtual properties/fields

	24. Document Middleware (+ introduction about mongoose middlewares)
		* mongoose has 2 main types of middleware:
			1. pre one
				=> run before a certain event

			2. post one
				=> run after a certain event

		* pre-post middleware have effects on 4 main opertations
			1. document

			2. query

			3. aggregate

			4. model


		* methods to create middlewares
			1. mongooseSchema.pre(targetOperationName, function(next) {})
				+ targetOperationName: String / Regex

			2. mongooseSchema.post(targetOperationName, function(docs || doc, next) {})
				+ targetOperationName: String / Regex

				+ second arg;s first arg:
					=> return one or multiple mongoose documents according to an operation that a middleware;s having effects on, such as:
						- a newly-created document

						- documents returned by a 'finding' query

		* 'document' middlewares
			+ run before or after operations related to document like Create, Update, Delete

			+ this in document middlewares
				=> since document middlewares run before or after operations related to document => this in a document middleware returns the
					currently-processed document

			+ 'save' document middleware
				- pre save
					=> ONLY run before 'save' & 'create' command
					
					* exp:
						+ add a new field based on a field of a document before it;s saved to db
							- mongooseSchema.pre('save', function(next) {
							 		// *** create a slug for each document based on it's name field before the document is saved into db
									this.slug = slugify(this.name, { lower: true });

									next(); // *** works similar to expressjs's middlewares
								});

								* NOTICES:
									=> fields that are not defined this a schema won;t be saved to db even if we add that fields manually into a mongoose document
										such as when we add our own fields to a mongoose document in a mongoose 'save ' middleware

				- post save
					=> ONLY run after 'save' & 'create' command

					* exp:
						+ retrieve a document after it;s created
							- mongooseSchema.post('save', function(doc, next) {
									console.log(doc)

									next();
								});

	25. Query Middleware
		=> run before or after a query is executed.

		+ this in Query middlewares
			=> since query middlewares run before or after operations related to query => this in a query middleware returns the currently-processed query

		+ NOTICES:
			=> 'find' query is diffirent from 'findById' query => middlewares for 'find' query won;t work with 'findById' & vice versa, in order to
				create a middleware working with all 'finding' query, we could make use of REGEX

		+ 'find' query middleware
			- pre find
				* exp:
					+ mongooseSchema.pre('find', function(next) {
							// *** add a new query to the currently-processed query before it's executed
						  this.find({
						    secretTour: {$ne :true}
						  });

						  next();
						});

					+ mongooseSchema.pre('findById', function(next) {
						  next();
						});

					+	// *** /^find/ => assign this middleware to all finding query
					 	mongooseSchema.pre(/^find/, function(next) {
						  next();
						});

			- post find
				* exp
					+ calculate how long does it takes to execute a 'finding' query

						- tourSchema.pre(/^find/, function(next) {
						    this.find({
						      secretTour: {$ne :true}
						    });

						    this.start = Date.now();

						    next();
						  });

						  tourSchema.post(/^find/, function(docs, next) {
						    console.log(`this query took ${Date.now() - this.start} milliseconds !`);
						    next();
						  });

	26. Aggregation Middleware
		=> run before or after an aggregation is executed.

		+ this in aggregation middlewares
			=> since aggregation middlewares run before or after operations related to aggregation => this in a aggregation middleware returns 
			he currently-processed aggregation

		+ mongoose Aggregate Object
			- mongoose.Aggregate.pipeline()
				=> returns the pipeline of a mongoose aggregation in form of an Array (real Array)

		+ 'aggregate' document middleware
			- pre aggregation
				* exp
					+ // *** => add a new stage to an aggregation before it's executed
						mongooseSchema.pre('aggregate', function(next) {
							// *** Array.prototype.unshift => add an element to the top of an Array
					    this.pipeline().unshift({
					      $match: {
					        secretTour: {
					          $ne: true
					        }
					      }
					    });

					    next();
					  });

	27. Data Validation Built-In Validators
		* sanitization:
			=> ensure that input data is clean which means there;s no malicious code

	28. Data Validation Custom Validators
		* create customed validator for mongoose schema
			=> using 'validate' property for a field in order to create customed validator
				+ 'validate' is an Object with 2 main properties:
					1. validator: Function
						=> define a function validating value of a target field. If it returns false => error, true => no error

						=> this of this function returns the current document when we create a new document => it won;t work when we update
							a document
							- if we want to implement 'validate' to updating context / scenario, we need to:
								1. 'find' the document need updating

								2. apply the new property values need updating to the document

								3. call 'save', or 'create' on the document

					2. message: String
						=> error message

						=> we could access the value of a target field by adding: '{VALUE}' to the message. This is an internal process of mongoose, 
							not a syntax in js

							- exp:
								* 'discount price is: {VALUE} which should be below regular price'

			+ exp:
				-	const tourSchema = new mongoose.Schema(
					  {
					    price: {
					      type: Number,
					      required: [true, 'A tour must have a price']
					    },
					    priceDiscount: {
					      type: Number,
					      // *** 'validate' property
					      validate: {
					        validator: function(val) {
					          console.log(val, this);
					          // *** this field must be less than the 'price' field
					          // ==================================================
					          // *** this of this function returns the current document when we create a new document => it won;t work when we
					         	// ***** update a document
					          return val < this.price;
					        },
					        // *** '{VALUE}' is a way to access the value of this field. This is an internal process of mongoose, not
					        // ***** a syntax in js
					        message: 'discount price is: {VALUE} which should be below regular price'
					      },
					      // ============ OTHER FORMATS of 'validate' property ============
					      // validate: [function(val) {...}, 'discount price is: {VALUE} which should be below regular price'],
					      // validate: function(val) {...},
					    }
					  }
					);

9. Error Handling with Express
	1. Section Intro
		=> nothing

	2. Debugging Node.js with ndb
		* npm i ndb
			=> a nodejs debugger which will connect our application with a 'REAL TIME' Chrome debugger automatically without setting up anything. Thus,
				we could leverage all useful debugging features of Chrome debugger

				+ the debugger is a 'REAL TIME' one meaning that our changes over files in the debugger will reflect to our files in our IDE

			=> for installation, see the video

			+ set breakpoint
				1. go to file in chrome debugger & add breakpoints to it

				2. right click on the file having breakpoints & choose 'Run this script'

				3. to contnue running from a breakpoint, we click the 'Resume script execution' btn, in blue in the corner right of the left tab

				4. move code forward, choose the fifth btn staying in the same section to the 'Run this script' or enter 'f9'

				5. step out of current function or go the the next function right away, => just check the tooltips of buttons staying the same section to the
					'Run this script' btn

				4. all of our logs are logged in the 'console' tab of the debugger

	3. Handling Unhandled Routes / 4. An Overview of Error Handling
		=> nothing

	5. Implementing a Global Error Handling Middleware
		* expressjs built-in error middlewares
			+ app.use((err, req, res, next) => {});
				- err: depends on the data Type of the variable passed into next() function of middlewares

			=> by just simply passing a function having 4 arguments, expressjs automatically consider it as an error middleware

			=> Whenever a next() function of a middleware is called with an arg => expressjs will SKIP all other middlewares & send the error, the arg of the
				next() function to error middlewares and execute the error middlewares

			+ exp
				- app.all('*', (req, res, next) => {
					  next({
					    message: `Can't find ${req.originalUrl} on this server`,
					    status: 'fail',
					    statusCode: 404
					  });
					});

					app.use((err, req, res, next) => {
					  err.statusCode = err.statusCode || 500;
					  err.status = err.status || 'error';

					  res.status(err.statusCode).json({
					    status: err.status,
					    message: err.message
					  });
					})
	
		* js Error Object
			+ properties
				- 'name'
					=> error type

				- 'message'
					=> containing is it;s first arg

				- 'stack'
					=> containing 'stack trace' of an error this Object returns

	6. Better Errors and Refactoring
		=> nothing

	7. Catching Errors in Async Functions
		=> since async/await function returns a Promise, we can create a higher order function wrapping the async/await one & call the
			.catch() method of the the async/await function in the hight order one in order to get rid of try-catch block each time we work with
			async/await

			* exp
				+ const catchAsync = fn => {
					  return (req, res, next) => {
					    fn(req, res, next).catch(err => next(err));
					  };
					};

					catchAsync(async (req, res, next) => {
					  ...
					});

	8. Adding 404 Not Found Errors / 9. Errors During Development vs Production
		=> nothing

	10. Handling Invalid Database IDs

		* there;re 3 types of error Object in mongoose
			=> the error Object returned by a fail query has a property 'name' whose value is used to specify the error type of a mongoose error Object
			
			+ each error Object has it;s own set of properties

			+ Below are 3 values of the property 'name' in an error Object corresponding to 3 types of error in mongoose
				1. 'CastError'
					=> Before running built-in validators, Mongoose attempts to 'coerce' input values targeting to 'field' to the 'field';s correct type.
						This process is called 'casting'. If casting fails, the error Object will return 'CastError' error Object

				2. 'ValidationError'
					=> errors produced by both customed & built-in validators

				3. 'MongoError'
					=> errors produced by mongodb, not mongoose

					- errors Object returned by mongodb always has a property 'code' indicating what exactly is the error

	11. Handling Duplicate Database Fields / 12. Handling Mongoose Validation Errors
		=> nothing

	13. Errors Outside Express Unhandled Rejections
		* what is Unhandled Rejections
			=> errors that don;t come from expressjs application such as the 'password' or 'connection string' used to connect to the db is wrong

			+ Deal with this  kind of error
				=> whenever there;s a 'Unhandled Rejections' error occurs in a Nodejs application, process Object will emit an event called
					'unhandledRejection' automatically. Therefore, to deal with this error, we just need to add an event listener to process listening to
					the 'unhandledRejection' event

				- exp
					* // *** handle 'Unhandled Rejections', errors that don't come from expressjs
						process.on('unhandledRejection', err => {
						  console.log(err.name, err.message);
						});

		* shutdown gracefully
			=> process.exit() will close our application immediately. Thus, all requests which are currently running will be abort. => we need to
				'shutdown gracefully' by
					1. first closing the server
						=> gives the server time to process pending & running request before it shuts down

					2. only then shutting down the application

			+ exp
				- const server = app.listen(port, () => {
					  console.log(`server is up & running on port: ${port}`);
					});

					// *** handle 'Unhandled Rejections', errors that don't come from expressjs
					process.on('unhandledRejection', err => {
					  console.log(err.name, err.message);
					  console.log('========== UNHANDLED REJECTION !!! shutting down ==========');

					  // *** manually shutdown the server which gives it time to finish pending & running request
					  server.close(() => {
					    process.exit(1);
					  });
					});

			+ NOTICES:
				- in real world, there;re tools or some platform hosting nodejs help us restart our server right away when it;s shutted down / crashed

	14. Catching Uncaught Exceptions
		* what are Uncaught Exceptions
			=> all errors occuring comming from nodejs(except for ones;re occurs in functions already have error handlers)
				+ // *** => ReferenceError: x is not defined
					console.log(x);

			+ Deal with this kind of error
				=> similar to 'Unhandled Rejections', whenever there;s an 'Uncaught Exceptions' error occurs in a Nodejs application, process Object will
					emit an event called 'uncaughtException' automatically. Therefore, to deal with this error, we just need to add an event listener to
					process listening to the 'uncaughtException' event

				- exp:
					* // *** put this on top of a the main script before all operations happen in order to catch all uncaught exceptions 
						// ***** and since the server doesn't start on the top of a script :)). Therefore,  we could simply shut down the
						// ***** server right away  using process.exit()
						process.on('uncaughtException', err => {
						  console.log(err.name, err.message);
						  console.log('========== UNCAUGHT EXCEPTION !!! shutting down ==========');

					    process.exit(1);
						});

10. Authentication, Authorization and Security
	1. Section Intro / 2. Modelling Users / 3. Creating New Users
		=> nothing

	4. Managing Passwords
		* mongooseDocument.isModified(aDocumentFieldName)
			+ aDocumentFieldName: String (Optional)

			=> if this method receives no arg => it returns true if this document is modified(create or update) or if it receives an arg =>
				it returns true if a 'field' with a given name(the arg) of this document is modified(create or update), else false.

			+ exp:
				=> We ONLY want to encrypt the 'password' field of a document when it;s modified(create or update). In case, the user
					update / create other 'fields' like 'email' or 'name' ones => we don;t want to encrypt the 'password' field one more time

				- mongooseSchema.pre('save', function(next) {
						// *** if the user update other fields rather than the 'password' field => we don't encrypt the 'password' field
						// ***** one more time by just running other middlewares right a way
					  if (!this.isModified('password')) return next();
					});

		* bcrypt algorithm;s hashing round
			=> is the hashing cost which determine how extensive the CPU will be used to hash a password. The more extensive
				the CPU is made use of, the more secure the password will be hashed. In addition, the time it takes to hash a pwd is also
				slower as well

		* set a document field to undefined
			=> in order to prevent a field from being saved to a document before the document is saved to db, we just simply set the
				field;s value to undefined 

	5. How Authentication with JWT Works // *** continue (this part is written wrong & not finished yet)
		* Jwt ('Json web token')
			+ working flow:
				1. a user makes a login request with a email/a usernam & a password

				2. the server check if the user exist and if the password is correct => a unique 'Json web token' for that user is created by
					using a 'secret' string stored on the server

				3. the server send the jwt back to client which will store it in a cookie || a local storage

				4. each time the user want to access a protected route like: user profile, he/she need to get the jwt in his/her cookie ||
					local storage & send it to the server

				5. the server check if the jwt is correct. If so => the server sends the appropriate data to the user, else the server sends
					error telling the user that he/she is not allow to access the route

					=> this step is repeat each time the user want to access a protected route

				- NOTICES
					* all step above must happen over HTTPs => to prevent anyone from accessing to others; passwords & jwt

			+ parts of a jwt
				=> jwt is made up of 3 parts:
					1. 'header'
						=> request header

					2. 'payload'
						=> the data we will send to clients the more data the payload contains the bigger the jwt

					3. 'verify signature'
						=> created by using the 'header', the 'payload' & a 'secret' string(see the 2. step in the 'working flow' section)

			+ jwt verifying steps
				=>
					- after the above 3 steps, the server send the 'header' & the 'payload' as well as 'verify signature' is sent to clients
						=> these 3 parts which is sent to clients is called jwt






