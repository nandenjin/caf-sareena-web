<template>
  <section>
    <div class="text-column font-gothic">
      <p>
        この度、現代芸術振興財団は<u>サリーナ・サッタポン</u>個展「IN THE REALM
        BEYOND
        SPECTRUM」を開催いたします。サリーナ・サッタポンはタイ出身1992年生まれ。バンコクのシラパコーン大学大学院修了後、現在は東京藝術大学グローバルアートプラクティス専攻の研究生として在籍、東京を拠点に活動しています。
      </p>
      <p>
        サリーナはタイの少数民族出身であるという個人的な背景や、日常生活をインスピレーションソースとして、これまでパフォーマンスアート、写真、ビデオ・アート、インスタレーションなど、さまざまな媒体で制作を続けています。
      </p>
      <p>
        本展「IN THE REALM BEYOND
        SPECTRUM」は、ホワイトキューブとガラスの壁、6チャンネルのモキュメンタリ―映像で構成されたパフォーマンス空間を立ち上げ、観客と作品を接続する試みを行います。映像は、タイに住むサッタポンの叔母の人生譚から着想を得ており、それを日本の文脈に置き換えて描かれています。鑑賞者は作品の「内」と「外」の双方から作品を見聞きし、作品の一部となることで、その立場は鑑賞者から作品の構成者へと変化します。個々人と空間の、一見すると終わりのない関係性は、鑑賞者自らが持つ繋がりを再訪する手がかりとなります。
      </p>
      <div>
        <AppearByScroll>
          <div class="visual-container">
            <figure
              class="visual"
              style="
                text-align: right;
                transform: translateX(2rem);
                top: 12vh;
                left: 50vw;
              "
            >
              <img src="@/assets/images/works_0.jpg" alt="" loading="lazy" />
              <figcaption class="font-gothic" lang="en">
                We are marching towards non-existent, 2023, Performance
              </figcaption>
            </figure>
          </div>
        </AppearByScroll>
        <AppearByScroll :offset="100">
          <div class="visual-container">
            <figure
              class="visual"
              style="transform: translateX(-1rem); bottom: 10vh; right: 5vw"
            >
              <img src="@/assets/images/works_1.jpg" alt="" loading="lazy" />
              <figcaption class="font-gothic" lang="en">
                Balen(ciaga) I belong, 2022, Video installation
              </figcaption>
            </figure>
          </div>
        </AppearByScroll>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppearByScroll from './AppearByScroll.vue'
</script>

<style scoped>
section {
  margin: 5rem var(--margin-page) auto;
}
</style>
