<template>
  
    <v-text-field
      validate-on-blur
      ref="email"
      v-model="email"
      :rules="[
      () => !!email || 'This field is required',
      (email) => !!email.includes('@') || 'This e-mail is invalid : there is no @',
      () => (this.email.match(/@/g)||[].length)  === 3 || 'invalid e-mail : multiple (@) symbols found' 
      ]"
      :error-messages="errorMessages"
      label="E-mail"
      placeholder="example@example.com"
      required
      
    ></v-text-field>

</template>

<script>
export default {
data: () => ({
    
    errorMessages: [],
    email: '',
    
  }),

  computed: {
    form () {
      return {
        email: this.email,
      }
    }
  },

  watch: {
    email () {
      this.errorMessages = []
    }
  }
}
</script>
