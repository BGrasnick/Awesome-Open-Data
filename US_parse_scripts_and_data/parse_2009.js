// for http://oas.samhsa.gov/2k9State/WebOnlyTables/stateTabs.htm
var data = [];
var year = 2009;
for (var j = 13; j <= 113; j+=2) {	
	var state = {};
	var state_str = "/html/body/div["+j+"]/h3";
	var state_name = $x(state_str)[0].innerHTML;
	state_name = state_name.toLowerCase();
	state_name = state_name[0].toUpperCase() + state_name.substring(1);
	state.id=state_name;
	state.cannabis=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div["+j+"]/table/thead/tr/th["+(i+3)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div["+j+"]/table/tbody/tr[3]/td["+(i+2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.cannabis.push(ob);    
	}
	state.alcohol=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div["+j+"]/table/thead/tr/th["+(i+3)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div["+j+"]/table/tbody/tr[11]/td["+(i+2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.alcohol.push(ob);   
	}
	state.cigarette=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div["+j+"]/table/thead/tr/th["+(i+3)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div["+j+"]/table/tbody/tr[18]/td["+(i+2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.cigarette.push(ob);
	}
	data.push(state);
}

JSON.stringify(data);