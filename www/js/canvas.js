var Canvas = function(id, width, height){
	this.context = document.getElementById(id).getContext("2d");
	this.context.canvas.width = width;
	this.context.canvas.height = height;	
};

Canvas.prototype.DrawText = function(t,  x, y, s, a){
	this.context.fillStyle = '#ffffff';
	this.context.textAlign=a; 
	this.context.font = "bold " + s + "px GameFont";
	this.context.fillText(t, x, y);
};

Canvas.prototype.DrawRect = function(x, y, w, h, fs, ss, lw){
	this.context.beginPath();
	this.context.fillStyle = fs;
	this.context.rect(x, y, w, h); 
	this.context.fill();	

	if (lw !== undefined && ss !== undefined){
		this.context.lineWidth=lw;
		this.context.strokeStyle=ss;				
		this.context.stroke();				
	}
};

Canvas.prototype.DrawPolyLine = function(data, x, y, s){
	this.context.strokeStyle = '#ffffff';
	this.context.lineWidth="2";
	this.context.beginPath();
	this.context.moveTo(x + data[0].x * s , y + data[0].y * s);
	for (var i = 1; i < data.length; i++) {
		this.context.lineTo(x + data[i].x * s , y + data[i].y * s);
	}
	this.context.lineTo(x + data[0].x * s , y + data[0].y * s);
	this.context.stroke();
}
