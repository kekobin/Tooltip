;
(function(window, $) {
	var defaults = {
		position:'top',//默认弹窗的方向
		tooltipHover: false,//是否需要浮动到浮窗上去
		width: 200,
		height: 50,
		backgroundColor: '#f2f2f2',
		border:'1px solid #f2f2f2',
		borderRadius: 3
	};

	function Tootip(element, options) {
		this.$element = element;
		this.opts = $.extend(defaults, options);
	}

	$.extend(Tootip.prototype, {
		init: function() {
			var obj = this,
				$el = this.$element,
				opts = this.opts;

			if(opts.tooltipHover) {
				var hoverTimeout = null, leaveTimeout = null, mode = 'hide';

				$el.on('mouseover', function(e) {
					clearTimeout(hoverTimeout);
					clearTimeout(leaveTimeout);
					hoverTimeout = setTimeout(function() {
						obj.show();
					}, 150);
				}).on('mouseout', function(e) {
					clearTimeout(hoverTimeout);
					clearTimeout(leaveTimeout);
					leaveTimeout = setTimeout(function() {
						if(mode == 'hide') obj.hide();
					}, 200);

					obj.$hoverEl.on('mouseover', function(e) {
						mode = 'show';
					}).on('mouseout', function(e) {
						mode = 'hide';
						clearTimeout(leaveTimeout);
						leaveTimeout = setTimeout(function() {
							obj.hide();
						}, 200);
					});
				});
			} else {
				$el.on('mouseover', function(e) {
					obj.show();
				}).on('mouseout', function(e) {
					obj.hide();
				});
			}
		},
		show: function() {
			var obj = this,
				$el = this.$element;

			obj.$hoverEl = $('<div class="tooltip_wrap"></div>');
			obj.$hoverEl.html(obj.opts.content);
			obj.position();
			$('body').append(obj.$hoverEl);
		},
		hide: function() {
			var obj = this;
			if(obj.$hoverEl)
				obj.$hoverEl.remove();	
		},
		position: function() {
			var obj = this,
				$el = this.$element,
				opts = this.opts,
				hoverEl = this.$hoverEl, pos = {};

			if(opts.position == 'right') {
				pos.left = $el.offset().left + $el.outerWidth();
				pos.top = $el.offset().top + $el.outerHeight() / 2 - opts.height / 2;
			}

			$(hoverEl).css({
				width: 200,
				top: pos.top,
				left: pos.left,
				backgroundColor: opts.backgroundColor,
				border: opts.border,
				borderRadius: opts.borderRadius
			});
		}
	});

	window.Tootip = Tootip;
}(window, jQuery));