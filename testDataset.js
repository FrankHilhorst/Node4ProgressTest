/**
 * New node file
 */

var conf = require("./config/config.json");
var node4progress = require("node4progress")(conf);
node4progress.setAppsvrProc("Examples/CustomerHandler.p","",false,true);
node4progress.setParameter("InputPars","longchar","input","NumCustomersToPull=10&batchNum=1","");
node4progress.setParameter("OutputPars","character","output","","");
node4progress.setParameter("dsCustomer","dataset-handle","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
console.log("invoking Appserver Procedure");
node4progress.invoke(function(err,result){
	var dataset = null;
	var modName = "";
	if(err){
		console.log("ERROR->"+err);
	}else{
		console.log(result);
		var jsonObj=JSON.parse(result);
		//console.log("jsonObj->"+JSON.stringify(jsonObj));
		try{
			//dataset = new Dataset("dsCustomer",jsonObj);
			dataset = node4progress.getDataset("dsCustomer",jsonObj);
		}catch(err){
			console.log(err);
		}
		var ttCustomer = dataset.$("ttCustomer");		
		ttCustomer.forEach(function(buffer){
			var line = buffer.$("cust-num").$("label") + ":" + buffer.$("cust-num").$("value") + "\n" + buffer.$("name").$("label") + ":" + buffer.$("name").$("value");
			buffer.$("name").bufferValue(buffer.$("name").$("value") + "->Modified");
			console.log(line);
		});			
		ttCustomer.forEach(function(buffer){
			buffer.$("name").setAttr("format","x(40)");
			var line=buffer.display("cust-num name city state balance");
			console.log(line);
		});	
		/*
		var newCust = ttCustomer.bufferCreate();
		newCust.$("cust-num").bufferValue(1200);
		newCust.$("name").bufferValue("frank hilhorst");
		var jsonStr = dataset.writeJson();
		console.log("jsonStr->"+jsonStr);
		*/
		
		//console.log("JSON STR\n"+ttCustomer.writeJson())
		//console.log("JSON STR\n"+dataset.writeJson());
	}
});
