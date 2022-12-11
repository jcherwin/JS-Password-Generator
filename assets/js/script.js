// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword() {
  // Variable that holds text to send to displayPrompt function
  var promptText = "";

  // Object that contains the different properties of the password that are being checked for
  var pword = {
    length: {
      choice: false, // Stores y/n choice from prompt for custom length 
      value: 8, // Length of the password, default to 8
    },
    charType: {
      choice: false,
      lcase: {
        choice: true,
        value: "abcdefghijklmnopqrstuvwxyz", //length=26
      },
      ucase: {
        choice: false,
        value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      num: {
        choice: false,
        value: "0123456789", //length=10
      },
      schars: {
        choice: false,
        value: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", //length=33
      },
    },    
    text: "", // Stores the final text value of the password to be returned from this function
  };

  // Prompts the user for password critera
  promptText = "Do you want to set a custom password length?"
  +"\n\nCancel: 8 characters (default)";
  pword.length.choice = displayPrompt(promptText,true);

  promptText = "Do you want to include custom characters?"
  +"\n\nCancel: All lowercase (default)";
  pword.charType.choice = displayPrompt(promptText,true);

  // IF the user chose to set a password lenth, THEN they are prompted to enter it 
  if(pword.length.choice){
    promptText = "How long do you want your password to be? (8-128 characters)";

    // WHILE loop to validate the users password length input
    var validateLength = true;
    while(validateLength){
      pword.length.value = displayPrompt(promptText,false);

      // Only exits the loop if the user enters a number between 8 & 128, inclusive
      if(pword.length.value >= 8 && pword.length.value <= 128){
        validateLength = false;
      }else{
        // Resets the password length value for the while loop local scope
        pword.length.value = 8; 
        confirm("Invalid Input");
      }
    }
  }

  // IF the user chose to select custom charcter types, THEN they are prompted to select them
  if(pword.charType.choice){
    promptText = "Which character types do you want to include?"
    +"\n\nYou MUST choose OK for at least ONE";
    displayPrompt(promptText,true);

    // WHILE loop to validate that user has selected at least one character type
    var validateChars = true;
    while(validateChars){
      promptText = "Lowercase?"+"\n\n(Ok-Yes/Cancel-no)";
      pword.charType.lcase.choice = displayPrompt(promptText,true);
      promptText = "Uppercase?"+"\n\n(Ok-Yes/Cancel-no)";
      pword.charType.ucase.choice = displayPrompt(promptText,true);
      promptText = "Numerals?"+"\n\n(Ok-Yes/Cancel-no)";
      pword.charType.num.choice = displayPrompt(promptText,true);
      promptText = "Special Characters?"+"\n\n(Ok-Yes/Cancel-no)";
      pword.charType.schars.choice = displayPrompt(promptText,true);

      //Only exits the loop if at least one character type has been selected
      if(pword.charType.lcase.choice || pword.charType.ucase.choice ||
        pword.charType.num.choice || pword.charType.schars.choice){
        validateChars = false;
      }else{
        // Resets the character type choice booleans for the while loop local scope
        pword.charType.lcase.choice = true;
        pword.charType.ucase.choice, pword.charType.num.choice, pword.charType.schars.choice = false;
        confirm("You MUST choose OK for at least ONE");
      }
    }
  }

  // Object that stores the pool of selected character types, and the selected chartype  
  var typeSet = {
    pool: [],
    selected: null,
  }

  // Checks each character type choice boolean and adds those associated chartype values to the typeSet object
  if(pword.charType.lcase.choice){typeSet.pool.push(pword.charType.lcase.value)}
  if(pword.charType.ucase.choice){typeSet.pool.push(pword.charType.ucase.value)}
  if(pword.charType.num.choice){typeSet.pool.push(pword.charType.num.value)}
  if(pword.charType.schars.choice){typeSet.pool.push(pword.charType.schars.value)}

  //console.log("Typeset pool: "+typeSet.pool);

  // FOR loop that iterates for as many times as the entered or set value of the password length
  for(var i = 0; i < pword.length.value; i++){
    // Generate a random number based on how many chartype sets are in the typeSet pool
    var typeRandom = Math.floor((Math.random() * typeSet.pool.length));
    //console.log("TypeRandom: "+typeRandom);

    // Assigns a chosen charset for this iteration of the loop
    typeSet.selected = typeSet.pool[typeRandom];
    //console.log("TypeSet Selected: "+typeSet.selected);    

    // Generate a random number to select a single character from the selected chartype set and assign it to a variable
    var charRandom = Math.floor((Math.random() * (typeSet.selected.length)));
    //console.log("CharRandom: "+charRandom);
    var charSelect = typeSet.selected.charAt(charRandom);
    //console.log("Char Selected: "+charSelect);

    // Concatenates the chosen character to the text property of the main pword object
    pword.text += charSelect; 
  }
  //console.log(pword.text);

  // Return final value of the fully generated password when this function is called
  return pword.text;
  
}

// pText: string, con: boolean
function displayPrompt(pText,con){
  if(con){return confirm(pText);}
  else{return prompt(pText);}
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
