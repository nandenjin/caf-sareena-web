<template>
  <section>
    <div class="text-column font-serif">
      <div lang="ja">
        <p>
          人、空間、そして時間は、パフォーマンス作品において不可欠な要素であり、それらは複雑に絡み合う。従来、パフォーマンス作品を創作する過程において、作家はこれらの要素一切をコントロールする立場にある。しかし、もしパフォーマンスを「行う人」がパフォーマーではなく、観客であったらどうなるだろうか？「鑑賞すること」が「創造すること」とイコールになったとしたら、無制御な要素を、どのように制御できるのだろうか？本作「スペクトルの彼方で」は、ホワイトキューブとガラスの壁、6チャンネルのモキュメンタリ―映像で構成されたパフォーマンス空間を立ち上げ、観客と作品を接続する試みである。映像は、タイに住むサッタポンの叔母の人生譚から着想を得ており、それを日本の文脈に置き換えて描かれている。鑑賞者は作品の「内」と「外」の双方から作品を見聞きすることができ、作品の一部となることで、その立場は鑑賞者から作品の構成者へと変化する。個々人と空間の、一見すると終わりのない関係性は、鑑賞者ら自らが持つ繋がりを再訪する手がかりとなるだろう。
        </p>
        <p style="text-align: right">サリーナ・サッタポン</p>
      </div>
      <AppearByScroll>
        <p class="visual-container" style="text-align: right">
          <img
            class="visual"
            src="@/assets/images/image_7.jpg"
            alt=""
            style="transform: translateX(1em); bottom: 3vh; left: 55vw"
            loading="lazy"
          />
        </p>
      </AppearByScroll>
      <div lang="en" style="margin-top: 2em">
        <p>
          Human, space, and time are essential components in performative art
          pieces, intricately interconnecting with each other. Traditionally, in
          the process of creating performances, the artist retains control over
          all these elements. However, what would happen if the "Human"
          component were not performers but spectators? If "observing" equates
          to "creating", How can we control the uncontrolled? "In the realm
          beyond spectrum" is an attempt to connect the audience with artwork by
          creating a performative space comprising six channels of video
          mockumentary, a white cube room, and glass wall. The video draws
          inspiration from the life story of Sareena's aunt, who resides in
          Thailand but is depicted within Japan's context. Viewers can observe
          and listen from both "inside" and "outside", and as they become part
          of the artwork, their role transforms from observers to contributors.
          The seemingly endless relationships between individuals and spaces may
          help spectators to revisit the connections they possess.
        </p>
        <p style="text-align: right">sareena sattapon</p>
      </div>
      <div style="margin: 2em auto 4em">
        <AppearByClick>
          <template v-slot:placeholder>
            <div class="video-placeholder">
              <img
                src="@/assets/images/interview-video-thumbnail.jpg"
                alt=""
                style="max-width: 100%; cursor: pointer"
                loading="lazy"
              />
              <div class="shadow"></div>
            </div>
          </template>
          <template v-slot:default>
            <iframe
              src="https://www.youtube.com/embed/M42R2rIL28M?si=2hOpnO39h-g5KZE4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              style="width: 100%; aspect-ratio: 16 / 9"
            ></iframe
          ></template>
        </AppearByClick>
      </div>
      <AppearByScroll>
        <div class="visual-container">
          <p style="text-align: left">
            <img
              class="visual"
              src="@/assets/images/image_8.jpg"
              alt=""
              style="transform: translateX(-1em); top: 5vh; right: 5vw"
              loading="lazy"
            />
          </p>
        </div>
      </AppearByScroll>
      <AppearByScroll :offset="200">
        <div class="visual-container">
          <p style="text-align: right">
            <img
              class="visual"
              src="@/assets/images/image_9.jpg"
              alt=""
              style="transform: translateX(1em); bottom: 40vh; left: 47vw"
            />
          </p>
        </div>
      </AppearByScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppearByScroll from './AppearByScroll.vue'
import AppearByClick from './AppearByClick.vue'
</script>

<style scoped>
section {
  margin: 5em var(--margin-page) 0;
}

.video-placeholder {
  text-align: center;
  position: relative;
  line-height: 0;
  cursor: pointer;

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    transition: background-color 0.3s;

    &::before {
      display: inline-block;
      content: '';
      border: 30px solid transparent;
      border-width: 20px 0 20px 40px;
      border-left-color: white;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      margin: auto;
      transition: transform 0.3s;
    }

    &:hover {
      background-color: rgb(0, 0, 0, 0.5);

      &::before {
        transform: scale(1.2);
      }
    }
  }
}
</style>
