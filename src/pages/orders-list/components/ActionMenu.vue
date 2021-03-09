<template>
  <v-speed-dial
    bottom
    right
    fixed
    direction="top"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn color="primary" dark fab>
        <v-icon>
          mdi-checkbox-multiple-marked
        </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="blue">
      <v-icon> mdi-checkbox-multiple-marked</v-icon>
    </v-btn>
    <v-btn fab dark small color="orange">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-file-download-outline</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {};
</script>

<style></style>
