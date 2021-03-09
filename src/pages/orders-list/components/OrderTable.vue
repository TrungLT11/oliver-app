<template>
  <v-simple-table dense style="width:100%">
    <template v-slot:default>
      <thead>
        <tr>
          <th>
            Link
          </th>
          <th>
            Ảnh
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
            <span class="text-truncate">
              <a :href="order.link">{{ order.hostName }}</a>
            </span>
          </td>
          <td>
            <p>{{ order.brand }}</p>
            <p>
              <img
                :src="order.imgLink"
                alt="Ảnh SP"
                width="auto"
                height="75px"
              />
            </p>
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

<style></style>
