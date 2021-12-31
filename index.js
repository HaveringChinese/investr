//Listen for user-submitted input; prevent page reload; initiate all functions which take user input
var form = document.querySelector("form");
form.addEventListener("submit", function(event){
  event.preventDefault();
  crunchSomeNumbers();
  yearlyWealth(passiveCompoundWealthEachYear);
  yearlyWealth(activeCompoundWealthEachYear);
  drawChart();
})

//empty arrays will be filled with projected investment yields at each time interval
//these will then be the data points for the Google Charts api displayed
var activeCompoundWealthEachYear = [];
var passiveCompoundWealthEachYear = [];


//crunchSomeNumbers stores user input, displays it back to the user, and passes those values through:
//compoundContinuous, howMuchOlder, and wealthAtEachAge, before postResults displays the output corresponding with the given user input
function crunchSomeNumbers(){
  
  var initial = document.getElementById("initial").value;
  var additional = document.getElementById("additional").value;
  var age = Number(document.getElementById("age").value);
  
  document.getElementById("initial-investment").innerHTML = initial;
  document.getElementById("additional-investment").innerHTML = additional;
  document.getElementById("inputted-age").innerHTML = age;


//compoundContinuous 
function compoundContinuous(start, add, time, rate){
  for (let i = 0; i < time; i++) {
    start = start * (1 + rate);
    start += (add * 12);

  if (rate === 0.13){
  activeCompoundWealthEachYear.push(parseInt(start));
  } else if (rate === 0.07) {
    passiveCompoundWealthEachYear.push(parseInt(start));
  } else {
    console.log("Invalid rate given.");
    return null;
    }
  }
  return parseInt(start);
}
//returns how much older the user is after a given number of years
function howMuchOlder(years){
  return age + years;
};
//creates concatenated text output given average annual investment yield
function wealthAtEachAge(rate){
  var ages = [10, 20, 30, 40];
  var results = [];
  for (let i = 0; i < ages.length; i++){
    results.push("In " + ages[i] + " years, at " + howMuchOlder(ages[i]) + ", you might reasonably expect to have grown your wealth to " + compoundContinuous(initial, additional, ages[i], rate) + " dollars.");
  }
  return results.join("<br>");
};

//calls and displays output of wealthAtEachAge called using a rate which depends on the given type of investment
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

console.log(passiveCompoundWealthEachYear, activeCompoundWealthEachYear);

};


//Display investment projections based on user input using Google Charts

google.charts.load('current', {'packages':['corechart']});

function yearlyWealth(array){
  var newArray = array.slice(60, );
  console.log(newArray);

  };

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}