
(function() {

	var attach = function(element, cb) {

		var style = element.style
		var old_opacity = style.opacity

		element.ondragenter = function(evt) {
			style.opacity = "0.5";
		}
		element.ondragleave = function(evt) {
			style.opacity = old_opacity;
		}

		// for drag/drop to work, element MUST have ondragover AND ondrop defined 
		element.ondragover = function(evt) {
			evt.preventDefault();			// required: ondragover MUST call this.
		}
		element.ondrop = function(evt) {
			evt.preventDefault();			// required
			style.opacity = old_opacity;	// because ondragleave not called on drop (chrome at least)
			var files = evt.dataTransfer.files
			cb(files, evt);
		}

	}

	FDrop = {
		attach: attach,
	}
	
})();

