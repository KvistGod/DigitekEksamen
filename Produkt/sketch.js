var myRec = new p5.SpeechRec('da'); // nyt speech rec objekt, som genkender danske ord

let commands = [{
		"rektor" : ["rektor", "rejser", "actor"]
	},
	{
		"studieadmin" : ["studieadministration", "studieadministrationen"]
	},
	{
		"vrlab" : ["vr-lab", "vr lab", "vr lap", "vi er lab"]
	},
	{
		"innolab" : ["innolab", "inno lab"]
	},
	{
		"f11t18" : ["11", "12", "13", "14", "15", "16", "17", "18"]
	},
	{
		"f21t25" : ["21", "22", "23", "24", "25"]
	},
	{
		"f31t32" : ["31", "32"]
	},
	{
		"f43t45" : ["43", "44", "45"]
	},
	{
		"f46t50" : ["46", "47", "48", "49", "50"]
	},
	{
		"f51t54" : ["51", "52", "53", "54"]
	},
	{
		"f60t63" : ["60", "61", "62", "63"]
	},
	{
		"proces" : ["proces", "process", "prosa", "protest"]
	},
	{
		"teori" : ["teori"]
	},
	{
		"biokemi" : ["biokemi"]
	},
	{
		"fysik" : ["fysik"]
	},
	{
		"printer" : ["print", "printe", "printer", "printeren", "printere", "printerne"]
	},
	{
		"bibliotek" : ["bibliotek", "biblioteket"]
	},
	{
		"teknologi" : ["teknologi"]
	},
	{
		"byg" : ["byg", "Byg", "by"]
	},
	{
		"musik" : ["musik"]
	},
	{
		"kantine" : ["kantine", "sydsal", "syd sal"]
	},
	{
		"nordsal" : ["nordsal", "nord sal"]
	}
];

let resultDiv;

function setup() {
	noCanvas();
	myRec.continuous = true;
	myRec.interimResults = true;
	myRec.onResult = showResult;
	myRec.onEnd = restartRec;
	myRec.start();
	$(".command-card").hide();
}

function draw() {}

function showResult() {
	if (myRec.resultValue == true) {
		$("#speech").html(myRec.resultString);
		for (e of commands) {
			for (k of Object.values(e)[0]) {
				if (myRec.resultString.includes(k)) {
					console.log("Fandt ord: " + Object.keys(e));
					divName = Object.keys(e);
					$("#content").html($("#" + divName).clone().show());
				}
			}
		}
	}
}

function restartRec() {
	myRec.start();
}
