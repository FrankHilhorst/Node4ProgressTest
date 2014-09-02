/**
 * New node file
 */

var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/OrderHandler.p","",false,true);
node4progress.setParameter("InputPars","longchar","input","NumOrdersToPull=20","");
node4progress.setParameter("OutputPars","character","output","","");
node4progress.setParameter("dsOrder","dataset-handle","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
console.log("invoking Appserver Procedure");
node4progress.appProc().execute(function(err,result){
	var dataset = null;
	var cnt=1;
	var mnth=1;
//console.log("result->"+result);	
	if(err){
		console.log("ERROR->"+err);
	}else{
		//console.log(result);
		try{
			dataset = node4progress.getDataset("dsOrder",result);
		}catch(err){
			console.log(err);
		}
		var ttOrder = dataset.$("ttOrder");
//console.log("ttOrder->"+ttOrder.writeJson());		
		var ttOrderline = dataset.$("ttOrderLine");
		console.log("now with modifications");
		ttOrder.forEach(function(buffer){
			var dt = buffer.$("order-date").$("buffer-value");
			var line = "Cust-num->"+buffer.$("Cust-num").$("value") + "->"+buffer.$("Order-num").$("value")+"->"+
			           buffer.$("Order-date").$("value");
			++cnt;
			++mnth;
			var dt=new Date(2014,mnth,cnt);
			buffer.$("Order-date").bufferValue(dt);
			console.log(line);
		});	
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
		//var jsonStr=ttOrder.bufferCreate();
		//console.log("bufferCreate->"+jsonStr);
	}
});

