function calculate(input){
	try{
input = input.replace(/[Pp][Ii]/gm, Math.PI.toString());
input = input.replace(/ /gm, "");
var mult = input.match(/[0-9]+((\.([0-9]+))?)\(/gm);
if (mult != null){
for(var i = 0; i < mult.length; i++){
input = input.replace(mult[i], mult[i].match(/[0-9]+((\.([0-9]+))?)/gm)[0] + "*(");
}
}
mult = input.match(/\)[0-9]+((\.([0-9]+))?)/gm);
if (mult != null){
for(var i = 0; i < mult.length; i++){
input = input.replace(mult[i], ")*" + mult[i].substring(2));
}
}
  var parenthesis = input.match(/\([^\(\)]+\)/gm);
  
  while (parenthesis != null){
   for(var i = 0; i < parenthesis.length; i++){
    input = input.replace(parenthesis[i], calculate(parenthesis[i].substring(1, parenthesis[i].length - 1)).toString());
	
   }
    var parenthesis = input.match(/\([^\(\)]+\)/gm);
  }
	var abs = input.match(/abs(-?[0-9]+)((\.([0-9]+))?)/gm);
	var acos = input.match(/acos(-?[0-9]+)((\.([0-9]+))?)/gm);
	var asin = input.match(/asin(-?[0-9]+)((\.([0-9]+))?)/gm);
	var atan = input.match(/atan(-?[0-9]+)((\.([0-9]+))?)/gm);
	var log = input.match(/log(-?[0-9]+)((\.([0-9]+))?)/gm);
	var sqrt = input.match(/sqrt(-?[0-9]+)((\.([0-9]+))?)/gm);
	if (abs != null){
	for(var i = 0; i < abs.length; i++){
		input = input.replace(abs[i], Math.abs(parseFloat(abs[i].substring(3))));
	}
	}
    if (acos != null){
	for(var i = 0; i < acos.length; i++){
		input = input.replace(acos[i], Math.acos(parseFloat(acos[i].substring(3))));
	}
	} 
	 if (asin != null){
	for(var i = 0; i < asin.length; i++){
		input = input.replace(asin[i], Math.asin(parseFloat(asin[i].substring(3))));
	}
	} 
	 if (atan != null){
	for(var i = 0; i < atan.length; i++){
		input = input.replace(atan[i], Math.atan(parseFloat(atan[i].substring(3))));
	}
	} 
	 if (log != null){
	for(var i = 0; i < log.length; i++){
		input = input.replace(log[i], Math.log(parseFloat(log[i].substring(3))));
	}
	}
	if (sqrt != null){
	for(var i = 0; i < sqrt.length; i++){
		input = input.replace(sqrt[i], Math.sqrt(parseFloat(sqrt[i].substring(3))));
	}
	}
	var cos = input.match(/cos(-?[0-9]+)((\.([0-9]+))?)/gm);
	var sin = input.match(/sin(-?[0-9]+)((\.([0-9]+))?)/gm);
	var tan = input.match(/tan(-?[0-9]+)((\.([0-9]+))?)/gm);
	if (cos != null){
	console.log(cos);
	for(var i = 0; i < cos.length; i++){
		input = input.replace(cos[i], Math.cos(parseFloat(cos[i].substring(3))));
	}
	} 
	 if (sin != null){
	for(var i = 0; i < sin.length; i++){
		input = input.replace(sin[i], Math.sin(parseFloat(sin[i].substring(3))));
	}
	} 
	 if (tan != null){
	for(var i = 0; i < tan.length; i++){
		input = input.replace(tan[i], Math.tan(parseFloat(tan[i].substring(3))));
	}
	}
var pow = input.match(/(^-)?[0-9]+((\.([0-9]+))?)\^(-?[0-9]+)((\.([0-9]+))?)/gm);
if (pow != null){
	for(var i = 0; i < pow.length; i++){
	var pows = pow[i].split("^");
		input = input.replace(pow[i], Math.pow(parseFloat(pows[0]), parseFloat(pows[1])));
		console.log(input);
		pow = input.match(/(^-)?[0-9]+((\.([0-9]+))?)\^(-?[0-9]+)((\.([0-9]+))?)/gm);
		if (pow == null){
		break;
		}
		i = -1;
	}
}
 var operands = input.match(/[0-9]+((\.([0-9]+))?)/gm);
 if (operands == null){
 return "Beabooooo (Error. Please include operands.)";
 }
  var solution = parseFloat(operands[0]);
   if (input.charAt(0) == '-'){
   solution *= -1;
   }
  if (operands.length == 1){
    return solution;
  }
 var operators = input.match(/[+\-\/\*]+/gm);
 var i = 0;
  if (input.charAt(0) == '-'){
    i = 1;
  }
  for(; i < operators.length; i++){
   switch(operators[i]){
    case '+':
       solution += parseFloat(operands[i+1]);
    break;
    case '-':
       solution -= parseFloat(operands[i+1]);
    break;
	case '*':
       solution *= parseFloat(operands[i+1]);
    break;
	case '/':
       solution /= parseFloat(operands[i+1]);
    break;
	 case '+-':
       solution += -parseFloat(operands[i+1]);
    break;
    case '--':
       solution -= -parseFloat(operands[i+1]);
    break;
	case '*-':
       solution *= -parseFloat(operands[i+1]);
    break;
	case '/-':
       solution /= -parseFloat(operands[i+1]);
    break;
   }
  }
  
  return solution.toString();
	} catch (err){
		return err.message;
	}
}


module.exports = calculate;