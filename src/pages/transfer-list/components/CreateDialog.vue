<template>
  <v-dialog :value="createDialog" width="600" origin="bottom right" persistent>
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Nhập Mới</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-menu
            v-model="transferDatePicker"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="transfer.transferDate"
                label="Ngày Giao Dịch"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="transfer.transferDate"
              class="ma-0 pa-0"
              @input="transferDatePicker = false"
            ></v-date-picker>
          </v-menu>
          <v-row>
            <v-col>
              <v-text-field
                v-model.number="transfer.amount"
                :rules="[rules.required]"
                type="number"
                min="0"
                label="Số tiền"
                prepend-inner-icon="mdi-cash"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="transfer.currency"
                :items="countryOptions"
                label="Loại tiền"
                prepend-inner-icon="mdi-currency-sign"
              >
                <template slot="item" slot-scope="{ item }">
                  <span>
                    <v-icon :size="12" :color="item.color" class="mr-1">
                      mdi-checkbox-blank-circle
                    </v-icon>
                    <span>{{ item.text }}</span>
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-text-field
            v-model="transfer.rate"
            label="Tỉ giá"
            prepend-inner-icon="mdi-currency-sign"
            readonly
          />
          <v-text-field
            v-model="transfer.comment"
            label="Nội dung"
            prepend-inner-icon="mdi-comment-outline"
          />
          <v-autocomplete
            v-if="user.admin"
            v-model="transfer.userId"
            :items="userOptions"
            label="User"
            prepend-inner-icon="mdi-account-outline"
          >
          </v-autocomplete>
          <v-row>
            <v-col>
              <v-autocomplete
                v-if="user.admin"
                v-model="transfer.type"
                :items="typeOptions"
                label="Loại"
                prepend-inner-icon="mdi-cog-transfer-outline"
              >
                <template slot="item" slot-scope="{ item }">
                  <span>
                    <v-icon :size="12" :color="item.color" class="mr-1">
                      mdi-checkbox-blank-circle
                    </v-icon>
                    <span>{{ item.text }}</span>
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <v-autocomplete
                v-if="user.admin"
                v-model="transfer.status"
                :items="statusOptions"
                label="Trạng thái"
                prepend-inner-icon="mdi-cog-transfer-outline"
              >
                <template slot="item" slot-scope="{ item }">
                  <span>
                    <v-icon :size="12" :color="item.color" class="mr-1">
                      mdi-checkbox-blank-circle
                    </v-icon>
                    <span>{{ item.text }}</span>
                  </span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="isOrder" justify="space-between">
            <v-col>
              <OrderThumbnail
                v-for="order in selectedOrders"
                :key="order.orderId"
                :order="order"
                @remove="removeSelected"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" depressed color="success" class="mr-2">
            CHẤP NHẬN
          </v-btn>
          <v-btn color="grey" text class="mr-0" @click="cancel">
            HỦY BỎ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import OrderThumbnail from "./OrderThumbnail";
import rules from "@/utils/formRules";
import { sumBy, round } from "lodash";
import moment from "moment";
const defaultTransferData = {
  transferDate: moment().format("YYYY-MM-DD"),
  comment: "",
  amount: 0,
  vnd: 0,
  currency: 0,
  userId: null,
  type: 4,
  rate: 0,
  status: 0
};
export default {
  components: { OrderThumbnail },
  props: ["userOptions", "isOrder"],
  data: () => ({
    rules,
    transfer: defaultTransferData,
    exchangeRates: [],
    transferDatePicker: false,
    orderStatusMap: [2, 5, 2],
    typeOptions: [
      { text: "TDCK", value: 1, color: "green" },
      { text: "COD-HN", value: 2, color: "blue" },
      { text: "COD-TINH", value: 3, color: "yellow" },
      { text: "OTHER", value: 4, color: "red" }
    ],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "red" },
      { text: "Đã nhận", value: 1, color: "blue" }
      // { text: "Chưa chuyển khoản", value: 2, color: "red" }
    ],
    countryOptions: [
      { text: "VND", value: 0, color: "black" },
      { text: "USA", value: 1, color: "green" },
      { text: "UK", value: 2, color: "blue" },
      { text: "SPAIN", value: 3, color: "orange" },
      { text: "KOREA", value: 4, color: "red" },
      { text: "POLAND", value: 5, color: "purple" }
    ]
  }),
  computed: {
    ...mapState({
      user: state => state.login.currentUser,
      createDialog: state => state.transfer.createDialog,
      multiSelected: state => state.order.multiSelected
    }),
    ...mapGetters("order", ["selectedOrders", "selectedOrdersUserId"])
  },
  async created() {
    const exchangeData = await this.fetchExchange();
    this.exchangeRates = exchangeData;
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return false;
      const vnd = this.transfer.currency
        ? this.transfer.amount * this.transfer.rate
        : this.transfer.amount;
      const orders = this.isOrder ? this.multiSelected.join(",") : "";
      const transferData = {
        ...this.transfer,
        vnd,
        orders
      };
      this.selectedOrders.map(({ orderId }) => {
        const orderStatus = this.orderStatusMap[this.transfer.status];
        if (orderStatus)
          this.updateStatus({ id: orderId, status: orderStatus });
      });
      this.create(transferData);
    },
    async create(transfer) {
      await this.createTransfer(transfer);
      this.cancel();
    },
    cancel() {
      // this.$refs.form.reset();
      this.setCreateDialog(false);
    },
    removeSelected(id) {
      const newSelected = this.selectedOrders
        .map(o => o.orderId)
        .filter(_id => _id != id);
      this.setMultiSelected(newSelected);
    },
    ...mapActions("exchange", ["fetchExchange"]),
    ...mapActions("transfer", [
      "setCreateDialog",
      "createTransfer",
      "fetchTransfers"
    ]),
    ...mapActions("order", ["setMultiSelected", "updateStatus"])
  },
  watch: {
    createDialog(val) {
      if (val) {
        this.transfer = { ...defaultTransferData };
        this.transfer.userId = this.user.id;
        if (this.isOrder) {
          this.transfer.amount = sumBy(this.selectedOrders, order =>
            round((order.total + order.shippingCharge) * order.rate, -3)
          );
          if (this.selectedOrdersUserId)
            this.transfer.userId = this.selectedOrdersUserId;
        }
      }
    },
    "transfer.currency"(val) {
      this.transfer.rate = this.exchangeRates[val - 1]?.rate || 0;
    }
  }
};
</script>
