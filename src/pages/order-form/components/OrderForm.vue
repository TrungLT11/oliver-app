<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-container class="px-5" fluid>
      <v-row>
        <v-col
          cols="12"
          v-bind="{ md: currentUser.admin ? 4 : 12 }"
          class="pa-2"
        >
          <v-autocomplete
            v-model="draft.country"
            :items="countryOptions"
            label="Nước"
            prepend-inner-icon="mdi-flag"
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
          <v-text-field
            v-model="draft.link"
            label="Link Sản Phẩm"
            background-color="grey lighten-4"
            prepend-inner-icon="mdi-link"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="draft.imgLink"
            label="Link Ảnh"
            prepend-inner-icon="mdi-image"
          />
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model="draft.color"
              label="Màu Sắc"
              prepend-inner-icon="mdi-palette"
            />
            <v-text-field
              v-model="draft.size"
              label="Kích Thước"
              prepend-inner-icon="mdi-resize"
            />
          </v-row>
          <v-text-field
            v-model="draft.brand"
            label="Thương Hiệu"
            prepend-inner-icon="mdi-watermark"
          />
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.quantity"
              type="number"
              label="Số Lượng"
              min="1"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-counter"
              :rules="[rules.required]"
            />
          </v-row><v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.price"
              label="Giá"
              type="number"
              min="0"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-currency-usd"
              :rules="[rules.required]"
            />
          </v-row>
          <v-text-field
            v-model.number="draft.offVal"
            type="number"
            min="0"
            max="100"
            label="Discount"
            prepend-inner-icon="mdi-percent-outline"
          />
        </v-col>
        <!-- v-model="draft.xxx" -->
        <v-col cols="12" md="4" class="pa-2" v-show="currentUser.admin">
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.surCharge"
              label="SurCharge"
              type="number"
              min="0"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-currency-usd"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model.number="draft.shipWeb"
              label="ShipWeb"
              type="number"
              min="0"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-currency-usd"
              :rules="[rules.required]"
            />
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="commission"
              type="number"
              min="0"
              label="Tiền Công"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-cash-multiple"
              :rules="[rules.required]"
            />
            <v-radio-group v-model="commissionType" row>
              <v-radio label="%" value="1"></v-radio>
              <v-radio label="VND" value="2"></v-radio>
            </v-radio-group>
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.tax"
              label="Thuế"
              min="0"
              max="100"
              prepend-inner-icon="mdi-percent-outline"
            />
            <v-switch v-model="useTax" flat></v-switch>
          </v-row>

          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.weight"
              type="number"
              min="0"
              label="Weight"
              prepend-inner-icon="mdi-weight-kilogram"
            />
            <v-text-field
              v-model.number="draft.weightRate"
              type="number"
              step="0.1"
              min="0"
              label="Weight Rate"
              prepend-inner-icon="mdi-currency-usd"
            />
          </v-row>

          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model="draft.totalCommission"
              label="Tổng Tiền Công"
              placeholder="Auto"
              background-color="green lighten-5"
              prepend-inner-icon="mdi-currency-usd"
            />
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.shippingCharge"
              label="Phí Ship"
              placeholder="Auto"
              type="number"
              min="0"
              background-color="green lighten-5"
              prepend-inner-icon="mdi-currency-usd"
            />
          </v-row>

          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.totalin"
              label="Mua Vào"
              placeholder="Auto"
              background-color="green lighten-5"
              prepend-inner-icon="mdi-currency-usd"
            />
            <!-- <v-checkbox v-model="draft.inVnd" label="VND"></v-checkbox> -->
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.total"
              label="Bán Ra"
              background-color="green lighten-5"
              placeholder="Auto"
              prepend-inner-icon="mdi-currency-usd"
            />
            <!-- <v-checkbox v-model="draft.outVnd" label="VND"></v-checkbox> -->
          </v-row>
        </v-col>
        <!-- v-model="draft.xxx" -->
        <v-col cols="12" md="4" class="pa-2" v-show="currentUser.admin">
          <v-menu
            v-model="orderDatePicker"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="draft.orderDate"
                label="Order Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              class="ma-0 pa-0"
              v-model="draft.orderDate"
              @input="orderDatePicker = false"
            ></v-date-picker>
          </v-menu>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-autocomplete
              v-model="draft.method"
              :items="methodOptions"
              label="Hình Thức Mua"
              prepend-inner-icon="mdi-cart"
            />
            <v-autocomplete
              v-model="draft.userId"
              :items="userOptions"
              label="Tài Khoản Mua"
              background-color="grey lighten-4"
              prepend-inner-icon="mdi-account"
              :rules="[rules.required]"
            />
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model.number="draft.transfered"
              type="number"
              min="0"
              label="Đã Chuyển Khoản"
              prepend-inner-icon="mdi-currency-usd"
            />
            <v-switch
              v-model="fullyTransfered"
              label="Toàn Bộ?"
              flat
            ></v-switch>
          </v-row>
          <v-row class="ma-0 pa-0" justify="space-between">
            <v-text-field
              v-model="draft.orderNumber"
              label="Mã Đơn Hàng"
              prepend-inner-icon="mdi-cart-check"
            />
            <v-text-field
              v-model="draft.gcCode"
              label="Mã Quà Tặng"
              prepend-inner-icon="mdi-barcode"
            />
          </v-row>
          <v-menu
            v-model="arrivalDatePicker"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="draft.arrivalDate"
                label="Arrival Date"
                prepend-inner-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="arrivalDate"
              class="ma-0 pa-0"
              @input="arrivalDatePicker = false"
            ></v-date-picker>
          </v-menu>
          <v-text-field
            v-model="draft.note"
            label="Note"
            prepend-inner-icon="mdi-note"
          />
          <v-autocomplete
            v-model="draft.status"
            :items="statusOptions"
            label="Trạng Thái"
            prepend-inner-icon="mdi-list-status"
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

        <v-col cols="12" class="text-right">
          <v-btn type="submit" depressed color="success" class="mr-2">
            CHẤP NHẬN
          </v-btn>
          <v-btn color="blue" depressed class="mr-2" @click="compute">
            TẠM TÍNH
          </v-btn>
          <v-btn color="grey" text class="mr-0" @click="cancel">
            HỦY BỎ
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import extractDomain from "extract-domain";
import computedOrder from "@/models/computedOrder";
import rules from "@/utils/formRules";
import newOrder from "@/models/NewOrder";

export default {
  props: ["order"],
  data: () => ({
    dialog: true,
    rules,
    draft: newOrder(),
    commissionType: "1",
    commission: 5,
    orderDatePicker: false,
    arrivalDatePicker: false,
    arrivalDate: moment().format("YYYY-MM-DD"),
    useTax: true,
    fullyTransfered: false,
    exchangeRates: [],

    userOptions: [],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Mới nhận", value: 1, color: "orange" },
      { text: "Cần Chuyển Khoản", value: 2, color: "red" },
      { text: "Đã Mua", value: 3, color: "green" },
      { text: "Hàng Về", value: 4, color: "blue" },
      { text: "Đã Nhận", value: 5, color: "blue darken-3" }
    ],
    methodOptions: [
      { text: "Tự Mua", value: 0 },
      { text: "Bên Mua Hộ 1", value: 1 },
      { text: "Bên Mua Hộ 2", value: 2 },
      { text: "Bên Mua Hộ 3", value: 3 }
    ],
    countryOptions: [
      { text: "USA", value: 1, color: "green" },
      { text: "UK", value: 2, color: "blue" },
      { text: "SPAIN", value: 3, color: "orange" },
      { text: "KOREA", value: 4, color: "red" }
    ]
  }),
  computed: {
    exchangeValue() {
      return this.exchangeRates[this.draft.country - 1]?.rate || 0;
    },
    ...mapState({
      currentUser: state => state.login.currentUser
    })
  },
  async created() {
    const userData = await this.fetchOrderCol({
      table: "members",
      colName: "User,id"
    });
    this.userOptions = userData.map(_i => ({
      text: _i.User,
      value: _i.id
    }));
    const exchangeData = await this.fetchExchange();
    this.exchangeRates = exchangeData;
  },

  methods: {
    submit() {
      if (!this.$refs.form.validate()) return false;
      const payload = this.compute();
      this.$emit("submit", payload);
    },
    compute() {
      const computedData = new computedOrder({
        ...this.draft,
        userId: this.draft.userId || this.currentUser.id,
        useTax: this.useTax,
        rate: this.exchangeValue,
        fullyTransfered: this.fullyTransfered,
        commission: this.commission,
        commissionType: this.commissionType
      });
      const { orderId, ...orderData } = computedData;
      return { id: orderId, order: orderData };
    },
    cancel() {
      this.$emit("cancel");
    },
    ...mapActions("order", ["fetchOrderCol", "setEditDialog"]),
    ...mapActions("exchange", ["fetchExchange"])
  },
  watch: {
    order: function(val) {
      this.draft = {
        ...val,
        totalCommission: "",
        totalin: val.inM ? val.totalin : "",
        total: val.outM ? val.total : ""
      };
      this.commission = val.chargeRawValue;
      if (!val.chargeMoney) {
        this.commissionType = "1";
      } else {
        this.commissionType = "2";
      }
    },
    "draft.country": function(val) {
      if (val === 2) this.draft.weightRate = 9.0;
      else this.draft.weightRate = 11.0;
      if (val === 1) this.draft.tax = 10;
      else this.draft.tax = 0;
    },
    "draft.link": function(val) {
      this.draft.site = extractDomain(val) || "";
    },
    arrivalDate(val) {
      this.draft.arrivalDate = val;
    },
    currentUser(val) {
      draft.userId = val.id;
    }
  }
};
</script>
