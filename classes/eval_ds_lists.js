Evaluator.prototype.eval_quote = function(list,env) {

    if(list.length == 2) {
        var quote_list = list[1];

        if(this.is_list(quote_list) == false) {
            throw "Required list as a arguments.."                
        }

        if(quote_list.length == 0) {
            var obj = {type: "STRING" , value: "nil"};
            quote_list.push(obj);

        }

        return quote_list;

    } else {
        throw "Required only one arguments.."
    }
}

Evaluator.prototype.eval_car =  function(list,env) {

    if(list.length == 2) {

        var car_list = list[1];

        if(car_list.type == "SYMBOL") {

            var obj = env.get(car_list.value);

            if(obj.value == "nil") {
                throw " Symbol " +  car_list.value + " is not defined.. ";                                  
            } else {

                car_list = env.get(car_list.value);


                if(this.is_list(car_list)) {
                    var ret = car_list;
                } else {
                    throw " " + list[1].value +  " is not a list.."                                        
                }

            }

        } else {
            var ret = this.eval_list(car_list,env);

            if(this.is_list(car_list) == false) {
                throw "Required list as a arguments.."                
            }

        }


        if(car_list.length == 0) {
            var obj = {type: "STRING" , value: "nil"};
            car_list.push(obj);

        }


        if(ret.length == 0  ) {
            var obj = {type: "STRING" , value: "nil"};
            return obj;
        } else {
            var final_list = ret[0];            

            if(final_list == undefined) {
                var obj = {type: "STRING" , value: "nil"};
                return obj;                    
            } else {
                return final_list;
            }

        }

    } else {
        throw "Required only one arguments.."
    }
    return {type: "STRING" ,value: "nil"};    
}

Evaluator.prototype.eval_cdr =  function(list,env) {

    if(list.length == 2) {
        var cdr_list = list[1];

        if(cdr_list.type == "SYMBOL") {

            var obj = env.get(cdr_list.value);

            if(obj.value == "nil") {
                throw " Symbol " +  cdr_list.value + " is not defined.. ";                                  
            } else {

                cdr_list = env.get(cdr_list.value);


                if(this.is_list(cdr_list)) {
                    var ret = cdr_list;
                } else {
                    throw " " + list[1].value +  " is not a list.."                                        
                }

            }

        } else {
            var ret = this.eval_list(cdr_list,env);

            if(this.is_list(cdr_list) == false) {
                throw "Required list as a arguments.."                
            }

        }


        if(ret.length == 0  ) {
            var obj = {type: "STRING" , value: "nil"};
            return obj;
        } else {

            var final_list = [];            

            for(var i=1;i<ret.length;i++) {
               final_list.push(ret[i]); 
            }

            if(final_list == undefined || final_list.length == 0) {
                var obj = {type: "STRING" , value: "nil"};
                return obj;                    
            } else {
                return final_list;
            }

        }

    } else {
        throw "Required only one arguments.."
    }
    return {type: "STRING" ,value: "nil"};
}

Evaluator.prototype.eval_cons =  function(list,env) {

    if(list.length == 3) {

        if(list[1].type == "SYMBOL") {

            var obj = env.get(list[1].value);

            if(!this.is_list(obj)) {
                throw " " + list[1].value +  " is not a list.."                                        
            }


        }

        if(list[2].type == "SYMBOL") {

            var obj = env.get(list[2].value);

            if(!this.is_list(obj)) {
                throw " " + list[2].value +  " is not a list.."                                        
            }


        }

        var car_list = this.eval_list(list[1],env);
        var cdr_list = this.eval_list(list[2],env);            

        var final_list = [];
        final_list.push(car_list);


        if(this.is_list((cdr_list))) {
            for(var i=0;i<cdr_list.length;i++) {
                final_list.push(cdr_list[i]);
            }

        } else {
            final_list.push(cdr_list);               
        }
        return final_list;
    } else {
        throw "Required only two arguments.."
    }

    return {type: "STRING" ,value: "nil"};
}

