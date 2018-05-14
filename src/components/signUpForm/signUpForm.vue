<template>
  <v-container fluid grid-list-md style="background-color: #546E7A">
             <h1>      SIGN UP FORM     </h1>
    
    <!-- v-form call with attributes -->
        <v-form ref="form" 
        v-bind="[valid]" 
        @submit.prevent="submit"
        lazy-validation>
    
    <v-layout row wrap>
      
    <!-- first name -->
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="firstName" 
        box label="First Name"></v-text-field>
      </v-flex>

    <!-- last name -->
      <v-flex xs12 sm6>
        <v-text-field 
        v-model="lastName" 
        box label="Last Name"></v-text-field>
      </v-flex>
      
    <!-- user name -->
      <v-flex xs12>
        <v-text-field 
        v-model="userName" 
        box 
        label="User Name"></v-text-field>
      </v-flex>

    <!-- phone number -->
      <v-flex xs12>
        <v-text-field 
        v-model="phoneNumber" 
        box
        mask="##########"
        hint="05xxxxxxxx"
        label="Phone Number"
        ></v-text-field>
      </v-flex>

    <!-- email field -->
      <v-flex xs12>
        <v-text-field
          :rules="emailRules"
          v-model="email"
          box
          label="Email address"
        ></v-text-field>
      </v-flex>
 
    <!-- main Password field and validatiion call -->
      <v-flex xs12 sm6>
        <v-text-field 
          v-model="mainPass"
          :append-icon="e1 ? 'visibility' : 'visibility_off' "
          :append-icon-cb="() => (e1 = !e1)"
          box
          :rules="passwordRules"
          :type="e1 ? 'password' : 'text'"
          label="Enter your password"
          min="8">
        </v-text-field>
      

    <!-- Progress bar moves with main password -->
        <v-progress-linear 
        class="mt-2"
        dark
        size="70"
        slot="progress"
        :value="progress"
        :color="color">
        </v-progress-linear>
       
        <p v-if="!!mainPass"> Password is {{PassStrength}}</p>
        
        </v-flex>

      <!-- Password re-type should match main password -->
      <v-flex xs12 sm6>
        <v-text-field 
          box
          v-model="reTyped"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :rules="[reTypedRules]"
          :type="e2 ? 'password' : 'text'"
          label="Re-enter your password"
          value="repassword">
        </v-text-field>
      </v-flex>
    </v-layout>

    <!-- buttons for submitting and clearing form -->
    <v-layout row wrap>
      <v-flex xs12>
      <v-btn
        :disabled="!valid"
        @click="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
      </v-flex>
    </v-layout>

    </v-form>
  </v-container>
</template>


<script>
 import axios from 'axios'

export default {
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    mainPass: '',
    e1: false,
    reTyped: '',
    e2: false,
    password: 'Password',
    userName: '',
    phoneNumber: '',
    progressed: 0
  }),
  computed: {
    reTypedRules()  {
      // retyped password validator
      return this.mainPass !== this.reTyped ? 'passwords do not match' : true
    },
    emailRules() {
      // email validator
      return [
        value => {
          return !value ? 'E-mail is required' : true
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ? true : 'E-mail must be valid'
      ]},
    passwordRules() {
      // password validatior
      return [
        () => !!this.mainPass || 'This field is required',
        () => this.mainPass.length > 7 || 'Password should be 8 characters long',
        () => (this.progress > 50) || 'Password is too weak'
      ]
    },
    progress () {
      // progress bar counter
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
      this.progressed = count
      return count
    },
    color () {
      return ['error', 'warning', 'success', 'info'][Math.floor(this.progress / 33)]
    },
    PassStrength () {
      return ['very weak', 'weak', 'normal', 'strong'][Math.floor(this.progress / 33)]
    },
    valid () {
      // checks if form is valid
      if (
        this.firstName &&
        this.lastName &&
        this.email &&
        this.mainPass.length > 7 &&
        this.reTyped === this.mainPass &&
        this.userName &&
        this.phoneNumber &&
        this.progressed > 50 &&
        this.isEmail(this.email)
      )
      return true
    }
  },
  methods : {
    // fake submit, edit url
    submit () {
      if (this.valid) {
        axios.post('https://jsonplaceholder.typicode.com/posts', 
        {
          firstName: this.firstName,
          lastName: this.lastName,
          userName: this.userName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          email: this.email,
          password: this.password
        }).then(Response => {
              console.log(Response)
        }).catch(error => {
              conole.log(error)
        })
      }
    },
    clear () {
      // clears form
      this.firstName= ''
      this.lastName= ''
      this.email= ''
      this.mainPass= ''
      this.reTyped= ''
      this.userName = ''
      this.phoneNumber= ''
    },
    isEmail(v) {
      // for form validating
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
    }
  }
}
</script>
  
<style>
h1 {
  text-align : center ;
  color : white;
      text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
    margin-bottom: 2.5%;
    margin-top: 2.5%
  
}
</style>
