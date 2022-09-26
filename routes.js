const express = require("express");
const routes = express.Router()

function validateImput(temp) {
  var regex = new RegExp(/\b\d+\+(f|c|k)\+(to)\+(f|c|k)\b/g)
  var valid = regex.test(temp)

  if (valid) {

    return true

  } else {
    return { status: '400', description: 'Imput do not have the required format' }

  }
}

function to_kelvin(number,scale){
  newScale = "kelvin"
  switch(scale){

    case 'c':
      number = number + 273.16
      return `${number}° ${newScale}`

    break

    case 'f':
      number = (number - 32) * 5/9 + 273.16
      return `${number}° ${newScale}`

    break

    case 'k':
      number = number
      return `${number}° ${newScale}`

    break
  }
}

function to_fahrenheit(number,scale){
  newScale = "fahrenheit"
  switch(scale){

    case 'c':
      number = (number * 9/5) + 32
      return `${number}° ${newScale}`

    break

    case 'f':
      number = number
      return `${number}° ${newScale}`

    break

    case 'k':
      number = (number - 273.16) * 9/5 + 32
      return `${number}° ${newScale}`

    break
  }
}

function to_celcius(number,scale){
  newScale = "celcius"
  switch(scale){

    case 'c':
      number = number
      return `${number}° ${newScale}`

    break

    case 'f':
      number = (number - 32) * 5/9
      return `${number}° ${newScale}`

    break

    case 'k':
      number = (number - 273.16)
      return `${number}° ${newScale}`

    break
  }
}

routes.get('/convert', (req, res) => {

  var temp = req.query.q.toString().toLocaleLowerCase()
  
  if (validateImput(temp) === true){
    var splitTemp = temp.split('+')
    console.log(splitTemp)

    switch (splitTemp[3]){

      case 'c': 
      res.send(to_celcius(splitTemp[0],splitTemp[1]))
      break

      case 'f': 
      res.send(to_fahrenheit(splitTemp[0],splitTemp[1]))
      break

      case 'k': 
      res.send(to_kelvin(splitTemp[0],splitTemp[1]))
      break

    }

  }
  else{
    res.status(400).json((validateImput(temp)))
  }

})


module.exports = routes