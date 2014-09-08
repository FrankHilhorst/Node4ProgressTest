/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);

node4progress.getEmptyTempTable("ttCustomer","examples/CustUpdTt-SchemaProvider.p",function(err,ttCustomer){
	var ttCustBuf=null;
	console.log("CustAddTt.js->ttCustomer--->"+ttCustomer);
	if(err){
		console.log("ERROR->"+err);
	}else{		
		ttCustBuf=ttCustomer.bufferCreate();
		ttCustBuf.$("cust-num").bufferValue(-1);
		ttCustBuf.$("name").bufferValue("Rob Hilhorst");
		ttCustBuf.$("Address").bufferValue("Belgradostraat 30 huis");
		ttCustBuf.$("City").bufferValue("Hengelo");
		ttCustBuf.$("State").bufferValue("FL");
		ttCustBuf.$("Postal-Code").bufferValue("34952");
		ttCustBuf.$("Phone").bufferValue("777-777-7777");
		ttCustBuf.$("Credit-Limit").bufferValue(11000);
console.log("ttCustomer.writeJson()->"+ttCustomer.writeJson());		
		node4progress.setAppsvrProc("Examples/CustUpdTt.p","",false,true);
		node4progress.setParameter("Imode","character","input","ADD","");
		node4progress.setParameter("iInputParameters","character","input","","");
		node4progress.setParameter("ttCustomer","table-handle","input-output",ttCustomer.writeJson(),"examples/CustUpdTt-SchemaProvider.p");
		node4progress.setParameter("oOutputPars","character","output","","");
		node4progress.setParameter("ErrMsg","character","output","","");
		console.log("invoking Appserver Procedure");		
		node4progress.invoke(function(err,result){
			//console.log("result->"+result);
			jsonObj=JSON.parse(result);
			console.log("Customer Add Result->"+
					    "\n   ->oOutputPars->"+jsonObj.output.oOutputPars+
					    "\n   ->ErrMsg->"+jsonObj.output.ErrMsg);
		});
	}
});
