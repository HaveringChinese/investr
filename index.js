var form = document.querySelector("form");
form.addEventListener("submit", function(event){
  event.preventDefault();
})

function crunchSomeNumbers(){
  
  var initial = document.getElementById("initial").value;
  var additional = document.getElementById("additional").value;
  var age = Number(document.getElementById("age").value);
  
  document.getElementById("initial-investment").innerHTML = initial;
  document.getElementById("additional-investment").innerHTML = additional;
  document.getElementById("inputted-age").innerHTML = age;

  var activeCompoundWealthEachYear = [];
  var passiveCompoundWealthEachYear = [];

function compoundContinuous(start, add, time, rate){
  for (let i = 0; i < time; i++) {
    start = start * (1 + rate);
    start += (add * 12);
  }
  if (rate === 0.13){
  activeCompoundWealthEachYear.push(parseInt(start));
  } else if (rate === 0.07) {
    passiveCompoundWealthEachYear.push(parseInt(start));
  } else {
    console.log("Invalid rate given.");
    return null;
  }
  return parseInt(start);
}

function howMuchOlder(years){
  return age + years;
};

function wealthAtEachAge(rate){
  var ages = [10, 20, 30, 40];
  var results = [];
  for (let i = 0; i < ages.length; i++){
    results.push("In " + ages[i] + " years, at " + howMuchOlder(ages[i]) + ", you will have " + compoundContinuous(initial, additional, ages[i], rate) + " dollars.");
  }
  return results.join("<br>");
};

function postResults(type){
  if (type==="active"){
    document.getElementById("active-compounded").innerHTML = wealthAtEachAge(0.13);
  } else if (type==="passive") {
    document.getElementById("passive-compounded").innerHTML = wealthAtEachAge(0.07);
  } else {
    return null;
  }
};

postResults("active");
postResults("passive");

console.log(activeCompoundWealthEachYear, passiveCompoundWealthEachYear);

};