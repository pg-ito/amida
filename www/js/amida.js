/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var amida = function(){
	this.cellMax = {w:1, h:10};// minimum (1,1)
	this.map = [];
	this.playlerColors = ['blue','red','green'];
	this.baseLineColor = 'base_black';
	this.targetElm = document.getElementById('amida_map_container');
	this.colNum = 0;
};


amida.prototype.generateMap = function(playerNum){
	this.cellMax.w = (playerNum * 2)-1;
	this.map = this._mapDataGen(this.cellMax.w, this.cellMax.h);
	this._baseGen(playerNum);
	this._branchGen();
};
amida.prototype._branchGen = function(){
	var blank = [];
	_.each(this.map, function(row){
		var filterdRow = _.filter(row,function(cell){
			return !cell.base;
		});
		blank.push(filterdRow);
	});
	var isEven = false;// previous branch exists

	_.each(blank, function(row){
		var count = 0;
		_.each(row, function(cell){
			if( (count%2==0)==isEven ) {
				++count;
				return null;
			}
			if ( Math.random()*10 < 7  ){
				cell.branch = true;
			}else{

			}
			++count;
		});
		isEven = !isEven;
	});
	console.log(blank);
	
};
amida.prototype._mapDataGen = function(w,h){
	var res = [];
	for(var x=0;x<w;++x){
		var row =[];
		for(var y=0;y<h;++y){
			row.push({x:x,y:y,base:false,tracer:[],branch:false,elm:null});
		}
		res.push(row);
	}
	return res;
};
amida.prototype._baseGen = function(playerNum){
	var isLine = true;// even or odd
	for(var x in this.map){
		if(isLine){
			this._colGen(this.map[x]);
		}
		isLine = !isLine;
	}
	
};

amida.prototype._colGen = function(col){
	if(!col){
		return false;
	}
	for(var i in col){
		col[i].base = true;
	}

	
};

amida.prototype.fullDraw = function(){
	var $container = $(this.targetElm);
	var $tbl = $('<table>');
	for(var y=0;y<this.cellMax.h;++y){
		var $tr = $('<tr>');

		for(var x=0;x<this.cellMax.w;++x){
			var $td = $('<td>');
			$td.addClass('cell');
			$td.attr('id',x+'_'+y);
			var cell = this.map[x][y];
			
			if(cell.base){
				$td.addClass('base lined');
			}
			if(cell.branch){
				$td.addClass('branch lined');
			}
			$tr.append($td);
		}
		$tbl.append($tr);
	}
	$container.append($tbl);
};
amida.prototype.trace = function(cellX, cellY){
	
};



