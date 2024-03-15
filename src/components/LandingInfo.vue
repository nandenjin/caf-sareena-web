<template>
  <section>
    <div class="text-column">
      <div class="container">
        <h2 class="headline">
          <div class="headline__en-container">
            <img
              src="@/assets/design/title-mini-en-0.svg"
              alt="IN THE REALM "
              class="logo"
              style="max-width: 72%; margin-right: 1rem"
            />
            <img
              src="@/assets/design/title-mini-en-1.svg"
              alt="BEYOND SPECTRUM"
              class="logo"
              style="max-width: 100%"
            />
          </div>
          <img
            src="@/assets/design/title-mini-ja.svg"
            alt="スペクトルの彼方で"
            class="logo"
            style="max-width: 90%"
          />
        </h2>
        <table class="font-gothic">
          <tbody>
            <tr>
              <th>アーティスト</th>
              <td><u>サリーナ・サッタポン</u></td>
            </tr>
            <tr>
              <th>会期</th>
              <td>
                2024年3月23日[土] - 5月25日[土]<br />木–土曜日
                開廊｜日–水曜日、祝日 休廊
              </td>
            </tr>
            <tr>
              <th>時間</th>
              <td>12:00–19:00</td>
            </tr>
            <tr>
              <th>アクセス</th>
              <td>
                <u>東京都港区六本木6-6-9 ピラミデビル4F</u><br />Piramide Bldg.,
                4F 6-6-9 Roppongi, Minato-ku Tokyo
              </td>
            </tr>
            <tr>
              <th>お問い合わせ</th>
              <td>
                公益財団法人現代芸術振興財団<br />
                TEL: 03-6441-3264 ［平日］ 10:00-17:00
              </td>
            </tr>

            <tr>
              <th>クレジット</th>
              <td>
                主催：公益財団法人現代芸術振興財団<br />グラフィックデザイン：
                <u>久保海音</u><br />Webデザイン: 久保海音 + <u>古庄果奈</u
                ><br />Webコーディング:
                <u>稲田和巳</u>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 5rem var(--margin-page) auto;
}

.container {
  margin-left: 2rem;
  padding-left: 2rem;
  border-left: 1px solid #000;

  .logo {
    height: 30px;
  }

  @media screen and (max-width: 768px) {
    border-left: none;
    padding-left: 0;
    margin: 0 2rem;

    .logo {
      height: 5vw;
    }
  }
}

.headline {
  line-height: 1.2;

  .headline__en-container {
    max-width: 100%;
  }
}

tr,
th,
td {
  display: block;
  padding: 0;
}

tr {
  margin-bottom: 1rem;
}
th,
td {
  padding: 0.2rem 0;
}

th {
  text-align: left;
  vertical-align: top;
}
</style>
