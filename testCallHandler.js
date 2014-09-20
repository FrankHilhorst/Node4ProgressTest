/**
 * New node file
 */
var conf = require("./config/config.json");
var node4progress = require("node4progress")(conf);
var handler="handlers/CustomerHandler.p";
var inputPars = 'NumCustomersToPull=2';

node4progress.callHandler(handler,inputPars,true,function(err,result){
	console.log("CUSTOMER HANDLER RESULT");
	console.log(result);	
	var dataset = node4progress.getDataset("dsCustomer",result);	
	var ttCustomer = dataset.$("ttCustomer");
	ttCustomer.forEach(function(buffer){
		buffer.$("name").setAttr("format","x(40)");
		var line=buffer.display("cust-num name city state balance");
		console.log(line);
	});	
	
});


handler="Examples/OrderHandler.p";
inputPars = 'NumOrdersToPull=2'; 

node4progress.callHandler(handler,inputPars,true,function(err,result){
	//console.log("ORDER HANDLER RESULT");
	var dataset;
	//console.log(result);
	try{
		dataset = node4progress.getDataset("dsOrder",result);
	}catch(err){
		console.log(err);
	}
	var ttOrder = dataset.$("ttOrder");
//console.log("ttOrder->"+ttOrder.writeJson());		
	var ttOrderline = dataset.$("ttOrderLine");
	ttOrder.forEach(function(buffer){
		var orderNum=buffer.$("order-num").$("value");
		var line=buffer.display("cust-num order-num order-date promise-date");
		var line2="";
		ttOrderline.forEach(function(buffer){
			if(buffer.$("order-num").$("value")==orderNum){
				line2=buffer.display("order-num line-num item-num Extended-Price");
				console.log(line + line2);
			}
			
		});
	});	
	
});
