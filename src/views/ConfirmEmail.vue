<template>
  <div class="login-page">
    <div class="header">
      <h1 class="title">MyBrews</h1>
      <p class="subtitle">Welcome <span v-if="!newUser">Back</span> 🍺</p>
    </div>

    <div class="login-card">
      <div class="login-card">
        <p>{{ message }}</p>

        <p>
          If you are not redirected after 5 seconds, please
          <a href="/login">click here</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const message = ref("Confirming your account...");

onMounted(async () => {
  try {
    await axios.get(
      `/users/confirmation?confirmation_token=${route.query.confirmation_token}`,
    );
    message.value = "Account confirmed! Redirecting to login...";
    setTimeout(() => router.push("/login?confirmed=true"), 2000);
  } catch (err) {
    message.value = "Confirmation failed. The link may have expired.";
  }
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
