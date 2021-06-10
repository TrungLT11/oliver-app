<template>
  <v-simple-table dense style="width:100%">
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            Ảnh
          </th>
          <th>
            Link
          </th>
          <th>
            Màu (Cỡ)
          </th>
          <th>
            Giá (SL)
          </th>
          <th>
            Sau Off (%Off)
          </th>
          <th>
            Công (Thuế)
          </th>
          <th>
            ShipWeb
          </th>
          <th>
            Phụ Thu
          </th>
          <th>
            Cân (Cước)
          </th>
          <th>
            Phí VC
          </th>
          <th v-if="user.admin===1">
            Mua Vào
          </th>
          <th>
            Bán Ra
          </th>
          <th>
            Tổng
          </th>
          <th v-if="user.admin === 1">
            Công Mua
          </th>
          <th v-if="user.admin">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <v-chip v-if="order.brand" x-small label outlined>
              {{ order.brand }}
            </v-chip>
            <p style="width: 75px" class="ma-0 mt-1">
              <silent-box
                :image="{
                  src: order.imgLink
                }"
              />
            </p>
          </td>
          <td>
            <span class="text-truncate">
              <a
                :href="order.link"
                target="_blank"
                class="text-truncate d-inline-block"
                style="max-width:120px"
                >{{ order.hostName }}</a
              >
            </span>
          </td>
          <td>{{ `${order.color} (${order.size})` }}</td>
          <td>{{ `${order.price} (${order.quantity})` }}</td>
          <td>
            {{ `${order.offPrice} (${order.offVal}%)` }}
          </td>
          <td>
            {{ `${order.chargeValue} (${order.tax}%)` }}
          </td>
          <td>{{ order.shipWeb }}</td>
          <td>{{ order.surCharge }}</td>
          <td>{{ `${order.weight}kg (${order.weightRate})` }}</td>
          <td>{{ order.shippingValue }}</td>
          <td v-if="user.admin===1">{{ order.totalInValue }}</td>
          <td>{{ order.totalOutValue }}</td>
          <td>{{ order.totalValue }}</td>
          <td v-if="user.admin === 1">{{ order.totalCommissionValue }}</td>
          <td v-if="user.admin">{{ order.note }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["order"],
  computed: {
    ...mapState({
      user: state => state.login.currentUser
    })
  }
};
</script>

<style lang="scss">
.silentbox-item {
  img {
    max-height: 75px;
    max-width: 75px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
  }
}
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
