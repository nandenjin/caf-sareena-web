<template>
  <header>
    <div class="text-container">
      <h1>
        <img
          src="@/assets/design/title.svg"
          alt="スペクトルの彼方で | サリーナサッタポン / THE REALM BEYOND SPECTRUM | SAREENA SATTAPON"
          class="logo"
        />
      </h1>
      <p>
        <img
          src="@/assets/design/info.svg"
          alt="23 MARCH - 25 MAY 2024, 12:00-19:00 / OPEN THURSDAY, FRIDAY AND SATURDAY / CONTEMPORARY ART FOUNDATION - 4F PIRAMIDE BLDG., 6-6-9 ROPPONGI, MINATO-KU, TOKYO 106-0032"
          class="info"
        />
      </p>
      <a href="https://gendai-art.org/" class="caf-logo"
        ><img
          src="@/assets/design/caf-logo.svg"
          alt="Contemporary Art Foundation"
      /></a>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 100vh;
}
.text-container {
  max-width: 575px;
  margin: var(--margin-page);

  .logo {
    width: 100%;
  }

  .info {
    width: 95%;
  }

  .caf-logo {
    position: fixed;
    top: var(--margin-page);
    right: var(--margin-page);
    width: 5rem;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  @media screen and (max-width: 768px) {
    width: 70%;

    .caf-logo {
      position: static;
      width: 3rem;
    }
  }
}
</style>
