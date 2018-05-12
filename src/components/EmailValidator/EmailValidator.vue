<template>
  <div>
    <v-text-field
      validate-on-blur
      ref="email"
      v-model="email"
      :rules="[
      () => !!email || 'This field is required',
      () => !!email.includes('@') || 'This e-mail is invalid : there is no @',
      () => ((email.match(/@/g)||[]).length) == '1'  || 'invalid e-mail : multiple (@) symbols found' 
      ]"
      :error-messages="errorMessages"
      label="E-mail"
      placeholder="example@example.com"
      required
      
    ></v-text-field>
    {{mknk}}
</div>
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
