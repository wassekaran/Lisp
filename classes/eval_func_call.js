Evaluator.prototype.eval_func_call = function(list,env) {
        
    var ret = {type: "STRING" , value: "nil"};
    var func_obj = env.get(list[0].value);
    var args = [];

    for(var i=1;i<list.length;i++) {
        args.push(this.eval_list(list[i],env));
    }


    if(func_obj.params.length != args.length) {
            throw " Paramaters errors "

    }


    var func_env = new Env({},env);        
    for(var i=0;i<func_obj.params.length;i++) {
        var param_name = func_obj.params[i].value;
        var param_value = args[i];
        func_env.set(param_name,param_value);            
    }


    ret = this.eval_list(func_obj.body,func_env);

    return ret;

}
    
