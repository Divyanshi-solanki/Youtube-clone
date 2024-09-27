document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment').value;
    if (commentText) {
        const commentContainer = document.getElementById('comments-container');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        
        const commentContent = document.createElement('span');
        commentContent.textContent = commentText;
        
        const likeButton = document.createElement('span');
        likeButton.classList.add('like-button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', function() {
            likeButton.classList.toggle('liked');
            likeButton.textContent = likeButton.classList.contains('liked') ? 'Liked' : 'Like';
        });

        newComment.appendChild(commentContent);
        newComment.appendChild(likeButton);
        commentContainer.appendChild(newComment);
        
        document.getElementById('comment').value = '';
    }
});

document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});

			rating.classList.add("post-rating-selected");

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
			const body = await response.json();
		});
	});
});
