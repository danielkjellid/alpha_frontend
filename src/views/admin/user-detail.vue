<template>
  <AdminDetailTemplate>
    <template #title>
      <div class="flex items-center justify-center w-10 h-10 mr-3 bg-purple-400 rounded-full">
        <span class="text-sm text-white">D</span>
      </div>
      <h1 class="text-2xl font-semibold text-gray-900">Daniel Kjellid</h1>
    </template>
    <template #actions>
      <BaseButton light>
        Rediger bruker
      </BaseButton>
    </template>
    <div class="grid grid-cols-3 gap-6 mt-6">
      <div class="col-span-2">
        <AdminSection title="Brukerinformasjon">
          <DescriptionList :fields="fields" :item="user">
            <template #is_active="{ item }">
              <div v-if="item.is_active" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Aktiv
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Ikke aktiv
              </div>
            </template>
            <template #subscribed_to_newsletter="{ item }">
              <div v-if="item.subscribed_to_newsletter" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
            <template #allow_personalization="{ item }">
              <div v-if="item.allow_personalization" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
            <template #allow_third_party_personalization="{ item }">
              <div v-if="item.allow_third_party_personalization" class="flex items-center">
                <BaseIcon name="check-circle" fill="text-green-400"  class="mr-2"/>
                Godtar
              </div>
              <div v-else class="flex items-center">
                <BaseIcon name="x-circle" fill="text-red-400" class="mr-2"/>
                Godtar ikke
              </div>
            </template>
          </DescriptionList>
        </AdminSection>
        <AdminSection title="Notater">
          <div class="flex items-start justify-between my-6">
            <div class="flex items-start">
              <div class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white bg-blue-400 rounded-full">D</div>
              <div>
                <div class="flex items-center">
                  <p class="mr-2 text-sm font-medium text-gray-900">Daniel Kjellid</p>
                  <span class="text-sm text-gray-500">28 Sept 2020, 16:19</span>
                </div>
                <p class="mt-2 text-sm text-gray-800">
                  What happened with the refund?
                </p>
              </div>
            </div>
            <button class="hover:text-gray-900 text-gray-800">
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
          <div class="flex items-start justify-between my-6">
            <div class="flex items-start">
              <div class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white bg-purple-400 rounded-full">E</div>
              <div>
                <div class="flex items-center">
                  <p class="mr-2 text-sm font-medium text-gray-900">Emma Jahr</p>
                  <span class="text-sm text-gray-500">28 Sept 2020, 16:19</span>
                </div>
                <p class="mt-2 text-sm text-gray-800">
                  Eva decided she didn't want the unlimited license. We agreed to switch her to the 5 seat license and refund the difference.
                </p>
              </div>
            </div>
            <button class="hover:text-gray-900 text-gray-800">
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
          <div class="flex items-start justify-between my-6">
            <div class="flex items-start">
              <div class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white bg-purple-400 rounded-full">E</div>
              <div>
                <div class="flex items-center">
                  <p class="mr-2 text-sm font-medium text-gray-900">Emma Jahr</p>
                  <span class="text-sm text-gray-500">28 Sept 2020, 16:19</span>
                </div>
                <p class="mt-2 text-sm text-gray-800">
                  You should check out her site too btw, some awesome stuff. The link is in her custom profile.
                </p>
              </div>
            </div>
            <button class="hover:text-gray-900 text-gray-800">
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
          <div class="flex items-start justify-between my-6">
            <div class="flex items-start">
              <div class="flex items-center justify-center flex-none w-6 h-6 mr-4 text-xs text-white bg-blue-400 rounded-full">D</div>
              <div>
                <div class="flex items-center">
                  <p class="mr-2 text-sm font-medium text-gray-900">Daniel Kjellid</p>
                  <span class="text-sm text-gray-500">28 Sept 2020, 16:19</span>
                </div>
                <p class="mt-2 text-sm text-gray-800">
                  Gotcha.
                </p>
              </div>
            </div>
            <button class="hover:text-gray-900 text-gray-800">
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </AdminSection>
      </div>
      <div class="col-span-1">
        <AdminSection title="Aktivitet">
          <ul>
            <li>
              <div class="relative flex items-start pb-6">
                <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
                <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div class="relative w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto redigert</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <div class="mt-3">
                    <p class="text-gray-500">Emma Jahr endret <span class="font-medium text-gray-800">first_name</span> fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="relative flex items-start pb-6">
                <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
                <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div class="relative w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto redigert</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <div class="mt-3">
                    <p class="text-gray-500">Emma Jahr endret <span class="font-medium text-gray-800">first_name</span> fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="relative flex items-start pb-6">
                <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
                <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div class="relative w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto redigert</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <div class="mt-3">
                    <p class="text-gray-500">Emma Jahr endret <span class="font-medium text-gray-800">first_name</span> fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="relative flex items-start pb-6">
                <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
                <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div class="relative w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto redigert</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <div class="mt-3">
                    <p class="text-gray-500">Emma Jahr endret <span class="font-medium text-gray-800">first_name</span> fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="relative flex items-start pb-6">
                <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
                <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <div class="relative w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto redigert</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <div class="mt-3">
                    <p class="text-gray-500">Emma Jahr endret <span class="font-medium text-gray-800">first_name</span> fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="relative flex items-start pb-6">
                <!-- <span class="absolute left-2 ml-px h-5 w-0.5 bg-gray-200 my-8" aria-hidden="true"></span> -->
                <BaseIcon name="check-circle" fill="text-green-400 mr-4" />
                <div class="w-full text-sm">
                  <div class="flex items-center justify-between">
                    <p class="font-medium text-gray-900">Konto opprettet</p>
                    <p class="text-gray-400">27 sept 2020, 22:46</p>
                  </div>
                  <!-- <div class="mt-3">
                    <p class="text-gray-500"><span class="font-medium text-gray-800">first_name</span> endret fra <span class="font-medium text-gray-800">Danil</span> til <span class="font-medium text-gray-800">Daniel</span></p>
                  </div> -->
                </div>
              </div>
            </li>
          </ul>
        </AdminSection>
      </div>
    </div>
  </AdminDetailTemplate>
</template>

<script>
import AdminDetailTemplate from '@/views/templates/admin-detail.vue'
import DescriptionList from '@/components/description-list.vue'
import AdminSection from '@/components/admin-section.vue'

import apiService from '@/common/api'

export default {
  name: 'UserDetail',
  components: {
    AdminDetailTemplate,
    DescriptionList,
    AdminSection
  },
  data() {
    return {
      user: {},
      fields: [
        { name: 'email', text: 'E-post' },
        { name: 'phone_number', text: 'Telefon' },
        { name: 'address', text: 'Adresse' },
        { name: 'date_joined', text: 'Registrert' },
        { name: 'last_login', text: 'Sist login' },
        { name: 'acquisition_source', text: 'Kilde' },
        { name: 'is_active', text: 'Aktiv' },
        { name: 'subscribed_to_newsletter', text: 'Markedsføring' },
        { name: 'allow_personalization', text: 'Personalisering' },
        { name: 'allow_third_party_personalization', text: 'Tredjepartspersonalisering' },
      ],
      items: [ 
        { id: 1, profile: { full_name: "Daniel Kjellid", initial: "D", avatar_color: "#A78BFA" }, email: "daniel@kjellid.no", is_active: true, date_joined: "16. June 2020 00:29" }, 
        { id: 2, profile: { full_name: "Test 12345 User", initial: "T", avatar_color: "#F87171" }, email: "daniel@test.no", is_active: true, date_joined: "16. June 2020 00:32" }, 
        { id: 6, profile: { full_name: "Test Bruker", initial: "T", avatar_color: "#F87171" }, email: "testbruker@example.com", is_active: true, date_joined: "17. June 2020 15:47" }, 
        { id: 8, profile: { full_name: "Emma Jahr", initial: "E", avatar_color: "#F87171" }, email: "emma.jahr@gmail.com", is_active: true, date_joined: "07. October 2020 17:20" }, 
        { id: 9, profile: { full_name: "Emma Jahr", initial: "E", avatar_color: "#F87171" }, email: "emma.jahr+1@gmail.com", is_active: true, date_joined: "07. October 2020 17:21" }, 
        { id: 10, profile: { full_name: "Emma Jahr", initial: "E", avatar_color: "#F87171" }, email: "emma.jahr+2@gmail.com", is_active: true, date_joined: "07. October 2020 17:21" }, 
        { id: 11, profile: { full_name: "Emma Jahr", initial: "E", avatar_color: "#F472B6" }, email: "emma.jahr+3@gmail.com", is_active: true, date_joined: "07. October 2020 17:22" }, 
        { id: 12, profile: { full_name: "Testing 1234 1234345", initial: "T", avatar_color: "#F87171" }, email: "test+8@bruker.no", is_active: true, date_joined: "07. October 2020 17:27" }, 
        { id: 13, profile: { full_name: "Ragnhild Kjellid", initial: "R", avatar_color: "#F87171" }, email: "ragnhild@flis.no", is_active: true, date_joined: "09. October 2020 16:22" }, 
        { id: 14, profile: { full_name: "Finn Kjellid", initial: "F", avatar_color: "#F87171" }, email: "finn@flis.no", is_active: true, date_joined: "10. October 2020 22:48" }, 
        { id: 15, profile: { full_name: "Daniel Test", initial: "D", avatar_color: "#60A5FA" }, email: "finn+1@flis.no", is_active: false, date_joined: "10. October 2020 22:55" }, 
        { id: 16, profile: { full_name: "Daniel Test 2", initial: "D", avatar_color: "#34D399" }, email: "finn+2@flis.no", is_active: true, date_joined: "10. October 2020 22:58" }, 
        { id: 17, profile: { full_name: "Test 6", initial: "T", avatar_color: "#F87171" }, email: "6@test.com", is_active: true, date_joined: "10. October 2020 22:59" }, 
        { id: 18, profile: { full_name: "Daniel Gmail", initial: "D", avatar_color: "#FBBF24" }, email: "daniel.kjellid@gmail.com", is_active: true, date_joined: "16. October 2020 22:47" }, 
        { id: 19, profile: { full_name: "Hanne Dalen", initial: "H", avatar_color: "#F87171" }, email: "hanne@dalen.no", is_active: false, date_joined: "17. October 2020 18:47" }, 
        { id: 21, profile: { full_name: "Avatar Tester", initial: "A", avatar_color: "#60A5FA" }, email: "avatar@test.com", is_active: true, date_joined: "06. February 2021 14:11" }, 
        { id: 22, profile: { full_name: "Avatar 2", initial: "A", avatar_color: "#F472B6" }, email: "avatar@test2.com", is_active: true, date_joined: "06. February 2021 14:13" }, 
        { id: 23, profile: { full_name: "Avtar 3", initial: "A", avatar_color: "#34D399" }, email: "test@avatar.com", is_active: true, date_joined: "06. February 2021 14:16" } 
      ]
    }
  },
  methods: {
    fetchUser(id) {
      apiService.get(`users/${id}/`)
        .then(user => {
          this.user = user.data
        })
    } 
  },
  created() {
    this.fetchUser(1)
  }
}
</script>