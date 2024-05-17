<template>
  <Message severity="secondary">
    <p>
      This practice tool was was inspired by my 'PERFECT PRACTICE COURSE'.
      <br />
      If you haven't gone through the course yet, I highly recommend that you
      give it a look at
      <a
        href="https://www.playbetterbanjo.com/perfect-practice-course"
        target="_blank"
        >Play Better Banjo</a
      >
      as it may provide you with some of the foundational knowledge and skills
      necessary to make the most of the app. <br />
    </p>
  </Message>
  <h1>Perfect Practice Optimizer</h1>
  <div class="home-container">
    <p>
      This app is designed to help you make your practice time more effective
      and efficient by providing you with the tools to create, store and
      reference your own personalized practice regimen.
    </p>
    <br />
    <p>
      You must be logged in to use the practice optimizer. If you haven't
      created an account yet, you can do so by clicking on the 'Register' link
      in the dropdown menu located in the upper righthand corner of the page:
    </p>
    <br />

    <img
      src="../assets/images/F90CFC11-C26B-4810-94B8-755E167B8C1A.jpeg"
      alt="screenshot of the drop down menu focused on register link"
    />
    <p>
      If you already have an account, you can log in by clicking on the 'Log In'
      link:
    </p>

    <img
      src="../assets/images/DE8FAAC0-6377-48AF-9F94-47B660F93FDE.jpeg"
      alt="screenshot of the drop down menu focused on login link"
    />
    <p>
      <br />
      Once you're signed up and logged in, it's time to get started. Navigate to
      the Goal Keeper page to create your first goal(s):
    </p>
    <br />
    <img
      src="../assets/images/A315BF4B-7369-45B7-926C-A0229F462C6B.jpeg"
      alt="screenshot of the drop down menu focused on goal keeper link"
    />
    <p>
      Next, it's time to organize and reverse engineer your goals into a
      practice regimen:
    </p>
    <img
      src="../assets/images/94622CF7-28C9-4D52-B12E-D8AF32402D1C.jpeg"
      alt="screenshot of the practice regimen page"
    />
    <br />
    <p>
      That should be enough to get you started. Best of luck in your banjo
      endeavors and happy practicing!
    </p>
  </div>
</template>

<script setup>
import Message from 'primevue/message'
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 2rem;
}

img {
  /* width: 100%; */
  max-height: 80%;
  width: 50%;
  margin: 1rem;
}

p {
  padding: 1rem;
}

a {
  color: var(--button-color-border);
}
</style>
