<template>
  <div class="login-page">

    <div class="header">
      <h1 class="title">MyBrews</h1>
      <p class="subtitle">Welcome <span v-if="!newUser">Back</span> 🍺</p>
    </div>

    <div class="login-card">

      <div class="form-group">
        <label>Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@email.com"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <div v-if="!newUser" class="forgot">
        <a href="#">Forgot password?</a>
      </div>

      <button class="login-button" @click="login">
        {{ newUser ? 'Register' : 'Log In' }}
      </button>

      <p v-if="!newUser" class="signup">
        Don't have an account?
        <button @click="newUser = true">Create Account</button>
      </p>

      <p v-if="newUser" class="signup">
        Already have an account?
        <button @click="newUser = false">Log In</button>
      </p>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref("")
const password = ref("")
let newUser = ref(false)


async function login() {
  try {
    const response = await axios.post('/users', {
      user: { email: email.value, password: password.value }
    })
    const token = response.headers['authorization']
    localStorage.setItem('token', token)
    router.push('/')
  } catch (error) {
    console.error(error.response?.data)
  }
}
</script>

<style scoped>

.login-page {
  min-height: 100vh;
  background: #f3f4f6;
}


.header {
  background: linear-gradient(180deg,#d97706,#f59e0b);
  height: 260px;
  padding: 0px 25px 40px;
}

.title {
  color: white;
  font-size: 38px;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  color: white;
  margin-top: 8px;
  opacity: 0.9;
}


.login-card {
  background: white;
  width: 90%;
  max-width: 420px;
  margin: -80px auto 0;
  border-radius: 25px;
  padding: 30px;

  box-shadow:
    0 10px 25px rgba(0,0,0,0.1);
}


.form-group {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #374151;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #f59e0b;
}


.forgot {
  text-align: right;
  margin-bottom: 20px;
}

.forgot a {
  color: #f59e0b;
  font-size: 14px;
  text-decoration: none;
}


.login-button {
  width: 100%;
  padding: 14px;
  border-radius: 15px;
  border: none;

  background: linear-gradient(180deg,#d97706,#f59e0b);
  color: white;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.login-button:hover {
  opacity: 0.9;
}

.signup {
  text-align: center;
  margin-top: 20px;
  color: #6b7280;
}

.signup button {
  color: #f59e0b;
  font-weight: 600;
  text-decoration: none;
  border: none;
  background: none;
  padding: 0;
}

</style>