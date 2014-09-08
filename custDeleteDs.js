/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/CustUpdDs.p","",false,true);
node4progress.setParameter("Imode","character","input","GetCustomer","");
node4progress.setParameter("iInputParameters","character","input","mode=FromTo|cust-num-from=1100|cust-num-to=9999","");
node4progress.setParameter("dsCustomer","dataset-handle","input-output","","examples/CustUpdDs-SchemaProvider.p");
node4progress.setParameter("oOutputPars","character","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
node4progress.invoke(function(err,result){
console.log("result->\n"+result);

	var dsCustomer = node4progress.getDataset("dsCustomer",result);
	dsCustomer.$("ttCustomer").forEach(function(buffer){
		var line = buffer.display("Cust-num Name Address City State Country");
		console.log(line);
	});
	var dsCustomerCopy=dsCustomer.copyDataset(true);
	var buffer=dsCustomer.$("ttCustomer").findLast();
	var deletedRecord=dsCustomer.$("ttCustomer").bufferDelete();
	//console.log("deletedRecord->"+JSON.stringify(deletedRecord));
	
	dsCustomerCopy.$("ttCustomer").bufferCreate();
	dsCustomerCopy.$("ttCustomer").bufferCopy(deletedRecord);
	//console.log("WriteJson->\n"+dsCustomerCopy.writeJson());
	node4progress.setAppsvrProc("Examples/CustUpdDs.p","",false,true);
	node4progress.setParameter("Imode","character","input","Delete","");
	node4progress.setParameter("iInputParameters","character","input","","");
	node4progress.setParameter("dsCustomer","dataset-handle","input-output",dsCustomerCopy.writeJson(),"examples/CustUpdDs-SchemaProvider.p");
	node4progress.setParameter("oOutputPars","character","output","","");
	node4progress.setParameter("ErrMsg","character","output","","");
	node4progress.invoke(function(err,result){
		console.log(result);
	});	
	
});

