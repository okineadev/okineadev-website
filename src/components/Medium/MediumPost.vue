<script setup lang="ts">
defineProps<{
	link: string
	titleId: string
	imageWebp: string
	imageJpg: string
	imageAlt: string
	title: string
	description: string
}>()
</script>

<template>
	<a class="post" :href="link" role="article" :aria-labelledby="titleId">
		<i-octicon-link-external-16 class="open"/>
		<picture>
			<source :srcset="imageWebp" type="image/webp" />
			<source :srcset="imageJpg" type="image/jpg" />
			<img :src="imageJpg" :alt="imageAlt" />
		</picture>
		<div class="info">
			<h2 :id="titleId">{{ title }}</h2>
			<p>{{ description }}</p>
		</div>
	</a>
</template>

<style lang="scss" scoped>
.post {
	border-radius: 20px;
	box-shadow: 0 4px 6px #0000001a;

	cursor: pointer;

	width: 100%;
	height: 300px;
	min-width: 300px;
	max-width: 100%;

	user-select: none;

	position: relative;
	overflow: hidden;

	flex: 1 1 300px;

	@media (prefers-reduced-motion: no-preference) {
		transition: transform 0.3s ease-in-out;
	}

	.icon.open {
		position: absolute;
		top: 20px;

		right: 20px;
		width: 25px;
		height: 25px;

		transition: opacity 0.3s ease-in-out;
		opacity: 0;

		fill: white;
	}

	img {
		border-radius: inherit;
		height: 100%;

		width: 100%;
		object-fit: cover; // Ensure the image is covered without stretching
	}

	.info {
		position: absolute;

		right: 0;
		left: 0;
		bottom: 0;

		user-select: text;

		border-bottom-left-radius: inherit;
		border-bottom-right-radius: inherit;

		backdrop-filter: blur(5px);
		padding: 20px;
		overflow: hidden;

		transition: opacity 0.3s ease-out;
		box-shadow: 0 -4px 20px 0px #0000001a;

		text-wrap-mode: wrap;

		&::before {
			content: '';
			position: absolute;

			top: 0;
			left: 0;

			width: 100%;
			height: 100%;

			z-index: -1;
			opacity: 0.2;
		}

		h2,
		p {
			text-shadow: 2px 2px 20px #0000005e;
		}

		h2 {
			color: var(--medium-post-title-color);
			margin-top: 5px;
		}

		p {
			margin-block: 10px;
			font-size: 17px;

			color: var(--medium-post-caption-color);
		}
	}

	&:hover {
		transform: scale(1.05);

		.icon.open {
			opacity: 1;
		}
	}
}
</style>
