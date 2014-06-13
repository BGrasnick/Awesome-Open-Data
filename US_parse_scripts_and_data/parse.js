
var data = [];
var year = 2006;
for (var j = 2; j < 53; j++) {	
	var state = {};
	var state_str = "/html/body/div[2]/table/tbody/tr["+j+"]/td[1]";
	var state_name = $x(state_str)[0].innerHTML;
	state.id=state_name;
	state.cannabis=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div[2]/table/thead/tr[2]/th["+(i+1)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div[2]/table/tbody/tr["+j+"]/td["+(4+i*2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group = age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.cannabis.push(ob);    
	}
	state.alcohol=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div[9]/table/thead/tr[2]/th["+(i+1)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div[9]/table/tbody/tr["+j+"]/td["+(4+i*2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group = age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.alcohol.push(ob);   
	}
	state.cigarette=[];
	for (var i = 0; i < 3; i++) {
		var age_str = "/html/body/div[15]/table/thead/tr[2]/th["+(i+1)+"]";
	    var age_group = $x(age_str)[0].innerHTML;
		var value_str = "/html/body/div[15]/table/tbody/tr["+j+"]/td["+(4+i*2)+"]";
		var value = parseFloat($x(value_str)[0].innerHTML);
		var ob = {};
		ob.year = year;
		if (age_group.indexOf(" or Older") != -1) {
			age_group = age_group.substring(0,age_group.indexOf(" or Older"))+"+";
		}
		age_group = age_group.replace("–","-");
		ob.population = age_group;
		ob.prevalence = value;
		ob.source = "samhsa"
		state.cigarette.push(ob);
	}
	data.push(state);
}

JSON.stringify(data);