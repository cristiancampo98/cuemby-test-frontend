<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card>
        <v-card-title class="headline"> Bienvenido </v-card-title>
        <v-card-text>
          <p>
            Esta aplicación te permitirá buscar a tu equipo favorito y conocer
            que jugadores pertenecen a este. Además, podrás buscar a jugadores
            de su interés y conocer algunos detalles de ellos.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/team"> Busca tu equipo </v-btn>
          <v-btn color="primary" nuxt to="/players"> Busca jugadores </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
