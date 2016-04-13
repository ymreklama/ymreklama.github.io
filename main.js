new Promise(function(resolve) {
	if (document.readyState === 'complete') {
		resolve();
	} else {
		window.onload = resolve;
	}
}).then(function() {
	return new Promise(function(resolve, reject) {
		VK.init({
			apiId: 5384604
		});

		VK.Auth.getLoginStatus(function(response) {
			if(response.session) {
				console.log(response.session);
				alert('твой id:' + response.session.mid);
			}
		});
	});
}).catch(function(e) {
});