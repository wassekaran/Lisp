
function main(input) {
    var program = input;
    output = program;
    
    
	var lexer = new Lexer(program);
	var tokens = lexer.get_tokens();
	var parser = new Parser(tokens);
    var ast = parser.get_ast();
	var evaluator = new Evaluator(ast);
    evaluator.interpret();
    
    //console.log(tokens);
	
    output = "";
	return output;
}

function run() {
    
    var scripts = document.getElementsByTagName("script");
    
    for(var i=0;i<scripts.length;i++) {
		var script = scripts[i];
		if(script.type == 'text/lisp'){
		   var span = document.createElement('SPAN');
		   span.innerHTML = main(script.text);
		   script.parentNode.insertBefore(span, script);
		}
    }
        
}

window.onload = run();