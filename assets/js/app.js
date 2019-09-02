$(document).ready(function() {

	var $foot = $('#foot');
	var year = new Date().getFullYear();
	$foot.append(year);


	//Flip animation for images
	$(".card").flip({
	  axis: 'x',
	  trigger: 'hover'
	});



/*var createPost = document.getElementById('createPost');
var editPost = document.getElementById('editPost');

var blogForm = document.getElementById('blogForm');
var editBlog = document.getElementById('editBlog');

editBlog.style.display = "none";


function showEditPost(){
	blogForm.style.display = "none";
	editBlog.style.display = "block";
}

function showCreatePost(){
	editBlog.style.display = "none";
	blogForm.style.display = "block";
}
editPost.addEventListener('click', showEditPost, false );
createPost.addEventListener('click', showCreatePost, false );*/



});

