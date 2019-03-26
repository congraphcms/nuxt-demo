
const postModel = {
	props: {
		post: {
			type: Object
		}
	},
	computed: {
		cPost() {
			if(this.post) {
				return this.post
			}

			return this.model
		},
    postUrl() {
			return this.cPost.url
		},
		parent() {
			return this.cPost.parent
		},
		title() {
			return this.cPost.fields.title
		},
		hasCoverImage() {
      return 'cover_image' in this.cPost.fields
        && 'url' in this.cPost.fields.cover_image
		},
		coverImage() {
      if (this.hasCoverImage) {
        let imageUrl = this.cPost.fields.cover_image.url
        return this.$options.filters.fileApi(imageUrl)
      }

			// @TODO placeholder image
			return 'https://via.placeholder.com/600x450.jpg?text=Placeholder%20Image'
		},
    content() {
      return this.cPost.fields.content
    }
	}
}

export default postModel
