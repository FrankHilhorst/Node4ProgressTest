/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/CustUpd.p","",false,true);
node4progress.setParameter("Imode","character","input","GetCustomer","");
node4progress.setParameter("iInputParameters","character","input","mode=FromTo|cust-num-from=0|cust-num-to=10","");
node4progress.setParameter("dsCustomer","dataset-handle","input-output","","examples/CustUpd-SchemaProvider.p");
node4progress.setParameter("oOutputPars","character","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
node4progress.invoke(function(err,result){
//console.log("result->\n"+result);

	var dsCustomer = node4progress.getDataset("dsCustomer",result);
	var dsCustomerCopy=dsCustomer.copyDataset(false);
	dsCustomerCopy.$("ttCustomer").forEach(function(buffer){
		var line = buffer.display("Cust-num Name Address City State Country");
		console.log(line);
	});
	
});

