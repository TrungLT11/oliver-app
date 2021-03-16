<template>
  <v-sheet elevation="2" rounded="b-lg t-xl">
    <v-sheet class="pa-3" elevation="2" :color="transfer.cardColor" dark rounded="xl">
      <v-row align="center">
        <v-btn icon>
          <v-icon>mdi-currency-usd</v-icon>
        </v-btn>
        <span class="text-h4" v-text="transfer.vnd.toLocaleString()"></span>
        <v-spacer></v-spacer>
        <v-btn icon @click="deleteTransferClick">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
        <v-btn v-if="!transfer.status" icon @click="changeStatus(1)">
          <v-icon>mdi-check-bold</v-icon>
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
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["transfer"],
  components: {
    UserDropdown: () => import("./UserDropdown")
  },
  created() {},
  methods: {
    changeStatus(status) {
      const id = this.transfer.transferId;
      this.updateStatus({ id, status });
    },
    deleteTransferClick() {
      if (window.confirm("Confirm DELETE?"))
        this.deleteTransfer(this.transfer.transferId);
    },
    ...mapActions("transfer", ["updateStatus", "deleteTransfer"])
  }
};
</script>

<style></style>
