/**
 * New node file
 */
var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/CustUpdDs.p","",false,true);
node4progress.setParameter("Imode","character","input","GetCustomer","");
node4progress.setParameter("iInputParameters","character","input","cust-num=1136","");
node4progress.setParameter("dsCustomer","dataset-handle","input-output","","examples/CustUpdDs-SchemaProvider.p");
node4progress.setParameter("oOutputPars","character","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
node4progress.invoke(function(err,result){
	
	var newName = "Rob Hilhorst";
	var newAddress = "30 Belgradostraat";
	var newCity = "Hengelo";
	var newState = "FL";
	var newCountry = "Netherkands";
    
	/*
	var newName = "Frank Hilhorst";
	var newAddress = "1567 Leisure Lane";
	var newCity = "Port Saint Lucie";
	var newState = "FL";
	var newCountry = "USA";
	*/
	var dsCust = node4progress.getDataset("dsCustomer",result);
	var ttCustomer = dsCust.$("ttCustomer");
	var ttCustBuf = ttCustomer.findFirst();
	var displayMsg = "";
	
	displayMsg = "Pre-uodate values\n" +
		         "Name    : " + ttCustBuf.$("name").$("screenValue") + "\n" +
                 "Address : " + ttCustBuf.$("Address").$("screenValue")	+ "\n" +
                 "City    : " + ttCustBuf.$("City").$("screenValue")	+ "\n" +
                 "Country : " + ttCustBuf.$("Country").$("screenValue")	+ "\n";
	
	console.log(displayMsg);
	
	ttCustBuf.$("name").bufferValue(newName);
	ttCustBuf.$("Address").bufferValue(newAddress);
	ttCustBuf.$("City").bufferValue(newCity);
	ttCustBuf.$("Country").bufferValue(newCountry);
	ttCustBuf.$("State").bufferValue(newState);

	displayMsg = "Post-uodate values\n" +
				 "Name    : " + ttCustBuf.$("name").$("screenValue") + "\n" +
				 "Address : " + ttCustBuf.$("Address").$("screenValue")	+ "\n" +
				 "City    : " + ttCustBuf.$("City").$("screenValue")	+ "\n" +
				 "Country : " + ttCustBuf.$("Country").$("screenValue")	+ "\n";
	
	console.log(displayMsg);
	node4progress.setAppsvrProc("Examples/CustUpdDs.p","",false,true);
	node4progress.setParameter("Imode","character","input","UPDATE","");
	node4progress.setParameter("iInputParameters","character","input","","");
	node4progress.setParameter("dsCustomer","dataset-handle","input-output",dsCust.writeJson(),"examples/CustUpdDs-SchemaProvider.p");
	node4progress.setParameter("oOutputPars","character","output","","");
	node4progress.setParameter("ErrMsg","character","output","","");
	node4progress.invoke(function(err,result){
		jsonObj=JSON.parse(result);
		console.log("Customer Add Result->"+
				    "\n   ->oOutputPars->"+jsonObj.output.oOutputPars+
				    "\n   ->ErrMsg->"+jsonObj.output.ErrMsg);
	});
});

