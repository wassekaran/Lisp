Evaluator.prototype.make_list_str = function (list) {

    var string = ""

    for(var i=0;i<list.length;i++) {

        if(this.is_list(list[i])) {
            if(i < list.length - 1)
                string += this.make_list_str(list[i]) + " , ";
            else
                string += this.make_list_str(list[i])  ;

        } else {
            if(i < list.length - 1)
                string += list[i].value + ","    
            else    
                string += list[i].value                    
        }

    }

    return " ( " + string + " ) ";
}

Evaluator.prototype.eval_writeln =  function(list,env) {

    var string = ""
    for(var i=1;i<list.length;i++) {
        var atom = this.eval_list(list[i],env);

        if(this.is_list(atom)) {
            var str = this.make_list_str(atom);                
            var obj = {type: "STRING",value: str}
            string +=  obj.value;                                                            
        } else {
            string += atom.value;
        }

    }
    string += "<br>";

    console_log(string);

    var obj = {type: "STRING" , value: string};
    return obj;

}

