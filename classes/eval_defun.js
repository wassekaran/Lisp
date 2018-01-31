Evaluator.prototype.eval_defun = function (list,env) {

    if(list.length == 4) {
        if(this.is_list(list[1])) {
            throw " Require Function name..."
        }

        if(this.is_list(!list[2])) {
            throw " Require Parameters..."
        }

        if(this.is_list(!list[3])) {
            throw " Require Body..."
        }

        var func_name   = list[1];
        var func_params = list[2];
        var func_body   = list[3];


        for(var i=0;i<func_params.length;i++) {
            if(func_params[i].type != "SYMBOL") {
                throw " Require Symbol..."                    
            }
        }

        var check = env.get(func_name.value);

        if(check.value == "nil") {
            var func_obj = {
                name: func_name.value,
                type: "FUNC_CALL",
                params: func_params,
                body: func_body,
            }

            env.set(func_name.value,func_obj);

        } else {
            throw " Function " + func_name.value + " already Exists..."

        }


    }    
} 
