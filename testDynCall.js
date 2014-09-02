/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);

node4progress.setAppsvrProc("handlers/CustomerHandler.p","",false,true);
node4progress.setParameter("InputPars","longchar","input","NumCustomersToPull=5&batchNum=2","");
node4progress.setParameter("OutputPars","character","output","","");
node4progress.setParameter("dsCustomer","dataset-handle","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
console.log("invoking Appserver Procedure");
node4progress.appProc().execute(function(err,result){
	console.log("CUSTOMERS RESULT");
	if(err){
		console.log("ERROR->"+err);
	}else{
		console.log(result);
		result=JSON.parse(result);
		console.log("parsed results~n"+result);
	}
});

node4progress.setAppsvrProc("handlers/OrderHandler.p","",false,true);
node4progress.setParameter("InputPars","longchar","input","NumOrdersToPull=2","");
node4progress.setParameter("OutputPars","character","output","","");
node4progress.setParameter("dsOrder","dataset-handle","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
console.log("invoking Appserver Procedure");
node4progress.appProc().execute(function(err,result){
	console.log("ORDERS RESULT");
	if(err){
		console.log("ERROR->"+err);
	}else{
		result = result.toString();
		console.log(result);
		result=JSON.parse(result);
		console.log("parsed results~n"+result);
	}
});