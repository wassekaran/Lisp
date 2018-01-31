/*
Evaluator.prototype.eval_template = function(list,env) {
    var ret = {type: "STRING" , value: "nil"};
    
    return ret;
}
*/
Evaluator.prototype.eval_dotimes = function(list,env) {
    var ret = {type: "STRING" , value: "nil"};
    
    if(list.length < 5) {
        
        var counter = list[1];
        var body   = list[2];
        
        if(!this.is_list(counter)) {
            throw " Missing Counter / Body "
        }
        
        if(!this.is_list(body)) {
            throw " Missing Counter / Body "
        }
        

        var has_break     = false;
        var has_continue  = false;

        if(list.length == 4) {
            var statement      = list[3][0];

            if(statement.value == "break") {
                var break_cond_list = list[3][1];
                has_break = true;
            }

            if(statement.value == "continue") {
                var continue_cond_list = list[3][1];
                has_continue = true;
            }

        }
        
        if(counter.length != 3) {
            throw " Only 3 arguments are required.. "
        }
        
        if(this.is_list(counter[1]) || this.is_list(counter[2]) || this.is_list(counter[0])) {
            throw " Syntax Error "
        }
        
        if(counter[0].type != "SYMBOL") {
            throw " Requires Symbol.. ";
        }
        

        var counter_name = counter[0];
        var counter_start = this.eval_list(counter[1],env);
        var counter_end = this.eval_list(counter[2],env);
        
        var counter_obj = env.get(counter[0].value);
        
        
        if(counter_obj.value == "nil") {
            throw counter.name + " Counter variable is not declared.. "
        }
        
        if(counter_start.type != "NUMBER" || counter_end.type != "NUMBER") {
            throw " Require Number "
        }


        env.set(counter_name.value,counter_start);

        var counter = counter_start.value;

        while(counter <= counter_end.value) {        
            //var break_cond = this.eval_list(list[3],env);
            //if(break_cond.value == true) {
            //   break;
            //}

            if(has_break == true) {
                var break_cond = this.eval_list(break_cond_list,env);

                if(break_cond.value == true) {
                   break;
                } else {
                    counter = counter + 1;
                    this.eval_list(body,env);
                    env.set(counter_name.value,{type: "NUMBER",value: counter});                
                }
            } else if(has_continue == true)  {
                counter = counter + 1;            
                env.set(counter_name.value,{type: "NUMBER",value: counter});                                           

                var continue_cond = this.eval_list(continue_cond_list,env);

                if(continue_cond.value == true) {
                    continue;
                } else {
                    this.eval_list(body,env);
                }

            } else {
                counter = counter + 1;
                this.eval_list(body,env);
                env.set(counter_name.value,{type: "NUMBER",value: counter});                            
            }


        }
        
    } else {
        throw "Syntax Error.."
    }
    

    return ret;
}

Evaluator.prototype.eval_while = function(list,env) {
    var ret = {type: "STRING" , value: "nil"};
    
    if(list.length < 4) {
        
        var cond   = this.eval_list(list[1],env);
        var body   = list[2];
        
        
        if(!this.is_list(body)) {
            throw " Missing Counter / Body "
        }
        
                
        
        while(cond.value) {        
            this.eval_list(body,env);
            cond = this.eval_list(list[1],env);
        }
        
    } else {
        throw "Syntax Error.."
    }
    

    return ret;
}