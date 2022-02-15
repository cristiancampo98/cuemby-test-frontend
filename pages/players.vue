<template>
  <v-row justify="center">
    <v-col class="text-center" cols="8">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <blockquote class="blockquote">
        <v-text-field
          v-model="form.search"
          label="Buscar jugadores"
          placeholder="Ingresa el nombre de un jugadores"
          filled
          rounded
          dense
          @keyup.enter="getPlayers"
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            text
            color="primary"
            small
            class="text-none"
            @click="showDetail(item)"
            >Ver detalle</v-btn
          >
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
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Detalle del jugador : {{ player.name }}
        </v-card-title>
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Club</v-list-item-title>
              <v-list-item-subtitle>{{ player.club }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Posición</v-list-item-title>
              <v-list-item-subtitle>{{ player.position }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Nación</v-list-item-title>
              <v-list-item-subtitle>{{ player.nation }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        search: '',
        order: '',
        page: 1,
      },
      player: {},
      table: {
        headers: [
          { text: 'Imagen', value: 'image' },
          { text: 'Jugador', value: 'name' },
          { text: 'Posición', value: 'position' },
          { text: '', value: 'actions' },
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
    if (this.$route.query.search) {
      this.form.search = this.$route.query.search
    }
    if (this.$route.query.order) {
      this.form.order = this.$route.query.order
    }
    if (this.$route.query.page) {
      this.form.page = this.$route.query.page
    }
  },
  mounted() {
    if (this.form.search) {
      this.getPlayers()
    }
  },
  methods: {
    getPage(value) {
      this.form.page = value
      this.getPlayers()
    },
    async getPlayers() {
      this.loading = true
      this.table.content = []
      try {
        const response = await this.$axios.$get('players', {
          params: this.form,
        })
        this.table.content = response.data.data
        this.table.perPage = response.data.per_page
        this.table.page = response.data.current_page
        this.table.pageCount = response.data.last_page
        this.$router.push({ path: 'players', query: this.form })
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
