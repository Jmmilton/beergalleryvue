<template>
  <div class="log-beer-container">
    <div class="log-beer-header">
      <h1>Log a {{ beerVariant === "log-brew" ? "Brew" : "Tasting" }}</h1>
    </div>

    <form @submit.prevent="submitForm" class="log-beer-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="name">Beer Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            name="name"
            placeholder="e.g. West Coast IPA"
            required
          />
        </div>

        <div class="form-group">
          <label for="style">Style</label>
          <input
            v-model="style"
            type="text"
            id="style"
            name="style"
            placeholder="e.g. IPA, Stout, Lager"
          />
        </div>

        <div class="form-group">
          <label for="abv">ABV</label>
          <input
            v-model="abv"
            type="number"
            id="abv"
            name="abv"
            min="0"
            max="20"
            step="0.1"
            placeholder="5.2"
          />
        </div>

        <div class="form-group">
          <label for="rating">Rating</label>
          <div class="rating-input">
            <i class="fa-solid fa-star rating-star"></i>
            <input
              v-model="rating"
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              placeholder="4.5"
            />
          </div>
        </div>
      </div>

      <div v-if="beerVariant === 'log-tasting'" class="variant-section tasting">
        <h3>Where'd you try it?</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="date-tasted">Date Tasted</label>
            <input
              v-model="date_tasted"
              type="date"
              id="date-tasted"
              name="date-tasted"
              required
            />
          </div>
          <div class="form-group full-width">
            <label for="location">Location</label>
            <input
              v-model="location"
              type="text"
              id="location"
              name="location"
              placeholder="e.g. Great Lakes Brewing, Toronto"
            />
          </div>
        </div>
      </div>

      <div v-if="beerVariant === 'log-brew'" class="variant-section brewing">
        <h3>Brew Details</h3>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="date-brewed">Date Brewed</label>
            <input
              v-model="date_brewed"
              type="date"
              id="date-brewed"
              name="date-brewed"
              required
            />
          </div>
          <div class="form-group full-width">
            <label for="brewing-notes">Brewing Notes</label>
            <textarea
              v-model="brewing_notes"
              id="brewing-notes"
              name="brewing-notes"
              rows="3"
              placeholder="Mash temp, hop additions, fermentation notes..."
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">Tasting Notes</label>
        <textarea
          v-model="description"
          id="description"
          name="description"
          rows="3"
          placeholder="Appearance, aroma, flavor, mouthfeel..."
        ></textarea>
      </div>

      <div class="form-group image-upload">
        <label for="image">
          <i class="fa-solid fa-camera"></i>
          Beer Photo
        </label>
        <input
          @change="handleImageUpload"
          type="file"
          id="image"
          name="image"
          accept="image/*"
        />
        <p v-if="imageUploadError" class="image-upload-error">
          Please upload a beer photo
        </p>
      </div>

      <p v-if="successMessage" class="success-message">
        {{ successMessage }}
      </p>

      <button type="submit" class="submit-button">
        <i class="fa-solid fa-beer-mug-empty"></i>
        Save {{ beerVariant === "log-brew" ? "Brew" : "Tasting" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, nextTick } from "vue";

const props = defineProps({
  beerVariant: { type: String, required: true },
});

const name = ref("");
const style = ref("");
const abv = ref("");
const rating = ref("");
const date_tasted = ref("");
const location = ref("");
const date_brewed = ref("");
const brewing_notes = ref("");
const description = ref("");
const image = ref(null);
const fileInput = ref(null);
const imageUploadError = ref(false);
const successMessage = ref("");
const postVariant = computed(() =>
  props.beerVariant === "log-brew" ? "homebrew" : "tasted"
);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    imageUploadError.value = false;
    image.value = file;
  } else {
    imageUploadError.value = true;
    image.value = null;
  }
};

const submitForm = async () => {
  imageUploadError.value = false;

  if (!name.value.trim()) {
    alert("Beer name is required!");
    return;
  }

  if (!image.value) {
    imageUploadError.value = true;
    return;
  }

  const formData = new FormData();

  formData.append("beer[title]", name.value.trim());
  formData.append(
    "beer[beer_type]",
    props.beerVariant === "log-brew" ? "homebrew" : "tasted"
  );
  formData.append("beer[style]", style.value.trim());
  formData.append("beer[abv]", abv.value || "");
  formData.append("beer[rating]", rating.value || "");
  formData.append("beer[description]", description.value.trim());

  if (props.beerVariant === "log-tasting") {
    formData.append("beer[date_tasted]", date_tasted.value);
    formData.append("beer[location]", location.value.trim());
  } else if (props.beerVariant === "log-brew") {
    formData.append("beer[date_brewed]", date_brewed.value);
    formData.append("beer[brewing_notes]", brewing_notes.value.trim());
  }

  if (image.value) {
    formData.append("beer[beer_image]", image.value);
  }

  try {
    console.log("Sending:", Object.fromEntries(formData));
    const response = await axios.post(
      `http://localhost:3000/save-beer/${postVariant.value}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Success:", response.data);
    successMessage.value = "🍻 Beer logged successfully 🍻";
    name.value = style.value = description.value = "";
    abv.value = rating.value = "";
    image.value = null;
    await nextTick();
    fileInput.value?.reset();
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
</script>

<style lang="scss">
.log-beer-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.log-beer-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 6px 10px -2px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0 0 0.5rem 0;
    color: #1e293b;
    font-size: 2rem;
    font-weight: 700;
  }

  .header-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    &.log-brew {
      background: linear-gradient(45deg, #f59e0b, #d97706);
      color: #fff;
    }

    &.log-tasting {
      background: linear-gradient(45deg, #334155, #1e293b);
      color: #fff;
    }
  }
}

.log-beer-form {
  background: #fff;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  input,
  textarea {
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #d97706;
      box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    width: 60px;
    text-align: center;
  }
}

.rating-star {
  color: #fbbf24;
  font-size: 1.2rem;
}

.variant-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid;

  &.tasting {
    border-left-color: #334155;
  }

  &.brewing {
    border-left-color: #d97706;
  }

  h3 {
    margin: 0 0 1rem 0;
    color: #1e293b;
    font-size: 1.1rem;
    font-weight: 600;
  }
}

.image-upload-error {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.image-upload {
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    background: #f1f5f9;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    transition: all 0.2s ease;
    text-align: center;

    &:hover {
      background: #e2e8f0;
      border-color: #94a3b8;
    }
  }

  input[type="file"] {
    display: none;
  }
}

.success-message {
  color: #16a34a;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.submit-button {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #d97706, #f59e0b);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 15px -3px rgba(124, 45, 18, 0.4);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px -3px rgba(124, 45, 18, 0.5);
  }

  &:active {
    transform: translateY(0);
  }
}

@media (max-width: 580px) {
  .log-beer-container {
    margin: 1rem auto;
    padding: 0 0.5rem;
  }

  .log-beer-form {
    padding: 1.5rem;
  }
}
</style>
