
Evaluator.prototype.get_args = function(list) {
    var args = [];

    for(var i=1;i<list.length;i++) {
        args.push(list[i]);
    }

    return args;

}

Evaluator.prototype.eval_args = function(list,env) {

    var args = [];

    for(var i=0;i<list.length;i++) {
        args.push(this.eval_list(list[i],env));
    }

    return args;

}

Evaluator.prototype.eval_defvar = function (list,env) {

     if(list.length <= 3) {

         if(list.length == 1) {
            throw " Missing SYMBOL Name.. ";                                  
         }

         var symbol = list[1]; 

         if(symbol.type != "SYMBOL") {
            throw " Required SYMBOL "                              
         }

         var obj = env.get(symbol.value);

         if(list.length == 3) {
            var value = this.eval_list(list[2],env);                 
         } else if(list.length == 2) {
            var value = {type: "NUMBER",value: 0}; 
         }

         if(obj.value == "nil") {
             env.set(symbol.value,value);
         } else {
            throw " Symbol " + symbol.value + " is already defined.. ";                                  
         }             

     } else {
        throw "Syntax Error.. "             
     }
    return {type: "STRING" ,value: "nil"};
 }

Evaluator.prototype.eval_assign = function (list,env) {

     if(list.length <= 3) {

         if(list.length == 1) {
            throw " Missing SYMBOL Name.. ";                                  
         }

         var symbol = list[1]; 

         if(symbol.type != "SYMBOL") {
            throw " Required SYMBOL "                              
         }

         var obj = env.get(symbol.value);

         if(list.length == 3) {
            var value = this.eval_list(list[2],env);                 
         } else if(list.length == 2) {
            throw " Invalid Assignment "                              
         }

         if(obj.value != "nil") {
             env.set(symbol.value,value);
         } else {
            throw " Symbol " + symbol.value + " is not defined.. ";                                  
         }             

     } else {
        throw "Syntax Error.. "             
     }
    return {type: "STRING" ,value: "nil"};
 }

