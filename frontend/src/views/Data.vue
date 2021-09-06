<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-card class="py-2" width="700" elevation="18">
        <!-- List -->
        <v-card-title class="text-center d-flex flex-column">
          <h3 class="text-h3 py-3 black--text">Ingresar vehiculo o consultar</h3>
          <br />
          <br />

          <v-card-text class="px-0">
            <!-- agregar placa  -->
            <v-row>
              <v-col sm="12" class="py-0 pr-0">
                <v-text-field
                  v-model="placa"
                  label="Ingrese su la placa ejm: ABC123"
                  solo
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <hr />

          <!-- /agregar vehiculo  -->
          <v-row no-gutters>
            <!-- se guarda el registro de los vehiculos que ingresen -->
            <v-col class="px-1">
              <v-btn
                @click="createData"
                tile
                color="secondary"
                class="text-capitalize"
              >
                Ingresar
              </v-btn>
            </v-col>

            <v-col class="px-1">
              <v-btn
                @click="searchData"
                tile
                color="secondary"
                class="text-capitalize"
              >
                Consultar
              </v-btn>
            </v-col>
          </v-row>
          <br />
          {{ result }}
        </v-card-title>
      </v-card>
      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Mostrar Todos los Vehiculos
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Lista de vehiculos
          </v-card-title>

          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Placa</th>
                    <th class="text-left">Fecha de ingreso</th>
                    <th class="text-left">Fecha de salida</th>
                    <th class="text-left">Valor</th>
                    <th class="text-left">Estado</th>
                    <th class="text-left">Parar tiempo</th>
                    <th class="text-left">Cobrar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in apiData" :key="item.id">
                    <td>{{ item.placa }}</td>
                    <td>{{ getHumanDate(item.createdAt) }}</td>
                    <td>
                      {{
                        item.updatedAt
                          ? getHumanDate(item.updatedAt)
                          : "No tiene aun hora de salida"
                      }}
                    </td>
                    <td>$ {{ item.valor }} COP</td>
                    <td>
                      {{
                        item.status
                          ? "En el parqueadero"
                          : "Fuera del parqueadero"
                      }}
                    </td>
                    <td>
                      <v-icon
                        v-model="item.placa"
                        @click="updateData(item)"
                        color="error"
                        >mdi-stop-circle</v-icon
                      >
                    </td>
                    <td>
                      <v-icon
                        v-model="item.placa"
                        @click="exitData(item)"
                        color="black"
                        >mdi-cash-multiple</v-icon
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> cerrar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import {
  getDataApi,
  createDataApi,
  updateDataApi,
  exitDataApi,
  searchDataApi,
} from "../services/index.js";
import moment from 'moment'
export default {
  name: "data",

  data() {
    return {
      apiData: [],
      placa: "",
      result: "",
      dialog: false,
    };
  },
  created() {
    this.getData();
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getHumanDate(date) {
      return moment.utc(date).local().format("MM/DD/YYYY LTS");
    },
    getData() {
      getDataApi().then((data) => {
        this.apiData = data;
        console.log(this.apiData);
        this.getData();
      });
    },
    mountDataServer() {
      this.getData();
    },
    createData() {
      if (!this.placa == "") {
        createDataApi({ placa: this.placa }).then((response) => {
          console.log("response", response);
          this.placa = "";
          this.$swal('Registro', 'Vehiculo ingresado con exito', 'OK');
          this.getData();
        });
      }
    },
    updateData(item) {
      updateDataApi({ placa: item.placa }).then((response) => {
        console.log("response", response);
        this.$swal('Tiempo', 'El tiempo se ha detenido', 'OK');
        this.getData();
      });
    },
    exitData(item) {
      exitDataApi({ placa: item.placa }).then((response) => {
        console.log("response", response);
        this.$swal('Cobrar', 'Salida del auto con exito', 'OK');
        this.getData();
      });
    },
    searchData() {
      searchDataApi({ placa: this.placa }).then((response) => {
        this.placa = "";
        this.result = `placa: ${response[0].placa} valor:  ${response[0].valor} Fecha salida:  ${moment.utc(response[0].updatedAt).local().format("MM/DD/YYYY LTS")}`
      });
    },
  },
};
</script>
