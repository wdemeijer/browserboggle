function BStone(sides) {
	this.sides = sides;
	this.location;
	this.init();
}

BStone.prototype = {
	init: function() {
		console.log("New stone!");
		$.each(this.sides, function(id, side) { console.log("Stone has: "+side)});
	},
	set_location: function(x,y) {
		console.log("Stone location: x: "+x+" y: "+y+"");
		this.location = {x: x, y: y};
	},
	show: function(element)  {
		container_height = 500;
		stone_size = container_height/4 - 5;
		x_position = (stone_size + 5) * this.location.x;
		y_position = (stone_size + 5) * this.location.y;
        
        
		
		var letter = this.sides[Math.floor(Math.random()*6)];
        
        var rotation = Math.floor((Math.random()*3)+0) * 90;
		
		html = "<div class='boggle_stone' id='"+this.location.x+"-"+this.location.y+"' style='top:"+y_position+"px;left:"+x_position+"px; width: "+stone_size+"px; height:"+stone_size+"px;display:block;-webkit-transform:rotate("+rotation+"deg)'>"+letter+"</div>";
		console.log("drawing:"+html+" on element:"+element);
		$(element).append(html);
	}

}
BStone.prototype.constructor = BStone;

function BStoneManager(stones) {
	this.stones = stones;
}
BStoneManager.prototype = {
	show_stones: function(element) {
		this.stones.sort(function() { return 0.5 - Math.random() });
		console.log("Showing stones!");
		
		$(element).html("");
		var grid_width = 4;
		var grid_height = 4;
		var stone_number = 0 ;
		for(x = 0; x<grid_width; x++) {
			for(y = 0; y<grid_height; y++) {
				this.stones[stone_number].set_location(x, y);
				stone_number++;
			}
		}
		
		$.each(this.stones, function(id, stone) { 
			stone.show(element);
		});
	}
}
BStoneManager.prototype.constructor = BStoneManager;

function BBoard(stonemanager, timer) {
	this.timer = timer;
	this.stone_manager = stonemanager;
	this.init();
}

BBoard.prototype = {
	init: function() {
		console.log("Board initialized.");
		jQuery('#start_boggle_button').bind('click',{context: this} , this.start);
	},
	start: function(event) {
		var self = event.data.context;
		self.stone_manager.show_stones("#stone_container");
		self.timer.start("#stone_container");
		
		console.log("Start boggle!");
		
	}
}
BBoard.prototype.constructor = BBoard;

BTimer = function(container, countdown_container, start_time, countdown_time) {
	this.container  = container;
	this.countdown_container  = countdown_container;
	this.start_time = start_time;
	this.countdown_time = countdown_time;
	this.time;
	this.timeout;
}
BTimer.prototype = {
	start: function() {
		console.log("Timer started at "+this.start_time+".");
		$(this.container).html("Get ready!");
		this.time = this.countdown_time;
		var self = this;
		clearTimeout(this.timeout);
		this.count_countdown();
		$(this.countdown_container).css("background", "#FFFFFF");
		$(this.countdown_container).css("opacity", "1");
		$(this.countdown_container).css("display", "block");
		$(this.countdown_container).mouseover(function() {});
		$(this.countdown_container).mouseout(function() {});
		this.initialized = 1;
	},
	
	make_minutes: function(total_seconds) {
		var minutes = Math.floor(total_seconds/60);
		var seconds = total_seconds - (minutes*60);
		if(seconds <10) {
			seconds = "0"+seconds;
		}
		return {minutes: minutes, seconds: seconds};
	},
	
	count_main: function() {
		this.show_time();
		if(this.time > 0) {
			this.time--;
			var self = this;
			this.timeout = setTimeout(function() { self.count_main(); }, 1000);
		}
		else {
			console.log("animate");
			$(this.countdown_container).css("display", "block");
			$(this.countdown_container).animate({
				opacity: 1,
			  }, 250, function() {
				// Animation complete.
			  });
			  self = this;
			$(this.countdown_container).mouseover(function() { 
				$(self.countdown_container).css("opacity", "0");
			});
			$(this.countdown_container).mouseout(function() { 
				$(self.countdown_container).css("opacity", "1");
			});
			$(self.countdown_container).html("Stop writing!");
			$(self.container).html("");
			
		}
	},
	count_countdown: function () {
		this.show_countdown_time();
		console.log("show time:"+this.time);
		if(this.time > 0) {
			this.time--;
			var self = this;
			this.timeout = setTimeout(function() { self.count_countdown(); }, 1000);
		}
		else {
			var self = this;
			 $(this.countdown_container).animate({
				opacity: 0,
			  }, 1000, function() {
				$(self.countdown_container).css("display", "none");
				// Animation complete.
			  });
			this.time = this.start_time;
			this.count_main();
		}
	},
	
	show_countdown_time: function() {
		if(this.time <1) {
			show_time = "";
		}
		else {
			show_time = this.time;
		}
		$(this.countdown_container).html(show_time);
	},
	
	show_time: function() {
		current_time = this.make_minutes(this.time);
		$(this.container).html(current_time.minutes+":"+current_time.seconds);
	}
}
BTimer.prototype.constructor = BTimer;

$(document).ready(function() {
  console.log("Document ready.");
  var stones = new Array(
				  new BStone(new Array("N","S","T","E","D","O")),
				  new BStone(new Array("P","M","E","A","D","C")),
				  new BStone(new Array("O","B","Q","J","M","D")),
				  new BStone(new Array("A","R","M","S","I","I")),
				  new BStone(new Array("R","G","L","U","W","E")),
				  new BStone(new Array("G","U","Y","E","J","N")),
				  new BStone(new Array("N","T","U","E","P","L")),
				  new BStone(new Array("N","L","I","B","T","A")),
				  new BStone(new Array("E","F","H","S","E","I")),
				  new BStone(new Array("H","S","R","N","E","I")),
				  new BStone(new Array("K","X","I","R","F","A")),
				  new BStone(new Array("A","D","V","N","Z","E")),
				  new BStone(new Array("V","N","T","I","E","G")),
				  new BStone(new Array("R","A","E","S","H","C")),
				  new BStone(new Array("A","O","W","I","A","E")),
				  new BStone(new Array("N","E","T","Z","K","O"))
				);
  var stone_manager = new BStoneManager(stones);
  var timer = new BTimer("#timer_container","#countdown_container", 180, 3);
  var board = new BBoard(stone_manager, timer);
});