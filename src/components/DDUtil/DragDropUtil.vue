<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event); fileCount = $event.target.files.length"
            accept="image/*" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <!--SUCCESS-->
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Upload again</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="(item, index) in uploadedFiles" :key="index">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      <!--FAILED-->
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>

     </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
computed:{
  ...mapGetters({

  isInitial: 'DDutil/isInitial',
  isSaving: 'DDutil/isSaving',
  isSuccess: 'DDutil/isSuccess',
  isFailed: 'DDutil/isFailed',
  uploadFieldName: 'DDutil/uploadFieldName',
  uploadedFiles: 'DDutil/uploadedFiles'

  }),
  
},
methods: {
  ...mapActions({
  save: 'DDutil/save',
  reset: 'DDutil/reset',

  }),
  filesChange (event) {
    let name = event.target.name
    let fileList = event.target.files
    let payload = [{name, fileList}]
    this.$store.dispatch('DDutil/filesChange', payload)
  }
},
mounted() {
  this.$store.dispatch('DDutil/reset')
}
}
</script>

<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>