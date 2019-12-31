<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <div>
            <label for="email">Email</label><br/>
                <input required v-model="email" type="email" placeholder="Email">
            </div>
            <div>
            <label for="password">Password</label><br/>
                <input required v-model="password" type="password" placeholder="Password">
            </div>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return { email: "", password: "" };
  },
  methods: {
    login: () => {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>
