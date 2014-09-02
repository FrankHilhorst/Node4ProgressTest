/**
 * New node file
 */

/*
function Dataset(iDatasetNm,iJsonObj){
	this.dataset=null;
	this.metaSchema=null;
	this.name = "";
	this.getDataset(iDatasetNm,iJsonObj);
	console.log("Dataset Name->"+this.name);
	if(this.name == ""){
		throw new Error("Dataset "+iDatasetNm+" not found");
	}
}

Dataset.prototype.$ = function(ttName){
	var targetTable = null;
	var datasetContents = this.dataset[this.name];
	var ttNm = "";
	for(tt in datasetContents){		
		if(tt.toString().toLowerCase() == ttName.toLowerCase()){
			targetTable = datasetContents[tt];
			ttNm=tt;
			break;
		}
	}
	return new TempTable(ttNm,targetTable,this.metaSchema[ttNm]);
};
Dataset.prototype.getDataset = function(iDatasetNm,iJsonObj){
	for(var prop in iJsonObj){
		if(iDatasetNm.toLowerCase() == prop.toString().toLowerCase()){
			if(iJsonObj[prop+"MetaSchema"]){
				this.dataset=iJsonObj[prop];
				this.metaSchema=iJsonObj[prop+"MetaSchema"];
				this.name=prop.toString();
				break;
			}
		}
		if(typeof iJsonObj[prop] == "object"){
			this.getDataset(iDatasetNm,iJsonObj[prop]);
		}
	}
};
Dataset.prototype.writeJson = function(){
	var writeJson="";
	if(this.dataset){
		writeJson=JSON.stringify(this.dataset);
	}
	return writeJson;
};
function TempTable(iName,ttArray,iMetaSchema){
	this.records = [];	
	this.name=iName;
	this.metaSchame=iMetaSchema;
	this.buffer = new Buffer(this,this.metaSchame);
	if(typeof ttArray === "object"){
		this.records=ttArray;
	}
}

TempTable.prototype.forEach = function(callback){
	var that = this;
	this.records.forEach(function(currentRecord){
		that.buffer.setCurrentRecord(currentRecord);
		callback(that.buffer);
	});
};
TempTable.prototype.findFirst = function(){
	var currentBufferRecord = null;
	if(this.records.length>0){
		currentBufferRecord = this.buffer.setCurrentRecord(this.record[0]);
	}
	return currentBufferRecord;
};
TempTable.prototype.findLast = function(){
	var currentBufferRecord = null;
	if(this.records.length>0){
		currentBufferRecord = this.buffer.setCurrentRecord(this.records.length - 1);
	}
	return currentBufferRecord;
};
TempTable.prototype.writeJson = function(){
	writeJson='{ "'+this.name+'":'+JSON.stringify(this.records) + "}";
	return writeJson;
};
TempTable.prototype.jsonObjectEmpty = function(jsonObj){
	var i = 0;
	jsonObjectEmpty=true;
	if(jsonObj !== null){
		for(var prop in jsonObj)
			++i;
		if(i > 0)
			jsonObjectEmpty=false;
	}
	return jsonObjectEmpty;	
};
function Buffer(iTempTable,iMetaSchema){
	this.currentRecord = null;
	this.tempTable = iTempTable;
	this.metaSchema = iMetaSchema;	
	this.bufferField = new BufferField();
}

Buffer.prototype.setCurrentRecord = function(iCurrentRecord){
	this.currentRecord=iCurrentRecord;
};
Buffer.prototype.$ = function(fieldNm){
	//var bufferField = new BufferField();
	var value = "";
	var fieldMetaSchema = null;
	for(var prop in this.currentRecord){
		if(prop.toLowerCase() == fieldNm.toLowerCase()){
			value=this.currentRecord[prop];
			fieldMetaSchema=this.metaSchema[prop];	
			this.bufferField.setCurrenBufferField(prop,this.currentRecord,fieldMetaSchema);
			break;
		}
	}
	return this.bufferField;
};
Buffer.prototype.display = function(iFieldToDisplay){
	var fields = iFieldToDisplay.split(" ");
	var fieldStr = "";
	for(var i=0;i<fields.length;i++){
		if(i>0){fieldStr+=" ";}
		fieldStr+=this.$(fields[i]).$("screenValue");
	}
	return fieldStr;
};

function BufferField(){
	this.currentRecord=null;
	this.name="";
	this.value="";
	this.dataType="";
	this.initial="";
	this.format="";
	this.label="";
	this.metaSchema=null;
};
BufferField.prototype.setCurrenBufferField  = function(iName,iCurrentRecord,iFieldMetaSchema){
	this.name=iName;
	this.currentRecord=iCurrentRecord;
	this.value=this.currentRecord[this.name];
	this.dataType=iFieldMetaSchema["dataType"];
	this.format=iFieldMetaSchema["format"];
	this.initial=iFieldMetaSchema["initial"];
	this.label=iFieldMetaSchema["label"];	
};
BufferField.prototype.$ = function(iAttribute){
	var attrVal="";
    if(iAttribute.toLowerCase()=="buffervalue"||
    	iAttribute.toLowerCase()=="value"||
    	iAttribute.toLowerCase()=="buffer-value"){
    	attrVal=this.value;
    }
    else if(iAttribute.toLowerCase()=="format"){attrVal=this.format;}
    else if(iAttribute.toLowerCase()=="initial"){attrVal=this.initial;}
    else if(iAttribute.toLowerCase()=="label"){attrVal=this.label;}
    else if(iAttribute.toLowerCase()=="datatype"||
    		iAttribute.toLowerCase()=="data-type"){attrVal=this.dataType;}
    else if(iAttribute.toLowerCase()=="screenvalue"){
    	attrVal=this.formattedValue();
    }
    else {
    	throw new Error("Invalid buffer field attribute of '"+iAttribute+"' requested");
    }
    return attrVal;
};
BufferField.prototype.bufferValue = function(iValue){
	this.currentRecord[this.name] = iValue;
};
BufferField.prototype.formattedValue = function(){
    var length=0;
    var formattedValue=this.value;
    var str="";
	var char="";
	var i = 0;
	var j = 0;
	var k = 0;
	var value=null;
	var strLength=0;
	if(this.dataType.toLocaleLowerCase()=="character"){
		if(this.format.substring(1,2)=="("){
			length=this.format.substring(2,this.format.length-1);
		} else{
			length=this.format.length;
		}	
		if(length<this.value.length){
			formattedValue=this.value.substring(0, length);
		}else{
			for(i=this.value.length;i<length;i++){
				formattedValue+=" ";
			}
		}
	} else if(this.dataType.toLocaleLowerCase()=="integer" ||
			this.dataType.toLocaleLowerCase()=="decimal"){
		
		j=0;
		value=this.value;
		if(this.dataType.toLocaleLowerCase()=="decimal"){
			var decimalPrecision=0;
			if(this.format.indexOf(".",0)>=0){
		       decimalPrecision=this.format.length-this.format.toString().indexOf('.',0)-1;
			}
			value.toFixed(decimalPrecision);
		}		
		str=value.toString();
		length=this.format.length;		
		formattedValue="";//console.log("this.format->"+this.format);		
		for(i=0;i<this.format.length;i++){
			char=this.format.substring(i,i+1);			
			if(char==">"){formattedValue+=" ";}
			else if(char==","){formattedValue+=",";}
			else if(char=="9"){formattedValue+="0";}
			else if(char=="."){formattedValue+=".";}
			else if(char=="-"){formattedValue+="-";}
        }
		k=0;
		for(i=value.toString().length - 1;i>=0;i--){
		    j=length-value.toString().length+i+1-k;
			char=formattedValue.substring(j-1,j);
			if(char==","){
				j--;
				k++;
			}
			formattedValue=formattedValue.substring(0,j-1)+value.toString().substring(i,i+1)+formattedValue.substring(j,length);
		}
		for(i=0;i<formattedValue.length-1;i++){
			if(formattedValue.substring(i,i+1)=="," &&
			   (formattedValue.substring(i+1,i+2)==" " ||
				i == 0 ||
			   formattedValue.substring(i-1,i)==" ")){
			   formattedValue=formattedValue.substring(0,i) + " " + formattedValue.substring(i+1,formattedValue.length);	
			}
		}	
		
		if(this.value>=0){
			formattedValue=formattedValue.replace("-"," ");
		}else if(this.format.substring(0,1)=="-" &&
				this.format.length>=2 &&
				this.format.substring(1,2) == ">"){
			formattedValue=" "+formattedValue.substring(1,formattedValue.length);
		}		
		
	} else if(this.dataType.toLocaleLowerCase()=="date"){
		formattedValue=this.formattedValueDate();
	}	
    return formattedValue;
};

BufferField.prototype.formattedValueDate = function(){
	var day = "";
	var month = "";
	var year = "";
	var formattedValue = "";
	if(this.value instanceof "Date"){
		month = this.value.getMonth() + 1;
		if(month.length < 2){month = "0" + month;}
		day=this.value.getDate();
		if(day.length < 2){day = "0" + day;}
		year=this.value.getFullYear();
		if(this.format === "99/99/99"){
			formattedValue=month + "/" + day + "/" + year.substring(2, 4);
		}else if(this.format === "99/99/9999"){
			formattedValue=month + "/" + day + "/" + year;
		}
	}
	return formattedValue;
};
*/
var node4progress = require("node4progressHttp")(null);
node4progress.setAppsvrProc("Examples/CustomerHandler.p","",false,true);
node4progress.setParameter("InputPars","longchar","input","NumCustomersToPull=10&batchNum=1","");
node4progress.setParameter("OutputPars","character","output","","");
node4progress.setParameter("dsCustomer","dataset-handle","output","","");
node4progress.setParameter("ErrMsg","character","output","","");
console.log("invoking Appserver Procedure");
node4progress.appProc().execute(function(err,result){
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
