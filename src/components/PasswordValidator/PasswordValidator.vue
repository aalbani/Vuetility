<template>
  <v-container fluid>
    <v-layout row >
      <v-flex xs4>

          <!-- main Password field and validatiion -->
          <v-text-field
          v-model="mainPass"
          :rules="[
          () => mainPassExist || 'This field is required',
          () =>  mainPassLength || 'Password should be 8 characters long',
          () => (progress > 50) || 'Password is weak'
          ]"
          :append-icon="e1 ? 'visibility' : 'visibility_off' "
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          label="Enter your password"
        ></v-text-field>
        </v-flex> 

        <!-- icon and tooltip for how password should structure  -->
        <v-flex xs4 class="ml-4" style="cursor: default">
        <v-tooltip right>
        <v-icon medium right slot="activator">info</v-icon>
        <span style="white-space: pre">  Password should be at least 8 characters  
    long, should contain a combonation of capital  
    letters, numbers, and symbols.  </span>
        </v-tooltip>
        </v-flex>     
    </v-layout>
        
        <!-- Progress bar moves with main password -->
    <v-layout row wrap class="mt-2">
        <v-flex xs4>
        <v-progress-linear 
        height="20"
        :value="progress"
        :color="color">
        </v-progress-linear>
        <v-text v-if="!!mainPass">Your password is {{PassStrength}}</v-text>
        </v-flex>
    </v-layout>
        <!-- Password re-type shoud match main password -->
    <v-layout row class="mt-3">
        <v-flex xs4>
          <v-text-field
          
          required
          v-model="reTyped"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :rules="[
          (v) => reTypeExist || 'This field is required',
          (v) => passMatch || 'Password doesn\'t match'
          ]"
          :type="e2 ? 'password' : 'text'"
          label="Re-enter your password"
          value="repassword"
        ></v-text-field>
        </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
    
</script>




<script>
import {mapGetters} from 'vuex'
export default {
     data () {
      return {
        e1: false,
        e2: false,
        password: 'Password'
        
      }
     },
  computed: {
    
    mainPass : {
      get() {
          this.$store.getters['PVModule/mainPass']
      },
      set(val) {
          this.$store.commit('PVModule/mainPass', val)
          this.$store.dispatch('PVModule/progressCounter')
      }
    },
    reTyped : {
      get() {
          this.$store.getters['PVModule/reTyped']
      },
      set(val) {
          this.$store.commit('PVModule/reTyped', val)
      }
    },
    ...mapGetters({
      color: 'PVModule/color',
      PassStrength: 'PVModule/PassStrength',
      mainPassLength: 'PVModule/mainPassLength',
      mainPassExist: 'PVModule/mainPassExist',
      progress: 'PVModule/progress',
      reTypeExist: 'PVModule/reTypeExist',
      passMatch: 'PVModule/passMatch'

  })

   },

}

</script>
