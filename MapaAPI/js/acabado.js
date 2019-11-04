function fCidade() {
	var cidade = document.getElementById("campo").value;
	return cidade;

}

var resposta
function dados() {
	//fazendo a requisição
	var requisicao = new XMLHttpRequest();
	var url = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+ fCidade() +".json?access_token=pk.eyJ1IjoibGF1cmluZWEiLCJhIjoiY2sxaHI2M3J2MWk3bjNncW93a2ZneTIyMSJ9.IsCqY34SiFRNoGtHLTnEtQ"
    requisicao.open('GET', url, true); //abrindo a conexão

    requisicao.onreadystatechange = function(e) {
    	if (this.readyState == 4) {
    	//	console.log(JSON.parse(this.response)); 
    		resposta = JSON.parse(this.response);
    		valor(); 
    	}
    }
    requisicao.send();
}

function valor() {

	var recebe = resposta.features.length;
		
		for (let i=0; i< recebe; i++) {
		/*	var place = resposta.features[i].place_name;
			var lat = resposta.features[i].center[1];
			var long = resposta.features[i].center[0];
			inserirItem(place, i,lat, long);*/ 
			inserirItem(resposta.features[i].place_name , i, resposta.features[i].geometry.coordinates[1] ,  resposta.features[i].geometry.coordinates[0]);	
	//console.log(lat+", "+ long);	
		}
	}




function create(){
	var info = document.createElement('div');
	info.setAttribute('id', 'info');
	var ol = document.createElement('ol');
	ol.setAttribute('id', 'lista'); 
	document.getElementById('principal').appendChild(info);
	document.getElementById('info').appendChild(ol);
	
}

	function inserirItem(nome_do_item, id, lt,lg){
		
		var coord = String(lt) + ','+ String(lg);
		var local = nome_do_item;
		var map = 'gerarMapa(' + coord +')';

		var nova_li = document.createElement('li');
		nova_li.setAttribute('id', id);
		
		var nova_link = document.createElement('a');
		nova_link.setAttribute('href', '#');
		nova_link.setAttribute('onclick', map);
		//nova_link.style.backgroundColor = "red";
		var texto = document.createTextNode(nome_do_item);
		//console.log(texto);
		nova_link.appendChild(texto);
	
		nova_li.appendChild(nova_link); 
	
		document.getElementById('lista').appendChild(nova_li);
		
	}




function Mapa(){

	var mapinha = document.createElement('div');
	mapinha.setAttribute('id', 'mapid');
	mapinha.style.width = "100%";
	mapinha.style.height = "600px";
	
	document.getElementById('MapaCentral').appendChild(mapinha); 
}
const clear = () => {
	document.getElementById('principal').innerHTML = " ";
} 
const limparMapa = () => {
	document.getElementById('MapaCentral').innerHTML = " ";
}


const gerarMapa = (lat, long) => {
	limparMapa();
	Mapa();

	var mymap = L.map('mapid').setView([ lat, long], 15);
    
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

    
	L.marker([lat, long]).addTo(mymap)
		.bindPopup("<b>Seja Bem vindo!</b><br />Você está no mundo de Jack.").openPopup();
    
	L.circle([lat, long], 400, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("this is a circle! BIOS");

}

function main() {
	
	clear();
	
	create();
	dados();
	//inserirItem();
	limparMapa();
}