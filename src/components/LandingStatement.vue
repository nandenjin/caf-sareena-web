import AppearByScroll from './AppearByScroll.vue';
<template>
  <section>
    <div class="text-column font-serif">
      <div lang="ja">
        <p>
          人、空間、そして時間は、パフォーマンス作品において不可欠な要素であり、それらは複雑に絡み合う。従来、パフォーマンス作品を創作する過程において、作家はこれらの要素一切をコントロールする立場にある。しかし、もしパフォーマンスを「行う人」がパフォーマーではなく、観客であったらどうなるだろうか？「鑑賞すること」が「創造すること」とイコールになったとしたら、無制御な要素を、どのように制御できるのだろうか？本作「スペクトルの彼方で」は、ホワイトキューブとガラスの壁、6チャンネルのモキュメンタリ―映像で構成されたパフォーマンス空間を立ち上げ、観客と作品を接続する試みである。映像は、タイに住むサッタポンの叔母の人生譚から着想を得ており、それを日本の文脈に置き換えて描かれている。鑑賞者は作品の「内」と「外」の双方から作品を見聞きすることができ、作品の一部となることで、その立場は鑑賞者から作品の構成者へと変化する。個々人と空間の、一見すると終わりのない関係性は、鑑賞者ら自らが持つ繋がりを再訪する手がかりとなるだろう。
        </p>
      </div>
      <AppearByScroll>
        <p class="visual-container" style="text-align: right">
          <img
            class="visual"
            src="@/assets/images/image_7.jpg"
            alt=""
            style="transform: translateX(1em); bottom: 5vh; left: 55vw"
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
      </div>
      <AppearByScroll>
        <div class="visual-container">
          <p style="text-align: left">
            <img
              class="visual"
              src="@/assets/images/image_8.jpg"
              alt=""
              style="transform: translateX(-1em); top: 10vh; right: 5vw"
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
              style="transform: translateX(1em); bottom: 40vh; left: 50vw"
            />
          </p>
        </div>
      </AppearByScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppearByScroll from './AppearByScroll.vue'
</script>

<style scoped>
section {
  margin: 5em var(--margin-page) 0;
}
</style>
