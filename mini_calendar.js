k_l = [];
k_l["MONTHS"] = ["Janaury","February","March","April","May","June","July","August","September","October","November","December"];
k_l["error_1"] = "target is not set";

k_currentDateObject = {};
k_currentDateObject.dateObject = new Date();

k_currentDateObject.day = k_currentDateObject.dateObject.getDate();
k_currentDateObject.month = k_currentDateObject.dateObject.getMonth() + 1;
k_currentDateObject.year = k_currentDateObject.dateObject.getFullYear();

mcgetElem = function(id){ return document.getElementById(id); };

McMonthPick = function (conf){
	this.kConf={};
	this.KCurDay=k_currentDateObject;
	this.setConf(conf);
	this.makeCal();
	this.repopulateMonthBox();
};

McMonthPick.prototype.setC = function(obj, aClassName){
	if (this.isie && this.iever > 7){
		obj.setAttribute("class", aClassName);
	} else {
		obj.className = aClassName;
	}
};


McMonthPick.prototype.setConf = function(conf){
	if (document.all){
		this.isie = true;
		this.iever = McMonthPick.getInternetExplorerVersion();
	} else {
		this.isie = false;
	}

	this.kConf.target = (conf.target != null) ? conf.target: null;
	this.kConf.yearsRange = (conf.yearsRange != null) ? conf.yearsRange: [1971, 2100];
	this.currentDay = k_currentDateObject.day;
	this.currentMonth = k_currentDateObject.month;
	this.currentYear = k_currentDateObject.year;
	this.monthsTextualRepresentation=k_l["MONTHS"];
};

McMonthPick.getInternetExplorerVersion=function(){
	var rv = -1, ua, re;
	if (navigator.appName == 'Microsoft Internet Explorer'){
		ua = navigator.userAgent;
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null){
		  rv = parseFloat( RegExp.$1 );
		}
		return rv;
	}
};

McMonthPick.prototype.makeCal = function(){
	var d=document, formonbt, backmonbt, monthtitle, monthpickbox, mc;
	
	monthpickbox= d.createElement("div");
	formonbt=d.createElement("div");
	backmonbt=d.createElement("div");
	monthtitle=d.createElement("div");

	this.setC(formonbt, "forwardmonthbutton");
	this.setC(backmonbt, "backwardmonthbutton");
	this.setC(monthtitle, "monthtitle");

	this.monthpickbox = monthpickbox;
	this.monthtitle = monthtitle;

	this.monthpickbox.appendChild(formonbt);
	this.monthpickbox.appendChild(backmonbt);
	this.monthpickbox.appendChild(monthtitle);

	this.setC(monthpickbox, "monthpickbox");

	if(this.kConf.target != null)
		mcgetElem(this.kConf.target).appendChild(monthpickbox);
	else
		alert(k_l["error_1"]);
	
	mc=this;

	formonbt.onmouseup = function(){
		mc.movemonthforward();
	};
	backmonbt.onmouseup = function(){
		mc.movemonthbackward();
	};
};

McMonthPick.prototype.moveyearforward = function(){
	var desiredYear = this.currentYear + 1;
	if (desiredYear < parseInt(this.kConf.yearsRange[1])){
		this.currentYear++;
		this.repopulateMonthBox();
		return true;
	} else {
		return false;
	}
};

McMonthPick.prototype.moveyearbackward = function(){
	var desiredYear = this.currentYear - 1;
	
	if (desiredYear > parseInt(this.kConf.yearsRange[0])){
		this.currentYear--;
		this.repopulateMonthBox();
		return true;
	} else {
		return false;
	}
};

McMonthPick.prototype.movemonthbackward = function () {
	if (this.currentMonth > 1){
		this.currentMonth--;
	} else {
		if (this.moveyearbackward()){
			this.currentMonth = 12;
		} else {
			this.currentMonth = 1;
		}
	}
	this.repopulateMonthBox();
};

McMonthPick.prototype.movemonthforward = function () {
	if (this.currentMonth < 12){
		this.currentMonth++;
	} else {
		if (this.moveyearforward()){
			this.currentMonth = 1;
		} else {
			this.currentMonth = 12;
		}
	}
	
	this.repopulateMonthBox();
};


McMonthPick.prototype.repopulateMonthBox = function() {
	var d = document,cmpMonth = this.currentMonth-1;
	oDay = new Date(this.currentYear, cmpMonth, 1,1,0,0);
	this.setControlBarText(this.monthsTextualRepresentation[cmpMonth] + ", " + this.currentYear);
}

McMonthPick.prototype.setControlBarText = function(aText){
	var aTextNode = document.createTextNode(aText);
	if(this.monthtitle.firstChild)
		this.monthtitle.removeChild(this.monthtitle.firstChild);
	this.monthtitle.appendChild(aTextNode);
};


