
function Lexer(input) {
	var _tokens = [];
	var _input  = input;
	var _pos    = 0;
    var _peak = input.length - 1;
    
    
    this.pos = function() {
        return _pos;
    }
    
    this.peak = function() {
        return _peak;
    }
    
    this.ch = function() {
        return _input[this.pos()];
    }
    
    this.next_ch = function() {
        this.next();
        var ch = this.ch();
        this.prev();
        return ch;
    }
    
    this.prev_ch = function() {
        this.prev();
        var ch = this.ch();
        this.next();
        return ch;
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

    this.is_digit = function(ch) {
        
        switch(ch) {
            case "0":        
            case "1":        
            case "2":        
            case "3":        
            case "4":        
            case "5":        
            case "6":        
            case "7":        
            case "8":        
            case "9":        
            case ".":
                return true;
            default:
                return false;
        }
        
        return false;
    }
    
    this.is_delimeter = function(ch) {
        
        switch(ch) {
            case "(":        
            case ")":        
            case "{":        
            case "}":        
            case "[":        
            case "]":        
            case ":":        
            case ",":        
            case ";":        
                return true;
            default:
                return false;
        }
        
        return false;
        
    }
    
    this.is_letter = function(ch) {
        
        ch = ch.toLowerCase();
        
        switch(ch) {
            case "a":        
            case "b":        
            case "c":        
            case "d":        
            case "e":        
            case "f":        
            case "g":        
            case "h":        
            case "i":        
            case "j":        
            case "k":        
            case "l":        
            case "m":        
            case "n":        
            case "o":        
            case "p":        
            case "q":        
            case "r":        
            case "s":        
            case "t":        
            case "u":        
            case "v":        
            case "w":        
            case "x":        
            case "y":        
            case "z":
                return true;
            default:
                return false;
        }
        
        return false;
    
    }
    
    this.is_operator = function(ch) {
        
        switch(ch) {
            case "+":        
            case "-":        
            case "*":        
            case "/":        
            case "%":        
            case "=":        
            case ">":        
            case "<":        
            case "&":        
            case "|":        
            case "!":        
            case "^":
                return true;
            default:
                return false;
        }
        
        return false;
    }
    
    this.read_comments = function() {
		
        while(this.ch() != "\n" && this.pos() < this.peak() ) {
			this.next();			
		}
        
    }
    
	this.read_delimeter = function() {
		var delimeter = "";
		var ch = this.ch();
		var delimeter = ch;
		
		token = [];
        token.push("DELIMETER");
        token.push(delimeter);
        return token;
	}
    
    this.read_symbol = function() {
		
        var symbol = "";
		
		while(this.ch() == "_" || this.is_letter(this.ch()) || this.is_digit(this.ch()) && this.pos() < this.peak() ) {
			var ch = this.ch();
			symbol += ch;
			this.next();			
		}
		this.prev();
        
		token = [];
        token.push("SYMBOL");
        token.push(symbol);
        return token;
    }
    
    this.read_number = function() {
		
        var number = "";
		
		while(this.is_digit(this.ch()) && this.pos() < this.peak() ) {
			var ch = this.ch();
			number += ch;
			this.next();			
		}
		this.prev();
        
        number = parseFloat(number);
		token = [];
        token.push("NUMBER");
        token.push(number);
        return token;
    }
    
    this.read_operator = function() {
		
        var operator = "";
		
		while(this.is_operator(this.ch()) && this.pos() < this.peak() ) {
			var ch = this.ch();
			operator += ch;
			this.next();			
		}
		this.prev();
        
		token = [];
        token.push("SYMBOL");
        token.push(operator);
        return token;
    }
    
    this.read_string = function(end) {
		var string = "";
		
        this.next();			
		
        while(this.ch() != end && this.pos() < this.peak()) {
			
			var ch = this.ch();
			
			if(ch == "\\") {
				this.next();			
				ch = this.ch();
				this.next();			
				
                string += ch;
			
            } else {
				string += ch;
				this.next();						
			}
			
		}
        
        if(this.ch() != end) {
           throw " Unterminated String.."
        } else {
            token = [];
            token.push("STRING");
            token.push(string);
            return token;           
        }
        
    }

    
    
    this.tokenize = function() {
        
        try {
        
            while(this.pos() < this.peak()) {
                    var ch = this.ch();    
                    if(ch == " " || ch == "\t" || ch == "\n") {
                        this.next();			
                    } else if(ch == "#") {
                        this.read_comments();
                        this.next();
                    } else if(this.is_delimeter(ch)) {
                        token = this.read_delimeter();
                        _tokens.push(token);
                        this.next();
                    } else if(this.is_operator(ch)) {
                        token = this.read_operator();
                        _tokens.push(token);
                        this.next();
                    } else if(ch == "_"|| this.is_letter(ch)) {
                        token = this.read_symbol();
                        _tokens.push(token);
                        this.next();
                    } else if(this.is_digit(ch)) {
                        token = this.read_number();
                        _tokens.push(token);
                        this.next();
                    } else if(ch == "'" || ch == '"') {
                        token = this.read_string(ch);
                        _tokens.push(token);
                        this.next();
                    } else {
                        throw " Unknown character: " + this.ch();
                        this.next();
                    }		
            }
            
        } catch(err) {
            console_log(err);
        }
        
    }
	
	this.get_tokens = function() {
        
        this.tokenize();
        
        _tokens.push(["EOT","NULL"]);
        _tokens.push(["EOT","NULL"]);
        
        return _tokens;
	}

}



