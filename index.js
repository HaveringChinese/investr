//Listen for user-submitted input; prevent page reload; initiate all functions which take user input
var form = document.querySelector("form");
form.addEventListener("submit", function(event){

    event.preventDefault();
    crunchSomeNumbers();
    drawYearlyWealth(passiveCompoundWealthEachYear, activeCompoundWealthEachYear);
});

//empty arrays will be filled with projected investment yields at each time interval
//these will then be the data points for the Google Charts api displayed
var passiveCompoundWealthEachYear = [];
var activeCompoundWealthEachYear = [];

//set passive and active investing rates (based on HulbertDigest and CT's internal portfolio performance tracking 2013-present)
var passiveRate = 0.07;
var activeRate = 0.13;


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
  return parseInt(start).toLocaleString("en-US");
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
    if (ages[i] === 10){
    results.push("In " + ages[i] + " years, at " + howMuchOlder(ages[i]) + ", you might reasonably expect to have grown your wealth to $" + compoundContinuous(initial, additional, ages[i], rate) + ".");
    } else if (ages[i] === 20 || ages[i] === 30){
      results.push("In " + ages[i] + " years, at " + howMuchOlder(ages[i]) + ": $" + compoundContinuous(initial, additional, ages[i], rate) + ".");
    } else {
      results.push("And in " + ages[i] + " years, at " + howMuchOlder(ages[i]) + ": $" + compoundContinuous(initial, additional, ages[i], rate) + ".");
    }
  }
  return results.join("<br>");
};

//calls and displays output of wealthAtEachAge called using a rate which depends on the given type of investment
function postResults(type){
  if (type==="active"){
    document.getElementById("active-compounded").innerHTML = wealthAtEachAge(activeRate);
  } else if (type==="passive") {
    document.getElementById("passive-compounded").innerHTML = wealthAtEachAge(passiveRate);
  } else {
    return null;
  }
};

postResults("active");
postResults("passive");

};

//Display investment projections based on user input using Google Charts
google.charts.load('current', {'packages':['corechart']});
function drawYearlyWealth(array1, array2){
  var newArray = array1.slice(60, );
  var newArray2 = array2.slice(60, );
    
  // Create a data table.
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'years from now');
  data.addColumn('number', 'Passive Investing Strategy');
  data.addColumn('number', 'Active Investing Strategy');

  //populate the data table
  for (var i = 0; i < newArray.length; i++){
    data.addRow([i, newArray[i], newArray2[i]]);
  }

    var options = {
      title: 'Comparing the Likely Returns for Passive and Active Investing Strategies',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    //create, draw the chart
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
    //clear the arrays for repeated calculations
    activeCompoundWealthEachYear = [];
    passiveCompoundWealthEachYear = [];
  };
