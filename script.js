var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();

let commands = [
    {
        "rektor": ["rektor", "rejser", "actor"]
    },
    {
        "studieadmin": ["studieadministration", "studieadministrationen"]
    },
    {
        "vrlab": ["vr-lab", "vr lab", "vr lap", "vi er lab"]
    },
    {
        "innolab": ["innolab", "inno lab"]
    },
    {
        "f11t18": ["11", "12", "13", "14", "15", "16", "17", "18"]
    },
    {
        "f21t25": ["21", "22", "23", "24", "25"]
    },
    {
        "f31t32": ["31", "32"]
    },
    {
        "f43t45": ["43", "44", "45"]
    },
    {
        "f46t50": ["46", "47", "48", "49", "50"]
    },
    {
        "f51t54": ["51", "52", "53", "54"]
    },
    {
        "f60t63": ["60", "61", "62", "63"]
    },
    {
        "proces": ["proces", "process", "prosa", "protest"]
    },
    {
        "teori": ["teori"]
    },
    {
        "biokemi": ["biokemi"]
    },
    {
        "fysik": ["fysik"]
    },
    {
        "printer": ["print", "printe", "printer", "printeren", "printere", "printerne"]
    },
    {
        "bibliotek": ["bibliotek", "biblioteket"]
    },
    {
        "teknologi": ["teknologi"]
    },
    {
        "byg": ["byg", "Byg", "by"]
    },
    {
        "musik": ["musik"]
    },
    {
        "kantine": ["syd", "kantine", "sydsal", "syd sal"]
    },
    {
        "nordsal": ["nord", "nordsal", "nord sal"]
    }
];

recognition.lang = 'da';
recognition.continuous = false;
recognition.interimResults = false;

function hideCards() {
    $(".command-card").hide();
}

$(document).ready(function () {

    var timeLeft;
    var elem = document.getElementById('some_div');
    var timerId = setInterval(countdown, 1000);

    hideCards();

    document.getElementById("recbutton").onclick = function () {recognition.start()};

    recognition.onaudiostart = function () {
        document.getElementById("recbutton").innerHTML = "Lytter...";
    }
    recognition.onaudioend = function () {
        document.getElementById("recbutton").innerHTML = "Spørg om vej"
    }

    function countdown() {
        if (timeLeft == 0) {
            // clearTimeout(timerId);
            hideCards();
            elem.innerHTML = '';
        } else if (timeLeft > 0) {
            elem.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
            console.log("nedtælling begyndt: " + timeLeft);
        }
    }

    recognition.onresult = function (event) {
        console.log("Transcript: " + event.results[0][0].transcript);
        for (e of commands) {
            for (k of Object.values(e)[0]) {
                if (event.results[0][0].transcript.toLowerCase().includes(k)) {
                    console.log("Keyword: " + Object.keys(e));
                    divName = Object.keys(e);
                    $("#content").html($("#" + divName).clone().show());
                    timeLeft = 30;
                    console.log("begynder nedtælling: " + timeLeft);
                    countdown();
                } else {
                    elem.innerHTML = "Jeg kunne desværre ikke forstå, hvad du sagde. Prøv igen!";
                }
            }
        }
    }
});
