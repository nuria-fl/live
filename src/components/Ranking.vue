<template>
	<section class="Ranking">
		<h1 class="Ranking__title">HALL OF FAME</h1>
		<ul>
			<li v-if="loading">Loading...</li>
			<li v-for="item in ranking" v-else :key="item.id" class="Ranking__item">
				<span class="Ranking__user">
					{{ item.user }}
				</span>
				<span class="Ranking__days"> {{ item.days }} days </span>
			</li>
		</ul>
	</section>
</template>

<script lang="ts">
import gql from "graphql-tag";
import { defineComponent } from "vue";

import { apolloClient } from "../apollo";

export default defineComponent({
	data() {
		return {
			ranking: [],
			loading: true,
		};
	},
	mounted() {
		this.getRanking();
	},
	methods: {
		getRanking() {
			return apolloClient
				.query({
					query: gql`
						{
							scores {
								user
								days
								version
							}
						}
					`,
				})
				.then(({ data }) => {
					this.ranking = data.scores
						.sort((scoreA, scoreB) => scoreA.days - scoreB.days)
						.reverse()
						.slice(0, 10);
					this.loading = false;
				});
		},
	},
});
</script>

<style lang="scss">
.Ranking {
	width: 20em;
	max-width: 90%;
	margin: 2em auto 0;
	&__title {
		margin: 0;
		font-size: 1.2em;
	}
	&__item {
		display: flex;
		margin: 0;
		padding: 1em 0;
		text-align: left;
		border-bottom: 0.01em solid #ddd;
		&:first-child {
			margin-top: 1em;
			border-top: 0.01em solid #ddd;
		}
	}
	&__user {
		flex: 1 1 0;
		padding-right: 1em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__days {
		text-align: right;
	}
}
</style>
