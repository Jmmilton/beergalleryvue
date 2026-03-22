<template>
  <div class="login-page">
    <div class="header">
      <h1 class="title">MyBrews</h1>
      <p class="subtitle">Welcome <span v-if="!newUser">Back</span> 🍺</p>
    </div>

    <div class="login-card">
      <form @submit.prevent="newUser ? register() : login()">
        <div class="form-group">
          <div v-if="confirmed" class="alert alert-success">
            Email confirmed! You can now log in.
          </div>
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>
        <div class="form-group" v-if="!isForgotPassword">
          <label>Password</label>
          <input
            ref="passwordInput"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div class="form-errors" v-if="error">
          {{ error }}
        </div>

        <div class="form-errors" v-if="message">
          {{ message }}
        </div>

        <button
          v-if="!newUser && !isForgotPassword"
          class="login-button"
          @click="login"
          type="submit"
          :class="{ 'is-logging-in': isAutoLogging }"
        >
          Log In
        </button>

        <button v-if="newUser" class="login-button" type="submit">
          Register
        </button>

        <button
          v-if="!newUser && isForgotPassword"
          class="login-button"
          @click="forgotPasswordSubmit"
          type="button"
        >
          {{ isButtonDisabled ? "Submitted" : "Submit" }}
        </button>

        <template v-if="!isForgotPassword">
          <p v-if="!newUser" class="signup">
            Don't have an account?
            <button @click="newUser = true">Create Account</button>
          </p>
          <p v-if="newUser" class="signup">
            Already have an account?
            <button @click="newUser = false">Log In</button>
          </p>
        </template>

        <p v-if="!newUser" class="signup forgot-password">
          <button
            v-if="!isForgotPassword"
            @click="forgotPasswordToggle"
            type="button"
          >
            Forgot Password?
          </button>
          <button
            v-if="isForgotPassword"
            @click="forgotPasswordToggle"
            type="button"
          >
            Go Back
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const email = ref("");
const password = ref("");
const error = ref("");
const message = ref("");
const isButtonDisabled = ref(false);
let isForgotPassword = ref(false);
let newUser = ref(false);
const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
const isAutoLogging = ref(false);
const confirmed = ref(false);
const passwordInput = ref(null);

async function login() {
  try {
    const response = await axios.post(
      "/users/sign_in",
      { user: { email: email.value, password: password.value } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email.value);
    if (email.value !== "demo@mybrews.app") {
      localStorage.setItem("isRealUser", "true");
    }
    router.push("/");
    if (isButtonDisabled.value) return;
  } catch (err) {
    console.log(err.response.data.error, "err");
    error.value = err.response?.data.error || "Something went wrong";
  }
}

async function register() {
  try {
    const response = await axios.post(
      "/users",
      { user: { email: email.value, password: password.value } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    const token = response.headers["authorization"];
    localStorage.setItem("token", token);
    router.push("/");
    if (isButtonDisabled.value) return;
  } catch (err) {
    error.value = err.response?.data.error || "Something went wrong";
  }
}

function forgotPasswordToggle() {
  isForgotPassword.value = !isForgotPassword.value;
}

async function forgotPasswordSubmit() {
  try {
    await axios.post(
      "/users/password",
      { user: { email: email.value } },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    message.value = "Check your email for reset instructions";

    if (isButtonDisabled.value) return;
  } catch (err) {
    error.value = err.response?.data?.error || "Something went wrong";
  }
}

async function flashCursor(target, times = 2) {
  for (let i = 0; i < times; i++) {
    target.value = "|";
    await new Promise((resolve) => setTimeout(resolve, 400));
    target.value = "";
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
}

async function typeText(target, text, minSpeed = 60, maxSpeed = 150) {
  for (const char of text) {
    target.value += char;
    // Random delay between each character
    const delay = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Occasionally add a longer pause as if thinking
    if (Math.random() < 0.1) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
}

onMounted(async () => {
  const token = localStorage.getItem("token");
  const isRealUser = localStorage.getItem("isRealUser");

  if (window.location.href.includes("reset_password_token")) return;
  if (window.location.href.includes("confirmation_token")) return;

  if (route.query.email) {
    email.value = decodeURIComponent(route.query.email);
    confirmed.value = true;
    await new Promise((resolve) => setTimeout(resolve, 50));
    passwordInput.value?.focus();
    return;
  }

  if (token && token !== "undefined" && isRealUser) {
    router.push("/");
    return;
  }

  if (isRealUser) return;

  await new Promise((resolve) => setTimeout(resolve, 800));
  await flashCursor(email);

  await typeText(email, demoEmail);
  await new Promise((resolve) => setTimeout(resolve, 200));
  await typeText(password, demoPassword, 60);
  await new Promise((resolve) => setTimeout(resolve, 600));

  isAutoLogging.value = true;
  await new Promise((resolve) => setTimeout(resolve, 250));
  isAutoLogging.value = false;
  await new Promise((resolve) => setTimeout(resolve, 250));
  await login();
});
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f3f4f6;
}

.header {
  background: linear-gradient(180deg, #d97706, #f59e0b);
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

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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

.forgot-password {
  font-size: 14px;
}

.login-button {
  width: 100%;
  padding: 14px;
  border-radius: 15px;
  border: none;

  background: linear-gradient(180deg, #d97706, #f59e0b);
  color: white;

  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.login-button:hover {
  opacity: 0.9;
}

.login-button {
  transition: all 0.15s ease;
}

.login-button.is-logging-in {
  background: #d97706;
  transform: scale(0.95);
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
