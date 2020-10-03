<template>
  <div class="relative min-h-screen">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  page() {
    return {
      title: 'Flishuset',
    }
  },
}
</script>

<style>
   @import url('https://rsms.me/inter/inter.css');
   html { font-family: 'Inter', sans-serif; }

   .image-full-container {
     height: 375px;
     width: 100%;
   }

   .image-half-container {
     height: 375px;
     width: 100%;
   }

   @media (min-width: 640px) {
     .image-full-container {
       height: 300px;
       width: 100%;
     }

     .image-half-container {
       height: 300px;
       width: 100%;
     }
   }

   @media (min-width: 768px) {
     .image-full-container {
       height: 366px;
       width: 100%;
     }

     .image-half-container {
       height: 362px;
       width: 100%;
     }
   }

   @media (min-width:1024px) {
     .image-full-container {
       height: 480px;
       width: 100%;
     }

     .image-half-container {
       height: 480px;
       width: 100%;
     }
   }

   @media (min-width: 1280px) {
     .image-full-container {
       height: 660px;
       width: 100%;
     }

     .image-half-container {
       height: 660px;
       width: 100%;
     }
   }

   @media (min-width: 1536px) {
     .image-full-container {
       height: 800px;
       width: 100%;
     }

     .image-half-container {
       height: 800px;
       width: 100%;
     }
   }

   @media (min-width: 2048px) {
     .image-full-container {
       height: 800px;
       width: 100%;
     }

     .image-half-container {
       height: 800px;
       width: 100%;
     }
   }

   @media (min-width: 3072px) {
     .image-full-container {
       height: 940px;
       width: 100%;
     }

     .image-half-container {
       height: 940px;
       width: 100%;
     }
   }
</style>