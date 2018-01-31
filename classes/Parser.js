
function Parser(tokens) {
	var _ast = [];
	var _tokens  = tokens;
	var _pos    = 0;
    var _peak = tokens.length - 1;
    
    
    this.pos = function() {
        return _pos;
    }
    
    this.peak = function() {
        return _peak;
    }
    
    this.token = function() {
        return _tokens[this.pos()];
    }
    
    this.next_token = function() {
        this.next();
        var token = this.token();
        this.prev();
        return token;
    }
    
    this.prev_token = function() {
        this.prev();
        var token = this.token();
        this.next();
        return token;
    }
    
    this.next = function() {
        if(this.pos() < this.peak()) {
            _pos = _pos + 1;    
        } else {
            _pos = this.peak();
        }
    }
    
    this.prev = function() {
        if(this.pos() > 0) {
            _pos = _pos - 1;    
        } else {
            _pos = 0;
        }
        
    }

    this.is_list_start = function() {
        
        if(this.token()[1] == "(") {
            return true;
        } else {
            return false;
        }
    
    }
    
    this.is_list_end = function() {
        
        if(this.token()[1] == ")") {
            return true;
        } else {
            return false;
        }
    
    }
    
    this.is_token_null = function () {
        
        if(this.token()[1] == "NULL") {
            return true;
        } else {
            return false;
        }
    
    }
    
    this.parse_list = function() {
        var list = [];        
        this.next();
        
        while(!this.is_list_end() && this.pos() < this.peak()  && !this.is_token_null()) {
            if(this.is_list_start()) {
                list.push(this.parse_list());
                
                if(!this.is_list_end()) {
                    list = [];
                    throw " Missing )";
                }
                
            } else {
                
                var token = {
                    type:  this.token()[0],
                    value: this.token()[1],
                }
                
                list.push(token);
            
            }
            
            this.next();                                        
        }
        
        
        return list;
        
    }
    
    this.parse = function(tokens) {
        var root = [];
        try {
            
            if(this.is_list_end()) {
                throw " Excepted ( ";                
            }
            
            while(this.pos() < this.peak() && !this.is_token_null()) {

                if(this.is_list_start()) {
                    root.push(this.parse_list());
                    
                    if(!this.is_list_end()) {
                        root = [];
                        throw " Missing )";
                    }
                }

                this.next();
            }
        }  catch(err) {
            console_log(err);
        }
        
        return root;
    
    }
	
	this.get_ast = function() {
        _ast = this.parse();
        return _ast;
	}

}



