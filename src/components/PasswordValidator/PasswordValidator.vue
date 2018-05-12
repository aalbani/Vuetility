<template>
  <v-container fluid>
    <v-layout row >
      <v-flex xs4>

          <!-- main Password field and validatiion -->
          <v-text-field
          v-model="mainPass"
          :append-icon="e1 ? 'visibility' : 'visibility_off' "
          :append-icon-cb="() => (e1 = !e1)"
          required
          :rules="[
          () => !!mainPass || 'This field is required',
          () => mainPass.length > 7 || 'Password should be 8 characters long',
          () => (progress > 50) || 'Password is too weak'
          ]"
          
          :type="e1 ? 'password' : 'text'"
          label="Enter your password"
          min="8"
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
        slot="progress"
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
          validate-on-blur
          required
          v-model="reTyped"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :rules="[
          () => !!reTyped || 'This field is required',
          () => reTyped === mainPass || 'Password doesn\'t match'
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
export default {
   data () {
      return {
        mainPass: '',
        e1: false,
        reTyped: '',
        e2: false,
        password: 'Password',
        
      }
   },
   computed: {
       progress() {
         let count = 0
        if (!this.mainPass) {
            count = 0 
         }
         if (!!this.mainPass.match(/[0-9]/g)) {
            count += 25 
         }
         if (!!this.mainPass.match(/[a-z]/g)) {
            count += 25
         }
         if (!!this.mainPass.match(/[A-Z]/g)) {
            count += 25
         }
         if (!!this.mainPass.match(/[\W]/g)) {
            count += 25
         }

         return count
       },
      color () {
        return ['error', 'warning', 'success', 'info'][Math.floor(this.progress / 33)]
      },
      PassStrength () {
        return ['very weak', 'weak', 'normal', 'strong'][Math.floor(this.progress / 33)]
        
      } 
   }
}

</script>
