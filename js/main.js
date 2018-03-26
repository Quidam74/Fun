


$('#zoneDeFun').css("height",window.innerHeight).css("width",window.innerHeight)

$.post("/getMap",function(data){
fullMap(data)
},"json");




$(document).ready(function(){
	$(document).keydown(function(e){
		
		switch (e.keyCode)
		{
			case 37:
			move(37 )
			break;

			case 38:
			move(38)
			break;

			case 39:
			move(39 )
			break;

			case 40:
			move(40)
			break;
		}


	});
});

function fullMap(data){

	$('#zoneDeFun').html("")
	for (var j = data.length - 1; j >= 0; j--) {
		for (var k = data[j].length - 1; k >= 0; k--) {
			var couleur
			if(data[j][k]==0)
				couleur ="blanc"
			if(data[j][k]==-1)
				couleur="noir"
			if(data[j][k]==1)
				couleur="rouge"
				if(data[j][k]==2)
				couleur="bleu"

			var elem = "<div class=\"carre "+couleur+"\"></div>"
			$('#zoneDeFun').prepend(elem)


		}
	}
}

function move(keyCode){



$.post("/move/"+keyCode+"/"+document.location.href[document.location.href.length-1],function(data){
	console.log(document.location.href[document.location.href.length-1])
fullMap(data)
},"json");

}


