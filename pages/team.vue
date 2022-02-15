<template>
  <v-row justify="center">
    <v-col class="text-center" cols="8">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        <v-text-field
          v-model="form.name"
          label="Buscar equipo"
          placeholder="Ingresa el nombre del equipo"
          filled
          rounded
          dense
          @keyup.enter="getTeam"
        ></v-text-field>
      </blockquote>
    </v-col>
    <v-col cols="8">
      <v-data-table
        :headers="table.headers"
        :items="table.content"
        :items-per-page="table.perPage"
        :loading="loading"
        hide-default-footer
        no-data-text="No hay información para mostrar"
        class="elevation-1"
      >
        <template v-slot:[`item.image`]="{}">
          <v-avatar size="36px">
            <img alt="Avatar" src="/player.png" />
          </v-avatar>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          v-model="table.page"
          :length="table.pageCount"
          total-visible="5"
          @input="getPage"
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        name: '',
        page: 1,
      },
      player: {},
      table: {
        headers: [
          { text: 'Imagen', value: 'image' },
          { text: 'Jugador', value: 'name' },
          { text: 'Posición', value: 'position' },
          { text: 'Nacionalidad ', value: 'nation' },
        ],
        content: [],
        perPage: 1,
      },
    }
  },
  watch: {
    'form.search'(updated, old) {
      if (updated !== old) {
        this.form.page = 1
      }
    },
  },
  created() {
    if (this.$route.query.name) {
      this.form.name = this.$route.query.name
    }
    if (this.$route.query.page) {
      this.form.page = this.$route.query.page
    }
  },
  mounted() {
    if (this.form.name) {
      this.getTeam()
    }
  },
  methods: {
    getPage(value) {
      this.form.page = value
      this.getTeam()
    },
    async getTeam() {
      this.loading = true
      this.table.content = []
      try {
        const response = await this.$axios.$post('team', this.form)
        this.table.content = response.data.data
        this.table.perPage = response.data.per_page
        this.table.page = response.data.current_page
        this.table.pageCount = response.data.last_page
        this.$router.push({ path: 'team', query: this.form })
      } catch (error) {
        console.log(error.response)
      }
      this.loading = false
    },
    showDetail(item) {
      this.player = item
      this.dialog = true
    },
  },
}
</script>
