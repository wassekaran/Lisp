
Evaluator.prototype.eval_list = function(list,env) {
        
    var ret = "";        

    if(this.is_list(list)) {

        if(list.length == 0) {
            var obj = {type: "STRING",value: "nil"};
            return obj;
        }

        var symbol = this.get_symbol(list);

        switch(symbol.value) {
            case "default":
                return {type: "STRING",value: "default"};
                break;
            case "break":
                return {type: "STRING",value: "break"};
                break;
            case "continue":
                return {type: "STRING",value: "continue"};
                break;
            case "sine":        
            case "cos":        
            case "tan":        
            case "sqrt":        
            case "max":        
            case "min":        
            case "sqrt":        
            case "round":        
            case "floor":        
            case "ciel":        
            case "abs":        
            case "random":        
            case "power":        
            case "choose":        
                ret = this.eval_maths(list,env);
                break;
            case "strlen":        
            case "strrev":        
            case "str_to_upper":        
            case "str_to_lower":        
            case "str_char_at":        
            case "str_to_num":        
            case "str_concat":        
            case "substr":        
                ret = this.eval_string(list,env);
                break;
            case "==":        
            case "!=":        
            case ">=":        
            case "<=":        
            case "<":        
            case ">":        
            case "!":        
            case "&&":        
            case "||":        
                ret = this.eval_cond_expression(list,env);
                break;
            case "+":        
            case "-":        
            case "*":        
            case "/":       
            case "%":
                ret = this.eval_arith(list,env);
                break;
            case "dotimes":
                this.eval_dotimes(list,env);
                break;
            case "while":
                this.eval_while(list,env);
                break;
            case "if":
                ret = this.eval_if(list,env);
                break;
            case "cond":
                ret = this.eval_cond(list,env);
                break;
            case "writeln":
                ret = this.eval_writeln(list,env);
                break;
            case "defvar":
                this.eval_defvar(list,env);
                break;
            case "block":
                this.eval_block(list,env);
                break;
            case "=":
                this.eval_assign(list,env);
                break;
            case "quote":
                ret = this.eval_quote(list,env);
                break;
            case "car":
                ret = this.eval_car(list,env);
                break;
            case "cdr":
                ret = this.eval_cdr(list,env);
                break;
            case "cons":
                ret = this.eval_cons(list,env);
                break;
            case "defun":
                ret = this.eval_defun(list,env);
                break;
            default:
                var obj = env.get(symbol.value)                    
                if(obj.value != "nil" && obj.type == "FUNC_CALL") {
                    ret = this.eval_func_call(list,env);
                } else {
                    throw " Undefined Symbol: " + symbol.value;
                }

                break;
        }

    } else {

        if(list.type == "SYMBOL") {
            var obj = env.get(list.value);

            switch(list.value) {
                case "nil":
                    return {type: "STRING",value: "nil"};
                    break;
                case "t":
                case "true":
                    return {type: "STRING",value: true};
                    break;
                case "f":
                case "false":
                    return {type: "STRING",value: false};
                    break;
                case "default":
                    return {type: "STRING",value: "default"};
                    break;
                case "break":
                    return {type: "STRING",value: "break"};
                    break;
                case "continue":
                    return {type: "STRING",value: "continue"};
                    break;
            }


            if(obj.type == "STRING" && obj.value == "nil") {
                throw "(ATOMIC TYPE) Undefined Symbol: " + list.value;
            } else {
                return obj;
            }

        } else {
            return list;
        }

    }

    return ret;
}
    

