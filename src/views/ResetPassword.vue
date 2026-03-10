<template>
  <div class="login-page">

    <div class="header">
      <h1 class="title">MyBrews</h1>
      <p class="subtitle">Welcome <span v-if="!newUser">Back</span> 🍺</p>
    </div>

    <div class="login-card">

      <form @submit.prevent="login">
        
        <div class="form-group">
          <label>New Password</label>
          <input v-model="password" type="password" placeholder="New password" required />
          <input class="mt-3" v-model="passwordConfirmation" type="password" placeholder="Confirm password" required />
          <p v-if="error" class="text-red-500">{{ error }}</p>
          <p v-if="message" class="text-green-500">{{ message }}</p>
        </div>

        <div class="form-errors" v-if="error">
          {{ error }}
        </div>

        <button v-if="!newUser" class="login-button" @click="resetPassword" type="submit">
          Save
        </button>

      </form>


    </div>

  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password = ref("")
const passwordConfirmation = ref("")
const error = ref("")
const message = ref("")

const token = route.query.reset_password_token


async function resetPassword() {
  try {
    await axios.put('/users/password', 
      { user: { reset_password_token: token, password: password.value, password_confirmation: passwordConfirmation.value } },
      { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } 
    })

    message.value = "Password updated! Redirecting to login..."
    setTimeout(() => router.push('/login'), 2000)
  } catch (err) {
    error.value = err.response?.data?.errors?.join(', ') || "Something went wrong"
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

.form-errors {
  justify-content: center;
  display: flex;
  padding: 10px 0 10px 0px;
  font-size: 14px;
  color: #e02121;
}
</style>