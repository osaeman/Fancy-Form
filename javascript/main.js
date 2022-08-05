// Making Questions Object
let questions = [
  { question: "what is your first name?" },
  { question: "what is your last name?" },
  { question: "what is your email", pattern: /\S+@\S+\.\S+/ },
  { question: "what is the password", type: "password" },
];

// Fetching Elements
const form_box = document.getElementById("form-box");
const input_label = document.querySelector("#input-label");
const input_field = document.querySelector("#input-field");
const input_group = document.querySelector("#input-group");
const next_btn = document.querySelector("#next-btn");
const prev_btn = document.querySelector("#prev-btn");
const input_progress = document.querySelector("#input-progress");
const progress_bar = document.querySelector("#progress-bar");

// Declaring Variables
let position = 0;
const shake_time = 100;
const switch_time = 200;

// Event Listners
document.addEventListener("DOMContentLoaded", getfunction);

next_btn.addEventListener("click", validate);

input_field.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) validate();
});

// Functions
// Function For displaying Question From Questions Object
function getfunction() {
  input_label.innerText = questions[position].question;
  input_field.type = questions[position].type || "text";

  questions[position].answer = "osmaahdjkkjjk";
  input_field.value = "";

  input_field.focus();
  progress_bar.style.width = (position * 100) / questions.length + "%";

  prev_btn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showquestion();
}

// Function For Setting Styling Properties Of Questions
function showquestion() {
  input_group.style.opacity = 1;
  input_progress.style.transition = "";
  input_progress.style.width = "100%";
}

// Function For Hiding Previous Question Content
function hidequestion() {
  input_group.style.opacity = 0;
  input_label.style.marginLeft = 0;
  input_progress.style.width = 0;
  input_progress.style.transition = "none";
}

// Function For Checking Validation Based On Email pattern And Then Directing The Flow
function validate() {
  if (!input_field.value.match(questions[position].pattern || /.+/)) {
    inputfail();
  } else {
    inputsuccess();
  }
}

// Function If The Input Value Is Valid
function inputsuccess() {
  form_box.className = " ";
  setTimeout(motion, shake_time * 2, 0, 20);
  setTimeout(motion, shake_time * 3, 0, 0);
  questions[position].answer = input_field.value;
  position++;
  if (questions[position]) {
    hidequestion();
    getfunction();
  } else {
    hidequestion();
    form_box.className = "close";
    console.log(questions);
    formcomplete();
  }
}

// Function If The Input Value Is NotValid
function inputfail() {
  form_box.classList.add("error");
  for (let i = 0; i < 6; i++) {
    setTimeout(motion, shake_time * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(motion, shake_time * 6, 0, 0);
    input_field.focus();
  }
}

// Function For The Translation Transformation
function motion(x, y) {
  form_box.style.transform = `translate(${x}px, ${y}px)`;
}

// Function To Be Executed When All Questions Are Completed
function formcomplete() {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(
      `thanks ${questions[0].answer} for your response. You are are registered and will get an email shortly`
    )
  );
  setTimeout(() => {
    form_box.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
}

// What i learn new?
// 1. regular expressions  (in array)
// 2. e.keyCode
// 3. if any property is being applied in css styling and then that property is set to none using
// javascript then that property can be restored again if we again set that property to "" using javascript
// 4. classlist vs classname if class is assigned through classname than the previous classes will be
// removed if any and the class attriute is set to the classes that are being passed in the
// className expression
// 5. input_field.type = questions[position].type || "text";
// means  that input type will be one if key type in questions object is there
//(then value stored in type will be assigned to input type)  otherwise the input type will be text
