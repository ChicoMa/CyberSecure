var questions = [{ 
    no: 1, 
    ques: "Which could be an example of 'Spear Phishing'?",
    ans: "A Business Email Compromise (BEC) where a phishing email is directly sent to a targeted CEO to enable attacker to hijack their account.",
    opt: [ "A generic phishing email sent to a list of random contacts with the hope of one passing through.",
       "A phishing email directing those who click on the attached link to a website on spears.",
        "A long javelin-like tool that is propelled into sea to catch fish.",
        "A Business Email Compromise (BEC) where a phishing email is directly sent to a targeted CEO to enable attacker to hijack their account."
]},
      {
        no: 2,
        ques: "Phishing is a type of?",
        ans: "Social Engineering Attack",
        opt: ["Social Engineering Attack","Computer virus", "Cryptocurrency"]
      },
      {
        no: 3,
        ques: "Which email feature does not indicate a potantial Phishing email?",
        ans: "'Suspiciosly' perfect grammar",
        opt: ["An email from Google ending in @google.com","Suspiciosly' perfect grammar",
         "An urgent request for personal information", "An attached link that does not fit its defined purpose" ]
      },
        { 
        no: 4,
        ques:"The largest cummulative amount money stolen from a Phishing attack is?",
        ans:"$100 Million",
        opt: ["$2.9 Billion","$453 Million","$100 Million", "$32 Million"]
        },
        {no: 5,
        ques:"Phishing only occurs via email",
        ans:"False",
        opt: ["True", "False"]
        },
        {no: 6,
        ques:"There has been a increase in the number of phishing emails recieved over the years",
        ans:"True",
        opt: ["True","False"]
        },
        {
            no: 7,
            ques:"Phishing attacks are most prevelant in which sectors?<",
            ans:"All of the above",
            opt: ["Financial","Healthcare Services","Retail","All of the above"]
        },
        {
            no: 8,
            ques:"All phishing emails are clearly detectable?",
            ans:"False",
            opt: ["True","Flase"]
        },
        {no: 9,
            ques:"Why is it important to teach topic such as Phishing?",
            ans:"All of the above.",
            opt: ["Equip people with knowledge to detect phishing email.","Prevent loss of sensitive information.",
            "Prevent loss of money and assets.","All of the above." ]
        }
]
const info_box = document.querySelector(".rules-box");
const cont_btn = document.querySelector(".btn-cont");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
const time_line = document.querySelector("header .time-line");
const timeText = document.querySelector(".timer .time-left-txt");
const timeCount = document.querySelector(".timer .time-sec");
const next_btn = document.querySelector(".next-btn");
const bottom_ques_counter = document.querySelector(".total-que");
const que_text = document.querySelector(".que-text");

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

$(document).ready(function () {
    $(cont_btn).click(function () {
        $(info_box).remove();
        $(quiz_box).show();
        showQuestions(0);
        queCounter(1);
        startTimer(15);
        startTimerLine(0);
        console.log(que_numb);
    });
});
$(next_btn).click(function () {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
});

function showQuestions(index) {
    option_list.innerHTML = null;
    que_text.innerHTML = '<span>' + questions[index].no + ". " + questions[index].ques + '</span>';
    for (var i = 0; i < questions[index].opt.length; i++) {
        option_list.innerHTML += '<div class="option"><span>' + questions[index].opt[i] + '</span></div>'
    }
    const option = option_list.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="bi bi-check-circle"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="bi bi-x-circle"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].ans;
    const allOptions = option_list.children.length;

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    // $(info_box).remove();
    // $(quiz_box).remove();
    info_box.classList.remove("activeInfo");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score-text");
    if (userScore > 3) {
        scoreText.innerHTML = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    }
    else if (userScore > 1) {
        scoreText.innerHTML = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    }
    else {
        scoreText.innerHTML = '<span>You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].ans;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    bottom_ques_counter.innerHTML = '<span><p>' + index + ' of ' + questions.length + ' questions</span>';
}
