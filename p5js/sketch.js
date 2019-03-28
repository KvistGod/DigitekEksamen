var myRec = new p5.SpeechRec('da'); // nyt speech rec objekt, som genkender danske ord

let commands = [{
		"rektor": ["rektor", "regtor", "actor"]
	},
	{
		"kantine": ["kantine", "canteen"]
	},
];

let resultDiv;

function setup() {
	// default canvas setup
	noCanvas();
	// viser de(t) genkendte ord
	myRec.continuous = true;
	myRec.interimResults = true;
	myRec.onResult = showResult;
	myRec.onEnd = restartRec;
	myRec.start();
	$(".command-card").hide();
}

function draw() {}

// viser de(t) genkendte ord
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