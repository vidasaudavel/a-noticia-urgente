// <![CDATA[
//----------SCRIPT HOT PARAMETERS--------------
//Esse script é parte complementar do Plugin Hot Links Plus
//Visite nosso site: www.hotlinksplus.com
if (typeof hotlinks_getCookie !== "function") { 

	function hotlinks_getCookie(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
	 
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return decodeURI(y);
				
			}
		 }
	}
	
}


if (typeof hotlinks_get_query !== "function") { 
 
	function hotlinks_get_query(){

		var url = location.search;
		var qs = url.substring(url.indexOf('?') + 1).split('&');
		
		for(var i = 0, result = {}; i < qs.length; i++){
			qs[i] = qs[i].split('=');
			result[qs[i][0]] = 'undefined' !== typeof qs[i][1]?decodeURIComponent(qs[i][1]):'';
		}
		return result;
	}

}
 
if (typeof hotlinks_ArrayToURL !== "function") { 
 
	function hotlinks_ArrayToURL(array) {
						
	  var pairs = [];
	  for (var key in array)
		//if (array.hasOwnProperty(key))
		  pairs.push(key + '=' + array[key]);
	  return pairs.join('&');
	}
}


if (typeof hotlinks_get_button_query !== "function") { 

	function hotlinks_get_button_query(btn_query){
		
		var url = btn_query;
		var qs = url.substring(url.indexOf('?') + 1);
	
			qs = decodeURIComponent(qs);
			qs = qs.toString().split('&');
	
		
		for(var i = 0, result = {}; i < qs.length; i++){
			
			qs[i] = qs[i].split('=');
			result[qs[i][0]] = 'undefined' !== typeof qs[i][1]?decodeURIComponent(qs[i][1]):'';
		}
				
		return result;
		
		
	} 

}

if (typeof hot_parameters !== "function") { 
	function hot_parameters(){

		if('undefined' != typeof hotlink_btn_params_control_job_done) return;
		
		hotlink_btn_params_control_job_done = true;
		
		if(location.search.toString().indexOf('?') ===-1) return;
		
		var hotlinks_url_array = hotlinks_get_query();
		
		
		
		var hotlinks_src = 'undefined' != typeof hotlinks_url_array['src']?hotlinks_url_array['src']:'';
		var hotlinks_utm_source = 'undefined' != typeof hotlinks_url_array['utm_source']?hotlinks_url_array['utm_source']:'';
		var hotlinks_hotid = 'undefined' != typeof hotlinks_url_array['hotid']?hotlinks_url_array['hotid']:'';
		
		var hotlinks_cookie_name = 'hotlinks_' + hotlinks_hotid;
		var hotlinks_cookie_data = '';
		
		var hotlinks_var_name = 'src';
		
		if(hotlinks_src.length ==0 && hotlinks_utm_source.length !=0){
			hotlinks_var_name = 'utm_source';
			hotlinks_src = hotlinks_utm_source; 
		}
		
		if(hotlinks_hotid.length !=0){
			
			hotlinks_cookie_data = hotlinks_getCookie(hotlinks_cookie_name);
			hotlinks_cookie_data = 'undefined' != typeof hotlinks_cookie_data?hotlinks_cookie_data:''; 
			
			if(hotlinks_cookie_data.length != 0) hotlinks_cookie_data = '|'+hotlinks_cookie_data;
		}
		
		if(hotlinks_src.length !=0) hotlinks_url_array[hotlinks_var_name] = hotlinks_src + hotlinks_cookie_data;
		
		//Casa Ancoras -------------------------------------
		hotlinks_ancs = document.getElementsByTagName('a');
							
		//if(hotlinks_src.length!=0){//Só muda algo se existe parametro src ou utm_source
		
		for (var idx= 0; idx < hotlinks_ancs.length; idx++){
			 
			if(hotlinks_ancs[idx].href.indexOf('hotlinks=plus') !=-1 ){
					
				hotlinks_url_array_current =  Object.create(hotlinks_url_array);//Pega valor do url para remontar query de outros botões
									
				var btn_query_obj = hotlinks_get_button_query(hotlinks_ancs[idx].href);
	
	
				for(btn_var in btn_query_obj){
					
					if(typeof hotlinks_url_array_current[btn_var] != 'undefined'){
						
						hotlinks_url_array_current[btn_var] = hotlinks_url_array_current[btn_var] +'|'+ btn_query_obj[btn_var];
					
					}else{
													 
						hotlinks_url_array_current[btn_var] = btn_query_obj[btn_var];
					
					}
				}
				
				
				  var hotlinks_query_final = hotlinks_ArrayToURL(hotlinks_url_array_current);
				 
				  var clean_btn_url = hotlinks_ancs[idx].href.substring(0,hotlinks_ancs[idx].href.indexOf('?')+1);
				  hotlinks_ancs[idx].href = clean_btn_url+hotlinks_query_final;
				  
	
			}
	
		}//enf of for
						
		//--------------------------------------------------------
		//}
		
		
		//Casa Inputs --------------------------------------------
		
		hotlinks_inputs = document.getElementsByTagName('input');
		
		for (var idx= 0; idx < hotlinks_inputs.length; idx++){
			 
			 
			if(hotlinks_inputs[idx].value.indexOf('hotlinks=plus') !=-1 && hotlinks_inputs[idx].type=='hidden' ){
					
				hotlinks_url_array_current =  Object.create(hotlinks_url_array);//Pega valor do url para remontar query de outros botões
									
				var btn_query_obj = hotlinks_get_button_query(hotlinks_inputs[idx].value);
	
	
				for(btn_var in btn_query_obj){
					
					if(typeof hotlinks_url_array_current[btn_var] != 'undefined'){
						
						hotlinks_url_array_current[btn_var] = hotlinks_url_array_current[btn_var] +'|'+ btn_query_obj[btn_var];
					
					}else{
													 
						hotlinks_url_array_current[btn_var] = btn_query_obj[btn_var];
					
					}
				}
				
				
				  var hotlinks_query_final = hotlinks_ArrayToURL(hotlinks_url_array_current);
				 
				  var clean_btn_url = hotlinks_inputs[idx].value.substring(0,hotlinks_inputs[idx].value.indexOf('?')+1);
					 
				  hotlinks_inputs[idx].value = clean_btn_url+hotlinks_query_final;
				  
	
			}
	
		}
						
		//------------------------------------------------------	
			
	}
}

window.onload = function(){
	
	hot_parameters();
 
}

// ]]> 