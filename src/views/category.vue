<template>
  <div>
    <BaseNavbar />
    <main>
      <!-- main category image -->
      <section>
        <article class="image-full-container relative overflow-hidden">
          <div class="table-cell align-middle">
            <!-- dummy images for the time being -->
            <img
              src="https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg" 
              alt=""
              class="absolute bottom-0 left-0 right-0 w-full h-full"
              :srcset="`https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/efd2f12a48eb069752621b400d983518.jpg 512w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/734a76e4dabe6516991d5fbb76cc44c9.jpg 1024w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/85d0abe28a8db662b56d4dfd4dfe59c3.jpg 1024w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/12dd09e9045b7d0b9a704ea9930122bb.jpg 1536w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/6f8b4f797cade7a3fc042e251fd82d7c.jpg 2048w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/5fd72d0a6328b5d9f453eaa3216d663b.jpg 2560w,
                        https://flishuset.s3.amazonaws.com/CACHE/images/media/categories/belysning/1766491d3dd2b83b5c7a17f421c414f6.jpg 3072w`"
            >
            <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
              <div class="text-center">
                <h2 class="text-2xl font-medium text-white">Fliser</h2>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
              <BaseButton icon light plain>
                <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
              </BaseButton>
            </div>
          </div>
        </article>
      </section>
      <!-- site product content -->
      <div class="px-5 py-5">
        <!-- TODO: Fix "Back" on smaller screens -->
        <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Category',
  page() {
    return {
      title: `Category`,
      meta: [
        {
          name: 'description',
          content: `Products attached to the category category.`
        }
      ]
    }
  },
  computed: {
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '/' }, 
        { text: 'Fliser', disabled: true },
      ]
    },
  }
}
</script>