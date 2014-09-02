/**
 * New node file
 */

var spawn = require('child_process').spawn,
    sleep = require("sleep");

function spawnTest(){
	this.env = process.env;
	this.env.appserverUrl = "APPSERVERDC://192.168.56.101:4090";
	this.env.appserverUserName = "";
	this.env.appserverUserPassword = "";
	this.env.appserverSessionModel = "state-less";
	this.env.winstoneSvrPort = 8085;
	
	console.log(__dirname + "/node_modules/node4progressHttp/winstone");
	/*
	var args = ['-jar', './winstone-0.9.10.jar','--warfile',"./webapps/Node4ProgressServlet.war",'--httpPort='+env.winstoneSvrPort];
	var options = { 
			cwd: __dirname + "/node_modules/node4progressHttp/winstone",
			env: env,
			env: env,
			detached: false,
			//stdio:['ignore',out,err],
			//stdio:[null,process.stdout],
			setsid: true		
	};
	winstone = spawn('java', args, options);
	
	winstone.stdout.on('data', function (data) {
		  console.log('stdout fired: ' + data);
		});
	
	winstone.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		});
	
	winstone.on('close', function (code) {
		  console.log('child process exited with code ' + code);
		});
		*/
	this.startWinstone();
}

spawnTest.prototype.startWinstone = function(){
	var args = ['-jar', './winstone-0.9.10.jar','--warfile',"./webapps/Node4ProgressServlet.war",'--httpPort='+this.env.winstoneSvrPort];
	var options = { 
			cwd: __dirname + "/node_modules/node4progressHttp/winstone",
			env: this.env,
			detached: false,
			//stdio:['ignore',out,err],
			//stdio:[null,process.stdout],
			setsid: true		
	};
	this.winstone = spawn('java', args, options);
	
	this.winstone.stdout.on('data', function (data) {
          console.log('stdout fired: ' + data);
          //console.log("ToString->"+data.toString());
          
          if(data.toString().indexOf("Listener started:") > 0){
             console.log("BINGO -> Winstone started");
          }	 
          
		});
		
	
	this.winstone.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		});
	
	this.winstone.on('close', function (code) {
		  console.log('child process exited with code ' + code);
		});
	
};
sp = new spawnTest();
//sleep.sleep(5);