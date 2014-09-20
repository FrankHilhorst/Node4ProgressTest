/**
 * New node file
 */

var conf = require("./config/config.json");
var node4progress = require("node4progress")(conf);

node4progress.getEmptyDataset("dsCustomer","examples/CustUpdDs-SchemaProvider.p",function(err,dsCustomer){
	var ttCustomer=null;
	var ttCustBuf=null;
	//console.log("dsCustomer(1)--->"+JSON.stringify(dsCustomer.dataset));
	if(err){
		console.log("ERROR->"+err);
	}else{
		ttCustomer=dsCustomer.$("ttCustomer");
		ttCustBuf=ttCustomer.bufferCreate();
		ttCustBuf.$("cust-num").bufferValue(-1);
		ttCustBuf.$("name").bufferValue("Frank Hilhorst");
		ttCustBuf.$("Address").bufferValue("1567 Leisure lane");
		ttCustBuf.$("City").bufferValue("Port saint Lucie");
		ttCustBuf.$("State").bufferValue("FL");
		ttCustBuf.$("Postal-Code").bufferValue("34953");
		ttCustBuf.$("Phone").bufferValue("777-777-7777");
		ttCustBuf.$("Credit-Limit").bufferValue(10000);
		node4progress.setAppsvrProc("Examples/CustUpdDs.p","",false,true);
		node4progress.setParameter("Imode","character","input","ADD","");
		node4progress.setParameter("iInputParameters","character","input","","");
		node4progress.setParameter("dsOrder","dataset-handle","input-output",dsCustomer.writeJson(),"examples/CustUpdDs-SchemaProvider.p");
		node4progress.setParameter("oOutputPars","character","output","","");
		node4progress.setParameter("ErrMsg","character","output","","");
		console.log("invoking Appserver Procedure CustUpdDs.p->ADD");		
		node4progress.appProc().execute(function(err,result){
			jsonObj=JSON.parse(result);
			console.log("Customer Add Result->"+
					    "\n   ->oOutputPars->"+jsonObj.output.oOutputPars+
					    "\n   ->ErrMsg->"+jsonObj.output.ErrMsg);
			var dsCust = node4progress.getDataset("dsCustomer",result);
			var ttCustomer = dsCust.$("ttCustomer");
			var ttCustBuf = ttCustomer.findFirst();
			var displayMsg = "";
			
			displayMsg = "New customer added\n" +
	         			 "Cust-num  : " + ttCustBuf.$("cust-num").$("screenValue") + "\n" +			
				         "Name      : " + ttCustBuf.$("name").$("screenValue") + "\n" +
		                 "Address   : " + ttCustBuf.$("Address").$("screenValue")	+ "\n" +
		                 "City      : " + ttCustBuf.$("City").$("screenValue")	+ "\n" +
		                 "Country   : " + ttCustBuf.$("Country").$("screenValue")	+ "\n";	
			console.log(displayMsg);
		});
	}
});
