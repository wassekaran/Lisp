function Env(scope,parent){
    
    this.scope = scope;
    this.parent = parent || null;
  
    this.get_scope = function(symbol) {

        if(this.scope.hasOwnProperty(symbol)) {
            return this.scope;
        }
        
		
        if(this.parent != null){            
            if(this.parent.get_scope(symbol)) {
                return this.parent.get_scope(symbol);
            }
        }
        
        return null;
		
    }
    
    this.get = function(symbol) {        
        var scope = this.get_scope(symbol);
        return scope ? scope[symbol] : {type: "STRING",value: "nil"};
    }
    
    this.set = function(symbol,value) {
        this.scope[symbol] = value;
    }
    
}

var Evaluator = function Evaluator(ast) {
    var _ast = ast;

    var global_env = {
    
    };
    
    this.is_list = function(list) {
        if(Array.isArray(list) == true) {
            return true;
        } else {
            return false;
        }
    
    }
    
    this.get_symbol = function(list) {
        if(this.is_list(list)) {
            if(list[0].type == "SYMBOL") {
                return list[0];
            } else {
                throw " Required Symbol "
            }
            
        }
    }
    
    this.interpret = function() {
        var env = new Env(global_env);
        
        try {
            for(i=0;i<_ast.length;i++) {
                this.eval_list(_ast[i],env);
            }
        } catch(err) {
            console_log("ERROR: " + err);
        }
    
    }
    
    
}

