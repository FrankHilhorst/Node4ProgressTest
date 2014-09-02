/**
 * New node file
 */

var node4progress = require("node4progressHttp")(null);
var handler="handlers/CustomerHandler.p";
var inputPars = 'NumCustomersToPull=2';

node4progress.handler().execute(handler,inputPars,function(err,result){
	console.log("CUSTOMER HANDLER RESULT");
	console.log(result);	
});


handler="Examples/OrderHandler.p";
inputPars = 'NumOrdersToPull=2'; 

node4progress.handler().execute(handler,inputPars,function(err,result){
	console.log("ORDER HANDLER RESULT");
	console.log(result);
});
