var form = document.querySelector("form");
form.addEventListener("submit", function(event){
  event.preventDefault();
  console.log(event.target.value);
})

function crunchSomeNumbers(){
  
  var initial = document.getElementById("initial").value;
  var additional = document.getElementById("additional").value;
  var age = document.getElementById("age").value;
  
  console.log(initial, additional, age);

  document.getElementById("initial-investment").innerHTML = initial;
  document.getElementById("additional-investment").innerHTML = additional;
  document.getElementById("inputted-age").innerHTML = age;

var wealthEachYear = [];

function compoundContinuous(start, add, time){
  for (let i = 0; i < time; i++) {
    start = start * (1 + 0.13);
    console.log(start)
    start += (add * 12);
    console.log(start)
  }
  wealthEachYear.push(start);
  return start;
}
  console.log(wealthEachYear);
  var compoundedContinuously = compoundContinuous(initial, additional, 10);
  document.getElementById("compounded").innerHTML = compoundedContinuously;

;}