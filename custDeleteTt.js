/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/CustUpdTt.p","",false,true);
node4progress.setParameter("Imode","character","input","GetCustomer","");
node4progress.setParameter("iInputParameters","character","input","mode=FromTo|cust-num-from=1100|cust-num-to=9999","");
node4progress.setParameter("oTtCustomer","table-handle","input-output","","examples/CustUpdTt-SchemaProvider.p");
node4progress.setParameter("oOutputPars","character","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
node4progress.invoke(function(err,result){
    //console.log("result->\n"+result);

	var ttCustomer = node4progress.getTempTable("ttCustomer",result);
	ttCustomer.forEach(function(buffer){
		var line = buffer.display("Cust-num Name Address City State Country");
		console.log(line);
	});
	
	var ttCustomerCopy=ttCustomer.copyTempTable(true);
	var buffer=ttCustomer.findLast();
	var deletedRecord=ttCustomer.bufferDelete();
	//console.log("deletedRecord->"+JSON.stringify(deletedRecord));
	
	ttCustomerCopy.bufferCreate();
	ttCustomerCopy.bufferCopy(deletedRecord);
	console.log("WriteJson->\n"+ttCustomerCopy.writeJson());
	
	node4progress.setAppsvrProc("Examples/CustUpdTt.p","",false,true);
	node4progress.setParameter("Imode","character","input","Delete","");
	node4progress.setParameter("iInputParameters","character","input","","");
	node4progress.setParameter("ttCustomer","table-handle","input-output",ttCustomerCopy.writeJson(),"examples/CustUpdTt-SchemaProvider.p");
	node4progress.setParameter("oOutputPars","character","output","","");
	node4progress.setParameter("ErrMsg","character","output","","");
	node4progress.invoke(function(err,result){
		console.log(result);
	});
	
	
});
