<template>
  <v-app>
   <v-btn @click="dragdrop">file drag and drop</v-btn>
   <v-btn @click="emailValidator">Email validate</v-btn>
   <v-btn @click="passwordValidator">password validate</v-btn>
   <v-content>
     <router-view></router-view>
   </v-content>
  </v-app>
</template>

<script>
export default {
methods: {
dragdrop () {
  this.$router.push('/dragandrop')
},
emailValidator () {
  this.$router.push('/emailValidator')
},
passwordValidator () {
  this.$router.push('/PasswordValidator')
}
},
  name: 'App'
}
</script>
