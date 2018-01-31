Evaluator.prototype.eval_block = function(list,env) {

    //var block_scope = {};
    //var block_env   = new Env(block_scope,env);
    var start = 0;

    if(this.is_list(list[1]) == false) {
        if(list[1].value == "local") {
            var block_scope = {};
            var block_env   = new Env(block_scope,env);
            start = 2;
        } else {
            start = 1;
        }
    } else {
        var block_env = env;
        start = 1;
    }

    var block_env = env;

    for(var i=start;i<list.length;i++) {
        this.eval_list(list[i],block_env);
    }

}



Evaluator.prototype.eval_if = function(list,env) {

    var obj = {type: "STRING", value:"nil" } ;


    if(list.length == 4) {
        var cond = this.eval_list(list[1],env);

        if(cond.value == true || cond.value == false) {

            var block_true  = list[2];
            var block_false = list[3];

            if(cond.value == true) {
                return this.eval_list(block_true,env);
            } else {
                return this.eval_list(block_false,env);                    
            }

        } else {
            throw "Required true or false ";                        

        }


    } else if(list.length == 3) {
        var cond = this.eval_list(list[1],env);

        if(cond.value == true || cond.value == false) {

            var block_true  = list[2];

            if(cond.value == true) {
                return this.eval_list(block_true,env);
            }

        } else {
            throw "Required true or false ";                        

        }


    } else {
            throw "Invalid Syntax ";                                    
    }



    return obj;

}

Evaluator.prototype.eval_cond = function(list,env) {
    var ret = {type: "STRING",value: "nil"}

    var conds = [];
    var blocks = [];

    var block_default = null;
    var block_true   = null;

    for(var i=1;i<list.length;i++) {
        if(i%2 == 1) {
            conds.push(list[i]);
        } else {
            blocks.push(list[i]);
        }
    }

    for(var i=0;i<conds.length;i++) {
        var eval = this.eval_list(conds[i],env);

        if(eval.value == "default") {
            block_default = blocks[i];
            continue;
        }else if(eval.value == true || eval.value == false) {
            if(eval.value == true) {
                block_true = blocks[i];
                break;
            }
        } else {
            throw "Required true or false ";                                        
        }            

    }

    if(block_true != null) {
        ret = this.eval_list(block_true,env);
    } else {
        if(block_default != null) {
            ret = this.eval_list(block_default,env);
        }
    }


    return ret;
}

