<template>
  <div id="app">
    <div id="nav">
      <div class="row" v-if="isLoggedIn">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
         | <button @click="logout">Logout</button>
      </div>
      <div class="row"  v-else>
      <span><router-link to="/login">Login</router-link> </span>
      <span> | <router-link to="/register">Register</router-link> </span>

      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
