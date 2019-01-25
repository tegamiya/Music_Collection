//水ゆらゆら
$(function(){
	let $hoge = $('.hoge');
	$hoge.ripples({
		resolution: 400,
		dropRadius: 25,
		perturbance: 0.05
	});
});

//砂文字

(function(){
	var Part = function(x,y){
		this.x = x;
		this.y = y;
		this.bx = x;
		this.by = y;
		this.ax = 0;
		this.ay = 0;
		this.r;
		this.g;
		this.b;
		this.a;
	};
	Part.prototype = {
		r : function (v) { this.r = v;return this; },
		g : function (v) { this.g = v;return this; },
		b : function (v) { this.b = v;return this; },
		a : function (v) { this.a = v;return this; },
	};
	var String = function(str){
		this.fontSize = 10;
		this.font = 'Elsie Swash Caps';
		this.str = str;
		this.strWidth;
		this.d = document;
		this.c;
		this.$;
		this.parr = [];
		this.set();
	};
	String.prototype = {
		set : function(){
			var c = this.d.createElement('canvas');
			var $ = c.getContext('2d');
			$.strokeStyle = '#EAE2CF';
			$.textBaseline = 'top';
			$.font =  '25px Elsie Swash Caps';
			c.width = $.measureText(this.str).width;
			this.strWidth = c.width;
			c.height = ~~(25 * 1.2);
			$.strokeStyle = '#EAE2CF';
			$.textBaseline = 'top';
			$.font = '25px Elsie Swash Caps';
			$.fillText(this.str,0,0);
			this.c = c;
			this.$ = $;
		},
		app : function(e){
			e.appendChild(this.c);
			this.build();
			this.ev();
			return this;
		},
		el : function(){
			return this.c;
		},
		build : function(){
			var w = this.c.width,
				h = this.c.height,
				id =  this.$.getImageData(0,0,w,h).data,
				l = id.length
			;
			for(var i=0;i<l;i+=4){
				var y = ~~(i / (w*4));
				var x = (i/4)%w;
				var r = id[i];
				var g = id[i+1];
				var b = id[i+2];
				var a = id[i+3];
				if (r+g+b<100 && a>50){
					this.parr.push( (new Part(x,y)).r(r).g(g).b(b).a(a) );
				}
			}
		},
		ev : function(){
			var _this = this;
			this.c.onmouseover = function(){
				var __t = setInterval(_this.func(_this,_this.anim),50);
				setTimeout(function(){
					clearInterval(__t);
					var cnt = 30;
					var time = setInterval(function(){
						cnt--;
						for(var i=0,l=_this.parr.length;i<l;i++){
							var p=_this.parr[i];
							p.x = p.bx;
							p.y = p.by + ((_this.fontSize-p.by) * (cnt) / 10);
						}
						_this._draw(_this.parr);
						if (cnt<=0) {
							_this.$.clearRect(0,0,_this.c.width,_this.c.height);
							_this.def(_this.parr);
							_this._draw(_this.parr);
							clearInterval(time);
						}
					},30);
				},3000);
			};
		},
		func : function(thisFunc,func){
			return function(){
				func.call(thisFunc);
			};
		},
		anim : function(){
			this._move(this.parr);
			this._draw(this.parr);
		},
		_draw : function(parr){
				this.$.fillStyle = '#FFF';
				this.$.fillRect(0,0,this.c.width,this.c.height);
			for(var i=0,l=parr.length;i<l;i++){
				var p=parr[i],x=~~p.x,y=~~p.y;
				this.$.fillStyle = '#BC8F8F';
				this.$.fillRect(x,y,1,1);
			}
		},
		_move : function(parr){
			for(var i=0,l=parr.length;i<l;i++){
				var p=parr[i];
				p.ax == 0 ? p.ax = 0.2*(Math.random()-0.5) : p.ax *= 1.1;
				p.ay == 0 ? p.ay = (Math.random()) : p.ay *= 1.1;
				p.x += p.ax;
				p.y += p.ay;
			}
		},
		def : function(parr){
			for(var i=0,l=parr.length;i<l;i++){
				var p=parr[i];
				p.x = p.bx;
				p.y = p.by;
				p.ax = p.ay = 0;
			}
		}
	};
	//h4のタグのものが砂文字変換
	setTimeout(function(){
		var loc = document.querySelectorAll('h5');
		var start = (new Date().getTime())/1000;
		Array.prototype.map.call(loc,function(e){
			if ((new Date().getTime())/1000 > start+5) return;
			var nodes = Array.prototype.slice.call(e.childNodes);
			nodes.map(function(n){
				if ((new Date().getTime())/1000 > start+5) return;
				if (n instanceof Text){
					var id = n.textContent || n.id;
					var frag = document.createDocumentFragment();
					id.split('').map(function(str){
						if(str==='' || str==='\n' || str==='\r' || str==='\t')return;
						(new String(str)).app(frag).el().style.verticalAlign = 'top';
					});
					e.replaceChild( frag , n );
				}
			});
		});
	},0);

})();




//斜め
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
	$(".diagonal-bg svg line").attr("stroke-width",  (( scroll/10)  + "%"));
});


var $svg = $('svg').drawsvg({
      duration: 5000,
      easing: 'linear'
    });


$svg.drawsvg('animate');



require.config({
	baseUrl: "../dist",
	paths: {
		'skrollr' : "skrollr.min"
	},
	waitSeconds: 15
});



require(['skrollr'], function(skrollr){
	var s = skrollr.init({
		edgeStrategy: 'set',
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
			}
		}
	});
});
