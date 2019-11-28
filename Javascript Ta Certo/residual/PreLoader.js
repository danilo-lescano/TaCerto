TaCerto.PreLoader = {
	preLoad: function() {
		if (document.images) {
			var img1 = new Image();

			img1.src = "https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg";
		}
	},
	addLoadEvent: function() {
		var oldonload = window.onload;
		if (typeof window.onload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				if (oldonload) {
					oldonload();
				}
				this.preLoad();
			}
		}
	}
};