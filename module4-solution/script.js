// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)
(function (){

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using either the helloSpeaker's or byeSpeaker's 'speak' method.
  // See Lecture 50, part 1
  for (var i = 0; i < names.length; i++) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[i].toLowerCase().charAt(0);

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // Section 2 in the Assignment
  var speakerString = function (name) {
    var firstLetter = name.toLowerCase().charAt(0);
    if (firstLetter === 'j') {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  var greetingList = names.map((name) => speakerString(name));

  for(i = 0; i < greetingList.length; i++){
    console.log(greetingList[i]);
  };


  // Section 3 in the Assignment
  var resultGreetings = {
    hello: [],
    goodbye: []
  }

  resultGreetings.goodbye = names.reduce(
    (previousValue, currentValue) => {
      if (currentValue.toLowerCase().charAt(0) === 'j') {
        return previousValue.concat( byeSpeaker.speakSimple(currentValue))
      }
      else{
        return previousValue.concat()
      }
    } , resultGreetings.goodbye
  );

  resultGreetings.hello = names.reduce(
    (previousValue, currentValue) => {
      if (currentValue.toLowerCase().charAt(0) !== 'j') {
        return previousValue.concat( helloSpeaker.speakSimple(currentValue))
      }
      else{
        return previousValue.concat()
      }
    } , resultGreetings.hello
  );

  for(i = 0; i < resultGreetings.hello.length; i++){
    console.log(resultGreetings.hello[i])
  }

  for(i = 0; i < resultGreetings.goodbye.length; i++){
    console.log(resultGreetings.goodbye[i])
  } 
})();

