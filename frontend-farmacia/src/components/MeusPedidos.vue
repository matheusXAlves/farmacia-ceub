<template>
  <v-container fluid>
    <v-flex xs12 class="text-center" mt-5>
      <h1>Meus Pedidos</h1>
    </v-flex>

    <v-flex xs12 sm10 offset-sm1 mt-10>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-center">NOME DO PRODUTO</th>
            <th class="text-center">CODIGO DA COMPRA</th>
            <th class="text-center">TOTAL DA COMPRA</th>
            <th class="text-center">QUANTIDADE DO PRODUTO</th>
            <th class="text-center">DATA DA COMPRA</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(compra, index) in compras" :key="index">
            <td class="text-center">{{ compra.nome_produtos }}</td>
            <td class="text-center">{{ compra.codigo }}</td>
            <td class="text-center">{{ compra.total }}</td>
            <td class="text-center">{{ compra.quantidade }}</td>
            <td class="text-center">{{ FormatarDate(compra.dta_compra) }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-container>
</template>

<script>
import Compra from "../services/compra";

export default {
  data() {
    return {
      compras: []
    };
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user != null) {
      Compra.GetComprasCliente(user[0].nome_cliente).then(resp => {
        console.log(resp.data);
        this.compras = resp.data;
      });
    }
  },
  methods: {
    FormatarDate(date) {
      var data = new Date(date);
      var dia = data.getDate().toString();
      var diaF = dia.length == 1 ? "0" + dia : dia;
      var mes = (data.getMonth() + 1).toString(); //+1 pois no getMonth() Janeiro começa com zero.
      var mesF = mes.length == 1 ? "0" + mes : mes;
      var anoF = data.getFullYear();
      var hora = data.getHours();
      var minuto = data.getMinutes();
      var segundos = data.getSeconds();
      return diaF + "/" + mesF + "/" + anoF + " às " + hora + ":" + minuto + ":" + segundos;
    }
  }
};
</script>