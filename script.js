// Kompatibilitet med Chrome-baserede browsere
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// Initialiserer objekt
var recognition = new SpeechRecognition();

// Array med alle keywords
let commands = [
    {
        "rektor": ["rektor", "rejser", "actor"]
    },
    {
        "studieadmin": ["studieadministration", "studieadministrationen"]
    },
    {
        "vrlab": ["vr-lab", "vr lab", "vr lap", "vi er lab", "vr"]
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

var eksempler = ["Fysiklokalet", "Biblioteket", "Innolab", "VR lab", "Proces"]

// Dansk sprog
recognition.lang = 'da';

// Skjul info-kort
function hideCards() {
    $(".command-card").hide();
    $(".card-action").html("");
}

// Skjul rutevejledning
function hideMaps() {
    $(".command-map").hide();
}

$(document).ready(function () {


    // Skjul al information
    hideCards();
    hideMaps();

    document.getElementById("initrec").onclick = function () {
        recognition.start();
    };


    // Slå højreklik-menu fra
    document.oncontextmenu = function () {
        return false;
    }

    // Nedtælling til at kortene forsvinder
    var timeLeft;
    var example = 0;
    var elem = document.getElementById('maps');
    var timerId = setInterval(countdown, 1000);
    var timerEx = setInterval(ex, 5000);

    function ex() {
        $("#eksempel").html(eksempler[example])
        example++;
        if (example > 4) {
            example = 0
        }
    }

    function countdown() {
        if (timeLeft == 0) {
            hideCards();
            hideMaps();
            $("#initrec").show();
            $("#introtekst").show();
            // elem.innerHTML = '';
        } else if (timeLeft > 0) {
            // elem.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
            console.log("nedtælling begyndt: " + timeLeft);
        }
    }

    // Ved færdig sætning
    recognition.onresult = function (event) {
        console.log("Transcript: " + event.results[0][0].transcript);
        // For keyword i array
        for (e of commands) {
            // For keyword i transcript
            for (k of Object.values(e)[0]) {
                // Hvis et ord i transcriptet matcher et keyword
                if (event.results[0][0].transcript.toLowerCase().includes(k)) {
                    console.log("Keyword: " + Object.keys(e));
                    // Finder div med samme navn og viser den
                    divName = Object.keys(e);
                    $("#cards").html($("#" + divName).clone().show());
                    $("#cards #" + divName + " .card-action").html("<span id='recbutton' class='dot waves-effect blue-grey darken-3 waves-light btn-large'><img class='micimage' src='Billeder/Startskaerm/MicrophoneWhite.png'></span>");
                    document.getElementById("recbutton").onclick = function () {
                        recognition.start();
                    };
                    //$("#maps").html($("#kort-" + divName).clone().show());
                    // Starter nedtælling fra 30 sekunder
                    timeLeft = 30;
                    console.log("begynder nedtælling: " + timeLeft);
                    countdown();
                    $("#initrec").hide();
                    $("#introtekst").hide();
                    // Hvis der ikke findes et keyword i transcriptet
                } else if (event.results[0][0].transcript.toLowerCase().includes(k) == false) {
                    //   elem.innerHTML = "Jeg kunne desværre ikke forstå, hvad du sagde. Prøv igen!";
                }
            }
        }
    }
});
