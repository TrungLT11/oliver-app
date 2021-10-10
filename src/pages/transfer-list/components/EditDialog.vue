<template>
  <v-dialog :value="editDialog" width="600" origin="bottom right" persistent>
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sửa đổi</v-toolbar-title>
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
                v-model.number="transfer.amounts"
                :rules="[rules.required]"
                type="number"
                min="0"
                label="Số tiền"
                prepend-inner-icon="mdi-cash"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="transfer.country"
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
          <v-textarea
            v-model="transfer.comment"
            rows="1"
            auto-grow
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
import { mapActions, mapState } from "vuex";
import rules from "@/utils/formRules";
import moment from "moment";
import { pick } from "lodash";
export default {
  props: ["userOptions"],
  data: () => ({
    rules,
    transfer: {
      transferDate: moment().format("YYYY-MM-DD"),
      comment: "",
      amount: "",
      vnd: 0,
      currency: 0,
      userId: null,
      type: 4,
      rate: 0,
      status: 0
    },
    orderStatusMap: [0, 5, 2],
    exchangeRates: [],
    transferDatePicker: false,
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
      { text: "KOREA", value: 4, color: "red" }
    ]
  }),
  computed: {
    ...mapState({
      user: state => state.login.currentUser,
      editingTransfer: state => state.transfer.editingTransfer,
      editDialog: state => state.transfer.editDialog,
      editingTransfer: state => state.transfer.editingTransfer
    })
  },
  async created() {
    const exchangeData = await this.fetchExchange();
    this.exchangeRates = exchangeData;
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return false;
      const vnd = this.transfer.country
        ? this.transfer.amounts * this.transfer.rate
        : this.transfer.amounts;
      const transferData = {
        ...this.transfer,
        vnd,
        orders: undefined
      };
      this.transfer.orders.map(({ orderId }) => {
        const orderStatus = this.orderStatusMap[this.transfer.status];
        if (orderStatus)
          this.updateStatus({ id: orderId, status: orderStatus });
      });
      this.update({ id: this.transfer.transferId, transfer: transferData });
    },
    update({ id, transfer }) {
      this.updateTransfer({ id, transfer });
      this.cancel();
    },
    cancel() {
      // this.$refs.form.reset();
      this.setEditDialog(false);
    },
    ...mapActions("exchange", ["fetchExchange"]),
    ...mapActions("transfer", ["setEditDialog", "updateTransfer"]),
    ...mapActions("order", ["updateStatus"])
  },
  watch: {
    editDialog(val) {
      if (val)
        this.transfer = {
          ...this.editingTransfer,
          amounts: this.editingTransfer.country
            ? this.editingTransfer.amounts
            : this.editingTransfer.vnd,
          transferDate: moment(this.editingTransfer.transferDate).format(
            "YYYY-MM-DD"
          )
        };
    },
    "transfer.country"(val) {
      this.transfer.rate = this.exchangeRates[val - 1]?.rate || 0;
    }
  }
};
</script>
