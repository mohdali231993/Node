const express = require('express');
const app = express();
const bodyParser     =         require("body-parser");


app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

var learnRes = new Map();
var hardRes = new Map();
hardRes.set(3131,"block");hardRes.set(3130,"block");hardRes.set(3121,"block");hardRes.set(3120,"shoot");hardRes.set(3111,"block");hardRes.set(3110,"shoot");hardRes.set(3101,"block");hardRes.set(3100,"shoot");
hardRes.set(3031,"reload");hardRes.set(3030,"reload");hardRes.set(3021,"block");hardRes.set(3020,"reload");hardRes.set(3011,"block");hardRes.set(3010,"reload");hardRes.set(3001,"block");hardRes.set(3000,"reload");
hardRes.set(2131,"shoot");hardRes.set(2130,"shoot");hardRes.set(2121,"shoot");hardRes.set(2120,"block");hardRes.set(2111,"block");hardRes.set(2110,"shoot");hardRes.set(2101,"block");hardRes.set(2100,"shoot");
hardRes.set(2031,"reload");hardRes.set(2030,"reload");hardRes.set(2021,"block");hardRes.set(2020,"reload");hardRes.set(2011,"block");hardRes.set(2010,"reload");hardRes.set(2001,"block");hardRes.set(2000,"reload");
hardRes.set(1031,"reload");hardRes.set(1030,"reload");hardRes.set(1021,"reload");hardRes.set(1020,"reload");hardRes.set(1011,"block");hardRes.set(1010,"reload");hardRes.set(1001,"block");hardRes.set(1000,"reload");
hardRes.set(1131,"block");hardRes.set(1130,"shoot");hardRes.set(1121,"block");hardRes.set(1120,"shoot");hardRes.set(1111,"block");hardRes.set(1110,"shoot");hardRes.set(1101,"block");hardRes.set(1100,"shoot");
hardRes.set(0131,"shoot");hardRes.set(0130,"shoot");hardRes.set(0121,"shoot");hardRes.set(0120,"shoot");hardRes.set(0111,"shoot");hardRes.set(0110,"shoot");hardRes.set(0101,"shoot");hardRes.set(0100,"shoot");
hardRes.set(0031,"reload");hardRes.set(0030,"reload");hardRes.set(0021,"reload");hardRes.set(0020,"reload");hardRes.set(0011,"reload");hardRes.set(0010,"reload");hardRes.set(0001,"reload");hardRes.set(0000,"reload");

var l1 = 03;var l2 = 03;
var b1 = 00;var b2 = 00;
var s1 = 01;var s2 = 01;

app.get('/', (req, res) => {
  res.send('Hello from get!');
});

app.post('/', (req, res) => {
	  	
	var game = req.body.game
	var playerLife = req.body.playerLife
	var playerAction = req.body.playerAction
	var opponentAction = req.body.opponentAction
	var opponentLife = req.body.opponentLife
	var result = req.body.result

	
	
	if(game == "begin"){game = "next";	
		res.send("{\n\"action\": \""+hardRes.get(0101)+"\"\n}");
		l1 = 03;l2 = 03;
		b1 = 00;b2 = 00;
		s1 = 01;s2 = 01;
		learnRes.clear();
		
	}
	else{
		var opponent = (b1*1000)+(s1*100)+(b2*10)+s2;
		
		learnRes.set(opponent,""+(opponentAction)+"");
		l1 = playerLife;l2 = opponentLife;
		
		
		if(playerAction == "shoot"){b1 = 03;s1 = 00;}
		else if(playerAction == "block"){b1--;}
		else{b1 = 03;s1 = 01;}
		
		if(opponentAction == "shoot"){b2 = 03;s2 = 00;}
		else if(opponentAction == "block"){b2--;}
		else{b2 = 03;s2 = 01;}
		
			
		var current = (b1*1000)+(s1*100)+(b2*10)+s2;
		if(learnRes.has(current) == false)
			res.send("{\n\"action\": \""+hardRes.get(current)+"\"\n}");
		//res.send("test");
		
		else{
			if(hardRes.get(current) == "reload" && learnRes.get(current) == "shoot" && b1 > 0) 
				res.send("{\n\"action\": \""+"block"+"\"\n}");
			else if(hardRes.get(current) == "shoot" && learnRes.get(current) == "block" && b1 > 0) 
			    res.send("{\n\"action\": \""+"block"+"\"\n}");				
			else if(hardRes.get(current) == "block" && learnRes.get(current) == "block" && s1 == 0) 
				res.send("{\n\"action\": \""+"reload"+"\"\n}");	
			else
				res.send("{\n\"action\": \""+hardRes.get(current)+"\"\n}");
		}
	}	
		
	
	
	 
});



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});