/*

included min excluded max
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

included min and max both
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
*/

Evaluator.prototype.eval_maths = function(list,env) {
    var ret = {type: "STRING" , value: "nil"};
    
    var symbol = list[0].value;
    var value = null;
    
    
    if(symbol != "random") {
        if(list.length > 1)
            var number = this.eval_list(list[1],env);
        else 
            throw " Required aleast one arguments... ";
    }
    
    switch(symbol) {
        case "random":
            if(list.length == 1) {
                value = Math.random();
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "power":
            if(list.length == 3) {
                var x = this.eval_list(list[1],env);
                var y = this.eval_list(list[2],env);

                if(x.type == "NUMBER" && y.type == "NUMBER") {
                    
                    if(x.value > 0 && y.value > 0) {
                        value = Math.pow(x.value,y.value);
                    }
                
                } else {
                    throw " Required Number.. " ;
                }                
            } else {
                throw symbol + " Required two arguments"
            }            
            break;
        case "abs":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.abs(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "ciel":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.ceil(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "floor":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.floor(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "round":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.round(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "sqrt":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.sqrt(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "sine":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.sin(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "cos":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.cos(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments "
            }            
            break;
        case "tan":
            if(list.length == 2) {
                if(number.type == "NUMBER") {
                    value = Math.tan(number.value);
                } else {
                    throw " Required Number.. instead of " + number.value;
                }                
            } else {
                throw symbol + " Required one arguments"
            }            
            break;
        case "max":
            var args = [];
            for(var i=1;i<list.length;i++) {
                atom = this.eval_list(list[i],env);
                if(atom.type == "NUMBER") {
                    args.push(atom.value);
                } else{
                    throw " Required Number.. "
                }
            }
            value = Math.max.apply(Math,args);
            break;
        case "min":
            var args = [];
            for(var i=1;i<list.length;i++) {
                atom = this.eval_list(list[i],env);
                if(atom.type == "NUMBER") {
                    args.push(atom.value);
                } else{
                    throw " Required Number.. instead of " + atom.value;
                }
            }
            value = Math.min.apply(Math,args);
            break;
        case "choose":
            var args = [];
            for(var i=1;i<list.length;i++) {
                atom = this.eval_list(list[i],env);
                if(atom.type == "NUMBER" || atom.type == "STRING") {
                    args.push(atom.value);
                } else{
                    throw " Required Number.. instead of " + atom.value;
                }
            }
            var index = Math.floor(Math.random()*args.length);
            value = args[index];
            break;
        default:
            throw " Not Yet Implemented.. " + symbol + "  ";
    }
    
    obj = {type: "NUMBER",value: value};
    ret = obj;
    return ret;
}