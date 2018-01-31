
Evaluator.prototype.eval_arith = function(list,env) {

    var symbol = list[0].value;

    if(list.length == 1) {
        throw "Required atleast one argument for symbol: " + symbol;            
    }

    var args = [];

    var atom = this.eval_list(list[1],env)

    if(atom.type != "NUMBER") {                        
        throw "Required NUMBER instead of " + atom.value;
    }

    var ret = atom.value;

    for(var i=2;i<list.length;i++) {
        var atom = this.eval_list(list[i],env);

        if(atom.type != "NUMBER") {
            throw "Required NUMBER instead of " + atom.value;
        }

        if(symbol == "+") ret += atom.value;
        if(symbol == "-") ret -= atom.value;
        if(symbol == "*") ret *= atom.value;
        if(symbol == "/") ret /= atom.value;
        if(symbol == "%") ret %= atom.value;

    }

    var obj = {type: "NUMBER" , value: ret};
    return obj;
}


Evaluator.prototype.eval_cond_expression = function(list,env) {

    var result = "nil";

    if(list[0].value == "!") {
        if(list.length == 2) {
            var operand = this.eval_list(list[1],env);

            result = (! operand.value);


            var obj = {type: "STRING", value:result } ;
            return obj;                
        } else {
            throw "Required only one argument for symbol: " + list[0].value;                        
        }

    }

    if(list.length == 3) {

        var operator = list[0].value;
        var operand1 = this.eval_list(list[1],env);
        var operand2 = this.eval_list(list[2],env);

        switch(operator) {
                case "==":        
                    result = operand1.value == operand2.value;
                    break;
                case "!=":        
                    result = operand1.value != operand2.value;
                    break;
                case ">=":        
                    result = operand1.value >= operand2.value;
                    break;
                case "<=":        
                    result = operand1.value <= operand2.value;
                    break;
                case "<":        
                    result = operand1.value < operand2.value;
                    break;
                case ">":        
                    result = operand1.value > operand2.value;
                    break;
                case "&&":        
                    result = operand1.value && operand2.value;
                    break;
                case "||":
                    result = operand1.value || operand2.value;
                    break;

        }


    } else {
        throw "Required only two argument for symbol: " + list[0].value;                        
    }

    var obj = {type: "STRING", value:result } ;

    return obj;
}
