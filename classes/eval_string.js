Evaluator.prototype.eval_string = function(list,env) {
    var ret = {type: "STRING" , value: "nil"};
    var symbol = list[0].value;
    
    
    switch(symbol) {
        case "strlen":
            if(list.length == 2) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    var length = obj.value.length;
                    ret = {type: "NUMBER" , value: length};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only one Arguments.. ";
            }
            break;
        case "strrev":
            if(list.length == 2) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    var str = obj.value;
                    var string =  str.split('').reverse().join('');
                    ret = {type: "STRING" , value: string};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only one Arguments.. ";
            }
            break;
        case "str_to_upper":
            if(list.length == 2) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    var str = obj.value;
                    var string =  str.toUpperCase();                
                    ret = {type: "STRING" , value: string};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only one Arguments.. ";
            }
            break;
        case "str_to_lower":
            if(list.length == 2) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    var str = obj.value;
                    var string =  str.toLowerCase();                
                    ret = {type: "STRING" , value: string};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only one Arguments.. ";
            }
            break;
        case "str_to_num":
            if(list.length == 2) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    var str = obj.value;
                    ret = {type: "NUMBER" , value: parseFloat(str)};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only one Arguments.. ";
            }
            break;
        case "substr":
            if(list.length == 4) {
                var obj = this.eval_list(list[1],env);
                
                if(obj.type == "STRING" && !this.is_list(list[1])) {
                    
                    var start = this.eval_list(list[2],env);
                    var end = this.eval_list(list[3],env);
                    
                    if(start.type == "NUMBER" && end.type == "NUMBER"){
                        var str = obj.value
                        var string = str.substr(start.value,end.value);
                        ret = {type: "STRING" , value: string};
                        return ret;
                    } else {
                        throw " Requires Number.."
                    }
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only three Arguments.. ";
            }
            break;
        case "str_char_at":
            if(list.length == 3) {
                var number_obj = this.eval_list(list[1],env);
                
                
                var obj = this.eval_list(list[2],env);
                
                if(number_obj.type != "NUMBER") {
                    throw " Not a Number... ";                    
                }
                
                if(obj.type == "STRING" && !this.is_list(list[2])) {
                    var str = obj.value;
                    
                    if(!(number_obj.value >= 0 && number_obj.value < str.length)) {
                        throw " Invalid Position... ";
                    }
                    
                    
                    var string =  str.charAt(number_obj.value);                
                    ret = {type: "STRING" , value: string};
                    return ret;
                } else {
                    throw " Not a String ";                    
                }
                
            } else {
                throw " Required only two Arguments.. ";
            }
            break;
        case "str_concat":
            if(list.length == 1) {
                throw " Required atleast One Arguments.. ";
            } else {
                
                var args = [];
                
                for(var i=1;i<list.length;i++) {
                    var atom = this.eval_list(list[i],env);
                    if(atom.type == "STRING") {
                        args.push(atom.value);
                    } else {
                        throw " Not a String ";
                    }
                }
                
                var string = args.join(" ");
                
                ret = {type: "STRING" , value: string};
                return ret;
            }
            break;
        default:
            throw " Not Yet Implemented.. " + symbol + "  ";
            
    }
    
           
    return ret;
}