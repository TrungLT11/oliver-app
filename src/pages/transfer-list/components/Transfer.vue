<template>
  <v-sheet elevation="2" rounded="b-lg t-xl">
    <v-sheet
      class="pa-3"
      elevation="2"
      :color="transfer.cardColor"
      dark
      rounded="xl"
    >
      <v-row align="center">
        <v-btn icon>
          <v-icon>mdi-currency-usd</v-icon>
        </v-btn>
        <span
          class="text-h4 font-weight-bold"
          v-text="transfer.vnd.toLocaleString()"
        ></span>
        <v-spacer></v-spacer>
        <v-btn
          v-tooltip="'Chỉnh sửa'"
          v-if="canEditForUser"
          icon
          @click="editTransfer"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-tooltip="'Xóa'"
          v-if="canDelete"
          icon
          @click="deleteTransferClick"
        >
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
        <v-btn
          v-if="transfer.status != 1 && canMod"
          v-tooltip="'Đã nhận'"
          icon
          @click="changeStatus(1)"
        >
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
        <v-btn
          v-if="transfer.status === 1 && canDelete"
          v-tooltip="'Chưa nhận'"
          icon
          @click="changeStatus(0)"
        >
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>

    <v-container class="pa-4" fluid>
      <UserDropdown :user="transfer.user" />
      <v-list class="pa-0" dense>
        <v-list-item class="pa-0">
          <v-list-item-content>Ngày Chuyển:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ transfer.transferDateValue }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-content>Tỉ giá:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ transfer.rate }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-content>Nội dung:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ transfer.comment }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-content>Ngân Hàng:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ transfer.bank }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0">
          <v-list-item-content>Loại:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ transfer.transactionType }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container class="ma-0 px-0 py-2">
      <v-slide-group show-arrows="always">
        <v-slide-item v-for="order in transfer.orders" :key="order.orderId">
          <OrderThumbnail :order="order" />
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderThumbnail from "./OrderThumbnail";
export default {
  props: ["transfer"],
  components: {
    UserDropdown: () => import("./UserDropdown"),
    OrderThumbnail
  },
  data: () => ({
    orderStatusMap: [0, 5, 2]
  }),
  created() {},
  computed: {
    canDelete() {
      return this.user.admin === 1;
    },
    canMod() {
      return this.user.admin != 0;
    },
    canEditForUser() {
      return this.transfer.status === 0 || this.user.admin;
    },
    ...mapState({
      user: state => state.login.currentUser
    })
  },
  methods: {
    editTransfer() {
      this.setEditDialog(true);
      this.setEditingTransfer(this.transfer);
    },
    changeStatus(status) {
      const id = this.transfer.transferId;
      this.transfer.orders.map(({ orderId }) => {
        const orderStatus = this.orderStatusMap[status];
        if (orderStatus)
          this.updateOrderStatus({ id: orderId, status: orderStatus });
      });
      this.updateStatus({ id, status });
    },
    deleteTransferClick() {
      if (window.confirm("Confirm DELETE?"))
        this.deleteTransfer(this.transfer.transferId);
    },
    ...mapActions("transfer", [
      "updateStatus",
      "deleteTransfer",
      "setEditingTransfer",
      "setEditDialog"
    ]),
    ...mapActions("order", {
      updateOrderStatus: "updateStatus"
    })
  }
};
</script>

<style></style>
