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
            Màu/Cỡ
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
          <th>
            Mua Vào
          </th>
          <th>
            Bán Ra
          </th>
          <th>
            Tổng
          </th>
          <th>
            Công Mua
          </th>
          <th>
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>{{ order.brand }}</p>
            <p style="width: 75px" class="mb-1">
              <!-- <v-img
                :src="order.imgLink"
                alt="Ảnh SP"
                max-width="75"
                max-height="75"
              /> -->
              <silent-box
                :image="{
                  src: order.imgLink
                }"
              />
            </p>
          </td>
          <td>
            <span class="text-truncate">
              <a :href="order.link" class="text-truncate d-inline-block" style="max-width:120px">{{ order.hostName }}</a>
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
          <td>{{ `${order.weight} (${order.weightRate})` }}</td>
          <td>{{ order.shippingValue }}</td>
          <td>{{ order.totalInValue }}</td>
          <td>{{ order.totalOutValue }}</td>
          <td>{{ order.totalValue }}</td>
          <td>{{ order.totalCommissionValue }}</td>
          <td>{{ order.note }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {};
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
