
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

	};

	// FDrop.mk_data_url(files[0], , cb)
	var mk_data_url = function(f, cb) {
		var reader = new FileReader();
		reader.onload = function() {
			var data = reader.result;
			cb(data);
		};
		reader.readAsDataURL(f);
	};

	FDrop = {
		attach: attach,
		mk_data_url: mk_data_url,
	}
	
})();

