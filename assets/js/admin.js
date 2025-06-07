window.addEventListener('DOMContentLoaded', function(event) {
	console.log("admin page");

	document.getElementById('submitBtn').addEventListener('click', function(e) {
		e.preventDefault();
			const titleVar = document.getElementById('postTitle').value;
			const bodyVar = document.getElementById('postBody').value;

		const authVar = document.getElementById('postAuth').value;
		console.log('title: ' + titleVar + '\nbody: ' + bodyVar + '\nauth: ' + authVar);
		savePost()
	});

	function savePost() {
		const titleVar = document.getElementById('postTitle').value;
		const bodyVar = document.getElementById('postBody').value;
		const authVar = document.getElementById('postAuth').value;

		fetch('/admin/blog-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({t: titleVar, a: authVar, v: bodyVar}),
		})//.then(response => response.text()).then(data => console.log(data));
	}
});