
function _(id) {
	return document.getElementById(id);
}

function console_log(str) {	
	var string = "";	
	string += "<h1>" + str + "</h1>";
	_("console").innerHTML += string;
}

function print_tokens(tokens) {
    
    console_log("..............");
    
    console_log("Token Lists");
    
    for(var i=0;i<tokens.length;i++) {
        console_log(tokens[i][1]);    
    }
    console_log("..............");
}

function simplified_tokens(tokens) {
    
    var simplified_tokens = [];
    
    for(var i=0;i<tokens.length;i++) {
        simplified_tokens.push(tokens[i][1]);   
    }
    
    return simplified_tokens;
}

