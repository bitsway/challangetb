// Put your custom code here


function test() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude)
	$("#long").val(position.coords.longitude)

}

// onError Callback receives a PositionError object
    function onError(error) {
        $("#lat").val(0)
		$("#long").val(0)
    }



//var apipath='http://im-gp.com/urc/'
// var apipath='http://localhost/cpmdt/www/';
//var apipath='http://vyeon.com/cpmdt/syncmobile/';

var apipath='http://app.businesssolutionapps.com/cpmdt/syncmobile_161217/';
//local
//var apipath='http://127.0.0.1:8000/cpmdt/syncmobile_161217/';

var loginResult='';
var patient='';
var sideeffectList='';
var pInfo='';
var start_time='';
var payment=0;

var testResFlag=0;
var chieldFlag=0;

var errror_str='Network Not Available. Please Check that you have Internet active or Mobile have network signal. You can go to a place where network is available and submit the DOT. ';

$(function() {
	
	localStorage.dpid="";
	$("#mobile").val("");
	$("#password").val("");
	
	if (localStorage.dpid=="" || localStorage.dpid==undefined){
		$.mobile.navigate('#pagelogin');
	}else{
		
		$("#PatientList").empty();
		$("#PatientList").html(localStorage.pList).trigger('create');
		
		
		$('#sideeffectList').empty();
		$('#sideeffectList').append(localStorage.sideeffectList).trigger('create');	
		
		$.mobile.navigate('#page1');
	}



}); 


var patient=""; 

//http://127.0.0.1:8000/cpmdt/syncmobile/passwordCheckNew?cid=CPMDT&dpid=1005&mobile=8801234567890&password=9411
//=================================================================
function loginCheckNew() {
	 var mobile=$("#mobile").val() ;
	 var password=$("#password").val() ;
	 
	 //alert(apipath+'passwordCheckNew?cid=CPMDT&dpid='+mobile+'&password='+password);
	 $.ajax({		
		 url: apipath+'passwordCheckNew?cid=CPMDT&dpid='+mobile+'&password='+password,
		  success: function(result) {
			loginResult=result
			//alert (loginResult);
			if (loginResult==''){
				alert ('Sorry Network not available');
			}else{			
				localStorage.dpid=mobile;
				
				var loginResultArray = loginResult.split('rdrd');
				
				if (loginResultArray[0]=='YES'){
					//alert (loginResult);
										
					patient=loginResultArray[1];
					sideeffectList=loginResultArray[2];
					attentionList=loginResultArray[3];
					
					localStorage.attentionList=attentionList
					localStorage.sideeffectList=sideeffectList
					$("#tempsideeffect").val(localStorage.sideeffectList)
					$('#sideeffectList').empty();
					$('#sideeffectList').append(localStorage.sideeffectList).trigger('create');	
					
					$("#tempAttention").val(localStorage.attentionList)					
					$('#attention').empty();
					$('#attention').append(localStorage.attentionList).trigger('create');					
										
					var patientArray = patient.split(',');
					var totalPatient=patientArray.length;
					
					pListdiv='<div >আপনি যে রুগীর DOT করবেন তার নামটি সিলেক্ট করুন ।</div>';
					
					var pName="";					
					patientList=''					
					for (i=0; i<totalPatient; i++){ 
						var pArray = patientArray[i].split('fdfd');
						patId=pArray[0].toString();
						pName= pArray[1].toString();						
						
						patientList=patientList+ '<a data-role="button" onClick="patientInfoNew(\''+patId+'\')" >'+pName+'('+patId+')'+'</a>';
					}
					
					pListdiv=pListdiv+patientList;
					
					localStorage.pList=pListdiv
					
					$("#PatientList").empty();
					$("#PatientList").html(pListdiv).trigger('create');					
					
										
					var url = "#page1";  
					
					$.mobile.navigate(url);
				
				}
				else if (loginResultArray[0]=='NO'){
					
					$("#myerror").html('Authentication Error');
				
				}
			  }
		  	},
			  error: function(result) {
				  $("#errror").text(errror_str);
				 url = "#pagelogin"; 
				$.mobile.navigate(url);
			  }
		  
		});
		
			
						
	
	}


function patientInfoNew(p) {		
		
		var page=1;
		
		var tempSideeffectAction='<div id="checkboxes2" data-role="fieldcontain"><fieldset data-role="controlgroup" data-type="vertical"><legend>রোগীর পার্শপ্রতিক্রিয়া সমাধানে কি ব্যবস্তা নিয়া হইছিল?</legend><input id="checkConsultation" name="checkConsultation" type="checkbox"><label for="checkConsultation">আশ্বস্থ করা হলো </label><input id="checkReferral" name="checkReferral" type="checkbox"><label for="checkReferral">চিকিৎসকের সাথে পরামর্শ </label><input id="checkSEA4" name="checkSEA4" type="checkbox"><label for="checkSEA4">চিকিৎসকের কাছে প্রেরণ </label><input id="checkSEA3" name="checkSEA3" type="checkbox"><label for="checkSEA3">ভর্তির জন্য প্রেরণ </label></fieldset></div>';
		
		var tempSideeffectCheck='<div data-role="fieldcontain"><fieldset data-role="controlgroup" ><legend> Ask the patient, whether he/she is <b>experiencing any side effect</b>:</legend><input id="radio1" name="yesno" value="Yes" type="radio"><label for="radio1"> Yes </label><input id="radio2" name="yesno" value="No" type="radio" checked="checked"><label for="radio2"> No </label></fieldset></div>';
		
		var tempPaymentCheck='<div id="checkboxes2" data-role="fieldcontain"><fieldset data-role="controlgroup" ><legend>Ask the patient whether he/she has received nutritional support for this month</legend><input id="radio1" name="pPayment" value="1" type="radio"><label for="radio1"> Yes </label><input id="radio2" name="pPayment" value="0" type="radio" checked="checked" ><label for="radio2"> No </label></label></fieldset>';
		
		//var childDivTemp='<div id="checkboxes2" data-role="fieldcontain"><fieldset data-role="controlgroup" data-type="vertical"><legend>Is there any children under five (05) in the family</legend><input id="radio1" name="pchild" value="1" type="radio"><label for="radio1"> Yes </label><input id="radio2" name="pchild" value="0" type="radio" checked="checked" ><label for="radio2"> No </label></label></fieldset></div><div id="childYes"><div id="checkboxes2" data-role="fieldcontain"><fieldset data-role="controlgroup" data-type="vertical"><label>Number Of Child</label><input type="text" name="NofChild" id="NofChild"><br><label>Are they receiving IPT</label><input id="radio1" name="pchildRecIPT" value="1" type="radio"><label for="radio1"> Yes </label><input id="radio2" name="pchildRecIPT" value="0" type="radio" checked="checked" ><label for="radio2"> No </label></label></fieldset></div></div>'
		
		var symptCIFTemp='<div data-role="fieldcontain"><fieldset data-role="controlgroup" ><legend> রোগীর নিকটে যারা থাকেন তাদের মধ্যে কারো যক্ষা রোগের লক্ষণ আছে কি না?</legend><input id="radio1" name="yesnoChild" value="Yes" type="radio"><label for="radio1">YES</label><input id="radio2" name="yesnoChild" value="No" type="radio" checked="checked"><label for="radio2"> NO</label></fieldset></div>'
		
		
			
		
		$.ajax({		  
		  url: apipath+'patientInfoNew?cid=CPMDT&patient='+p,
		  success: function(patient) {
			
			//alert (patient);
			pInfo=patient
			var pInfoArray = pInfo.split('rdrd');
			$("#pID").val(p);
			$("#pInfo").html(pInfoArray[0]);
			// $("#medicineList").html(pInfoArray[1]);
			$('#medicineList').empty();
			$('#medicineList').append(pInfoArray[1]).trigger('create');
			
			//$("#testResultList").html(pInfoArray[3]);
			//$('#testResultList').empty();
			//$('#testResultList').append(pInfoArray[3]).trigger('create');
			
			//$("#ref_follow_up").html(pInfoArray[4]);
			$('#ref_follow_up').empty();
			$('#ref_follow_up').append(pInfoArray[4]).trigger('create');
			
			//$("#ref_contectList").html(pInfoArray[5]);
			$('#ref_contectList').empty();
			$('#ref_contectList').append(pInfoArray[5]).trigger('create');
			
			$('#sideEffectcheck').empty();
			$('#sideEffectcheck').append(tempSideeffectCheck).trigger('create');
						
			// $("#tempsideeffect").html(loginResultArray[2])
			$('#sideeffectList').empty();
			$('#sideeffectList').append(localStorage.sideeffectList).trigger('create');
			
			$('#SideeffectActionDiv').empty();
			$('#SideeffectActionDiv').append(tempSideeffectAction).trigger('create');
			
			$('#symptCInFamily').empty();
			$('#symptCInFamily').append(symptCIFTemp).trigger('create');
			
			$('#paymentCheck').empty();
			$('#paymentCheck').append(tempPaymentCheck).trigger('create');
			
			
			$('#attention').empty();
			$('#attention').append(localStorage.attentionList).trigger('create');				
			
			// $('#childDiv').empty();
			// $('#childDiv').append(childDivTemp).trigger('create');

			//$('#checkConsultation').attr('checked').val();
			
			//$("input[name='checkbox']").attr( "checked", false ).checkboxradio( "refresh" );
			// $("#checkConsultation").attr( "checked", false ).checkboxradio("refresh");
			// $("#checkReferral").attr( "checked", true ).checkboxradio("refresh");
			
			payment= eval(pInfoArray[2]);
			
						
			testResFlag= eval(pInfoArray[6]);
			
						
			chieldFlag= eval(pInfoArray[7]);
			
			
			//alert (payment);
			var now = new Date();
			var month=now.getUTCMonth()+1;
			startDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
			
			$("div#nextButton").show();
			var url = "#page2";      
			$(location).attr('href',url);
			test();
		  },
		  error: function(patient) {
			
			 $("#perror").text(errror_str);
			 url = "#page1"; 
			$.mobile.navigate(url);
		  }
		});
		
}

function medicine() {
		var pID=$("#pID").val();
		var medicineList='';
		var sideeffectandmedicineList='';
		//alert(apipath+'sideeffectandmedicineCount?cid=CPMDT&patient='+pID);
		$.ajax({
		  //url: apipath+'sideeffectandmedicineCount.php?patient='+pID,
		  url: apipath+'sideeffectandmedicineCount?cid=CPMDT&patient='+pID,
		  success: function(sideeffectandmedicine) {
			//alert (sideeffectandmedicine);
			
			if (sideeffectandmedicine==''){
				alert ('Sorry Network not available');
			}
			$("#smCount").val(sideeffectandmedicine)
			url = "#Medication"; 
			$.mobile.navigate(url);
		  }
		});
}


function madicationNext(){
	if($("#medicineList").find("input[type=checkbox]:checked").length==0){
		//alert("please select One");
			$("#medError").text("Please Select One");
		}else{						
			url = "#sideeffect_data";      
			$.mobile.navigate(url);
			}
	}

function sideEffectUncheck(i) {	
	localStorage.chkName='check_S'+i.toString();
	//alert(localStorage.chkName);
	var unCheck=$("input[name='"+localStorage.chkName+"']:checked").val()?1:0;		
	if(unCheck==1){		
		var checkValue=$("input[name='"+localStorage.chkName+"']:checked").val();		
		//alert(checkValue);
		if(checkValue == 'NO SIDE EFFECT'){
			//$('#sideeffectList').empty()
			//$('#sideeffectList').append(localStorage.sideeffectList).trigger('create');	
			
			$("input[name='"+localStorage.chkName+"']:checked").attr('checked',true);
			
		}		
		 
	}
	
}


function sideEffect() {
		var sideeffectList;
		var yesno = $("input[name='yesno']:checked").val();
		
		//alert (yesno);
		
		if (yesno=='Yes'){
		    //alert ('nadira');
			url = "#sideeffect_data";      
			$.mobile.navigate(url);
				
		}else{
			//alert (payment);
			var url = "";
			var followUp=$("#reffollowup_select").val(); 
			
			/*if (followUp=="NOTDUE"){
				if (testResFlag==0){
					url = "#patient_test_data";	
				}else{
					if (payment==0){
						url = "#payment_submit";
					}else{
						url = "#symptContactInFamiy";				
					}				
				}
		
			}else{
					url = "#ref_followup";
				}*/
			url = "#symptContactInFamiy";     
			$.mobile.navigate(url);
			
		}

}





function seDataNext(){
	if($("#sideeffectList").find("input[type=checkbox]:checked").length==0){
		$("#seError").text("Please Select One");
	}else if(localStorage.chkName=='check_S15'){
		url = "#patient_test_data";      
		$.mobile.navigate(url);		
	}else{								
		url = "#sideeffect_action";      
		$.mobile.navigate(url);		
		}
	
	}

function sideEffectActionNext() {
		
	if($("#SideeffectActionDiv").find("input[type=checkbox]:checked").length==0){
		$("#seAError").text("Please Select One");
	}else{
		url = "#patient_test_data";      
		$.mobile.navigate(url);		
		}
		
/*		var url = "";
		var followUp=$("#reffollowup_select").val(); 
		
		if (followUp=="NOTDUE"){
			if (testResFlag==0){
				url = "#patient_test_data";	
			}else{
				if (payment==0){
					url = "#payment_submit";
				}else{
					url = "#symptContactInFamiy";
				}				
			}
					
		}else{
			url = "#ref_followup";			
		}
		
		$.mobile.navigate(url);*/

}

function refFollowupNext() {	
			var url = "";		
			if (testResFlag==0){
				url = "#patient_test_data";	
			}else{
				if (payment==0){
					url = "#payment_submit";
				}else{
					url = "#symptContactInFamiy";									
				}				
			}		
			
			$.mobile.navigate(url);
}

function testReportNext() {
			/*var url = "";
			if (payment==0){
					url = "#payment_submit";
				}else{
					url = "#symptContactInFamiy";
							
				}	*/
			url = "#symptContactInFamiy";     
			$.mobile.navigate(url);
}

function paymentNext() {
			
			url = "#symptContactInFamiy";
			
			$.mobile.navigate(url);
}

//====== Symp Y/N Next -function
function symptCInFamilyNext() {			
			var yesnoChild = $("input[name='yesnoChild']:checked").val();			
			if (yesnoChild=='Yes'){
				url = "#patientChild";
				$.mobile.navigate(url);
			}else{				
				url = "#final_submit";			
				$.mobile.navigate(url);
			}
		
}

function checkChild() {
			var url = "";
			
			var patientChild=$("input[name='pchild']:checked").val();
			var noOfPNearPatient = $("#noOfPNearPatient").val();
			var pchildTest = $("input[name='pchildTest']:checked").val();
			var iptTest=$("input[name='pchildRecIPT']:checked").val();
			var noOfChild = $("#NofChild").val();
			var iptTest=$("input[name='pchildRecIPT']:checked").val();
			
			
			/*$.ajax({
			  url:apipath+'attention?cid=CPMDT',
			  
			  success: function(result) {
				  attentionList=result.split("<fd>");
				  
				  var attentionCmbo='<ul data-role="listview"  data-inset="true" >';
				  
				  for (i=0;i<attentionList.length;i++){	
					  attentionCmbo+='<li>'+attentionList[i]+'</li>';
				  }	
				 
				 attentionCmbo+='</ul>';
				  
				$('#attention').empty();
				$('#attention').append(attentionCmbo).trigger('create');
			  		}
				})*/
			
			//alert(patientChild+','+noOfChild+','+iptTest);
			/*if (patientChild.toString()=='1'){
				if  (noOfChild.toString()=='0'){
					url = "#patientChild";					
					$("#childErrMsg").text("Invalid Number Of Child");					
				}else{
					url = "#final_submit";
				}
				
			}else{
				$("#NofChild").val('0');				
				$("#radio22").attr('checked','checked');
				url = "#final_submit";
			}*/
			
			url = "#final_submit";
			$.mobile.navigate(url);
}



function symptContactCheck() {
			var url = "";
			var refName = $("#rName").val();
			var refRelation = $("#relation_select").val();
			var refStatus = $("#status_select").val();
			
			var refName1 = $("#rName1").val();			
			var refRelation1 = $("#relation_select1").val();
			var refStatus1 = $("#status_select1").val();
						
			//alert(refRelation);
			validFlag=false;			
			if (refName.toString()=='' && refRelation.toString()==''){
				validFlag=true;
			}else if(refName.toString()!='' && refRelation.toString()!=''){
				validFlag=true;
			}
			
			if(validFlag==false){				
				$(".symptErrMsg").text("Invalid Name-1 data");
				url = "#sympt_contact";
			}else{
				if (refName1.toString()=='' && refRelation1.toString()==''){
					if (chieldFlag==0){
						url = "#patientChild";
					}else{
						url = "#final_submit";
					}
					
				}else if(refName1.toString()!='' && refRelation1.toString()!=''){
					if (chieldFlag==0){
						url = "#patientChild";
					}else{
						url = "#final_submit";
					}
					
				}else{
					$(".symptErrMsg").text("Invalid Name-2 data");
					url = "#sympt_contact";
				}
				
			}
			
			$.mobile.navigate(url);
}

// function symptContactNext() {
// 
// 			
			// if ($("input[name='pPayment']:checked").val()==0){
				// url = "#payment_submit";	
			// }else{
				// url = "#final_submit";
			// }		
// 			     
			// $(location).attr('href',url);
// }


// function symptContactBack() {
		// var url = "";
		// var followUp=$("#sideeffect").val(); 
// 		
		// if (followUp=="NOTDUE"){
			// var url = "#sympt_contact";
// 
		// }
		// else{
			// var url = "#ref_followup";
// 
		// }
// 		
		// $(location).attr('href',url);
// }



// function paymentCheck() {
		    // //alert (payment);
			// var url = ""; 
			// if (payment==0){ url = "#payment_submit";}
			// else{url = "#final_submit"; }
			// $(location).attr('href',url);
// 			
// }




function finalSubmitNew() {
		
		var now = new Date();
		var month=now.getUTCMonth()+1;
		
		var endDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		
		var pID=$("#pID").val();
		var pSideeffect=$("input[name='yesno']:checked").val();
		
		
		
		var pPayment=$("input[name='pPayment']:checked").val();
		//alert (pPayment);
		
		var yesnoChild = $("input[name='yesnoChild']:checked").val();
		
		var patientChild=$("input[name='pchild']:checked").val();
		
		var noOfPNearPatient = $("#noOfPNearPatient").val(); 
		var pchildTest = $("input[name='pchildTest']:checked").val();
			
		var NofChild=$("#NofChild").val();
		var pchildRecIPT=$("input[name='pchildRecIPT']:checked").val();
		
		//alert(NofChild+','+pchildRecIPT);
		
		
		var pConsultation =$("input[name='checkConsultation']:checked").val() ? 1 : 0;		
		var pSref =$("input[name='checkReferral']:checked").val() ? 1 : 0;		
		var pSEA3 =$("input[name='checkSEA3']:checked").val()? 1 : 0;		
		var pSEA4 =$("input[name='checkSEA4']:checked").val()? 1 : 0;
		
		
		
		
		var pMedicine='';
		
				
		var pAncimedicine=$("#anci_med1").val()+'fdfd'+$("#anci_med2").val()+'fdfd'+$("#anci_med3").val();
		var pSideeffectdata='';
		var pMedicineCount;
		var pSideeffectdataCount;
		
		var smCount=$("#smCount").val();
		var smArray = smCount.split(',');
		pSideeffectdataCount=smArray[0];
		pMedicineCount=smArray[1];
		var mobile=$("#mobile").val() ;//dot provider id
		
		var lat=$("#lat").val();
		var long=$("#long").val();
		
		if (lat=='' || lat==undefined ){
			lat=0
		}
		
		if (long=='' || long==undefined ){
			long=0
			}
	//------------------patient follow up
		
		var followUp=$("#reffollowup_select").val();
		
	//------------------patient follow up
		
		var reportTestlist=$("#test_result_select").val();
		var culturalTestlist=$("#culTestResult").val();
		
		//alert(culturalTestlist);		
	//-----------------------------sympt contact	
		var rowid=$("#rowid").val();
		var symptName=$("#rName").val();		
		var symptRelation=$("#relation_select").val();
		var symptStatus=$("#status_select").val();
		
		//alert(symptName+symptRelation+symptStatus);
		var rowid1=$("#rowid1").val();
		var symptName1=$("#rName1").val();
		var symptRelation1=$("#relation_select1").val();
		var symptStatus1=$("#status_select1").val();
		
		//alert(symptName1+symptRelation1+symptStatus1);
		
		
		
		//Sile effect list
		var checkSname='check_S';
			var addS=0
			
			for (s=0; s<pSideeffectdataCount; s++){
				addS=addS+1
				var checkS='#'+checkSname+addS;
				
				var checksValue=$(checkS).is(':checked') ? 1 : 0;				
				
				
				if (checksValue>0){
					
					if (s==0){
						pSideeffectdata=$("input[name='"+checkSname+addS+"']:checked").val();
										
					}
					else{
						pSideeffectdata=pSideeffectdata+'fdfd'+$("input[name='"+checkSname+addS+"']:checked").val();					
					}
				
				}
				
			}
			//alert (pSideeffectdata);
		
	
		
		
		//Medicime  list
		
		var checkMname='check_M';
		var addM=0
		for (m=0; m<pMedicineCount; m++){
			addM=addM+1
			var checkM='#'+checkMname+addM;
			var checkmValue=$(checkM).is(':checked') ? 1 : 0;
			
			if (checkmValue>0){
				if (m==0){
					pMedicine=$("input[name='"+checkMname+addM+"']:checked").val();
				}
				else{
					pMedicine=pMedicine+'fdfd'+$("input[name='"+checkMname+addM+"']:checked").val();
				}
			
			}
			
		}
		//alert(apipath+'submitDataNew?cid=CPMDT&pid='+pID+'&dpid='+mobile+'&pConsultation='+pConsultation+'&pSref='+pSref+'&sea3='+pSEA3+'&sea4='+pSEA4+'&pLatitude='+lat+'&pLongitude='+long+'&pMedicine='+encodeURIComponent(pMedicine)+'&pAncimedicine='+encodeURI(pAncimedicine)+'&pSideeffectdata='+encodeURIComponent(pSideeffectdata)+'&startDt='+startDt+'&endDt='+endDt+'&payment='+pPayment+'&followUp='+encodeURIComponent(followUp)+'&reportTestlist='+encodeURIComponent(reportTestlist)+'&rowid='+rowid+'&symptName='+encodeURI(symptName)+'&symptRelation='+symptRelation+'&symptStatus='+symptStatus+'&rowid1='+rowid1+'&symptName1='+encodeURIComponent(symptName1)+'&symptRelation1='+symptRelation1+'&symptStatus1='+symptStatus1+'&yesnoChild='+yesnoChild+'&NofChild='+NofChild+'&no_of_peple='+noOfPNearPatient+'&p_child_test='+pchildTest+'&pchildRecIPT='+pchildRecIPT+'&culturalTestlist='+culturalTestlist+'&patientChild='+patientChild)
		
		$.ajax({	
				  url: apipath+'submitDataNew?cid=CPMDT&pid='+pID+'&dpid='+localStorage.dpid+'&pConsultation='+pConsultation+'&pSref='+pSref+'&sea3='+pSEA3+'&sea4='+pSEA4+'&pLatitude='+lat+'&pLongitude='+long+'&pMedicine='+encodeURIComponent(pMedicine)+'&pAncimedicine='+encodeURI(pAncimedicine)+'&pSideeffectdata='+encodeURIComponent(pSideeffectdata)+'&startDt='+startDt+'&endDt='+endDt+'&payment='+pPayment+'&followUp='+encodeURIComponent(followUp)+'&reportTestlist='+encodeURIComponent(reportTestlist)+'&rowid='+rowid+'&symptName='+encodeURI(symptName)+'&symptRelation='+symptRelation+'&symptStatus='+symptStatus+'&rowid1='+rowid1+'&symptName1='+encodeURIComponent(symptName1)+'&symptRelation1='+symptRelation1+'&symptStatus1='+symptStatus1+'&yesnoChild='+yesnoChild+'&NofChild='+NofChild+'&no_of_peple='+noOfPNearPatient+'&p_child_test='+pchildTest+'&pchildRecIPT='+pchildRecIPT+'&culturalTestlist='+culturalTestlist+'&patientChild='+patientChild,
				  success: function(result) {
					
					$("#pID").val("");
					$("input[name='yesno']:checked").val("");
					$("input[name='pPayment']:checked").val("");
					$("input[name='yesnoChild']:checked").val("");
					$("input[name='pchild']:checked").val("");
					$("#noOfPNearPatient").val(""); 
					$("input[name='pchildTest']:checked").val("");
					$("#NofChild").val("");
					$("input[name='pchildRecIPT']:checked").val("");
					$("input[name='checkConsultation']:checked").val("");		
					$("input[name='checkReferral']:checked").val("");		
					$("input[name='checkSEA3']:checked").val("");		
					$("input[name='checkSEA4']:checked").val("");
					
					$("#lat").val("");
					$("#long").val("");
					
					$("#reffollowup_select").val("");
		
				//------------------patient follow up
					
					$("#test_result_select").val("");
					$("#culTestResult").val("");
					
					//alert(culturalTestlist);		
				//-----------------------------sympt contact	
					$("#rowid").val("");
					$("#rName").val("");		
					$("#relation_select").val("");
					$("#status_select").val();
					
					//alert(symptName+symptRelation+symptStatus);
					$("#rowid1").val("");
					$("#rName1").val("");
					$("#relation_select1").val("");
					$("#status_select1").val("");
					
					url = "#submitreport"; 
					$(location).attr('href',url);
		
				  },
				  error: function(result) {
					 $("#err").text(errror_str);
					 url = "#final_submit"; 
					$.mobile.navigate(url);
				  }
				  
				});
		
	
}

function dotAnotherPt(){
	$("#errror").empty();
	 $("#perror").empty();
	 $("#err").empty();
	 $("#seError").empty();
	 $("#medError").empty();
	
	url = "#page1"; 
	$(location).attr('href',url);
	
	}
//function refreshPage(userId,pass){
function refreshPage(){	
	// alert(window.location.href);
	$.mobile.changePage(
	window.location.href="http://127.0.0.1:8000/cpmdt/static/cpmdt_mobile/index.html",
	{
	allowSamePageTransition:true,
	transition:'none',
	showLoadMsg:false,
	reloadPage:true
	}
	);


}


function exit() {
	localStorage.dpid="";
	$("#mobile").val("");
	$("#password").val("");
		
	url = "#pagelogin"; 
	$(location).attr('href',url);
//navigator.app.exitApp();
}



