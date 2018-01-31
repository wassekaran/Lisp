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
        default:
            throw " Not Yet Implemented.. " + symbol + "  ";
            
    }
    
           
    return ret;
}