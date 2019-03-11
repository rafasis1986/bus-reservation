<template>
	<nav class="navbar navbar-expand navbar-dark bg-primary">
		<div class="row">
			<div class="col-2">
				<span class="navbar-brand">
					<button class="btn btn-primary" 
							style="margin-left: -1em;
									margin-right: 0em;"
							@click="setShowSidebar(!getSidebar)">
						<Octicon icon="three-bars"
								style="cursor: pointer"
								:width="18"/>
					</button>
                    Bus reservation
				</span>
			</div>
			<div class="col-8">
				<ul class="navbar-nav">
					<li
						class="nav-item"
						v-for="item of getSubsections($route.meta.root)"
						:key="item.name">
						<router-link
							class="nav-link"
							active-class="active"
							:to="{name: item.name}">
							{{ item.title }}</router-link>
					</li>
				</ul>
			</div>
			<div class="col-1">
				<button
					class="btn btn-outline-light"
					@click="logout">Logout</button>
			</div>
			
		</div>
	</nav>
</template>

<script>
import Octicon from "@/components/Octicon";

import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapMutations } = createNamespacedHelpers("menu");
const { mapActions } = createNamespacedHelpers("user");

export default {
	name: "Navbar",
	components: {
		Octicon
		
	},
	data() {
		return {
			formSuccess: false
		};
	},
	computed: {
		...mapGetters(['getSubsections', 'getSidebar'])
		
	},
	methods: {
		...mapActions(["logout"]),
		...mapMutations(['setShowSidebar']),
		
	}
};
</script>

<style scoped lang="scss">
.navbar {
	.row {
		width: 100%;
	}

	li {
		margin-right: 1rem;
	}

	.active {
		font-weight: 500;
	}
}

</style>