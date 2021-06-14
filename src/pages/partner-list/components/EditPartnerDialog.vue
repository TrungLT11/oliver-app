<template>
  <v-dialog :value="editDialog" width="550" origin="bottom right" persistent>
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sửa Đổi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="partner.name"
                label="Tên"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="partner.mobile"
                label="SĐT"
                prepend-inner-icon="mdi-phone"
            /></v-col>
          </v-row>
          <v-text-field
            v-model="partner.address"
            label="Địa Chỉ"
            prepend-inner-icon="mdi-map-marker"
          />
          <v-textarea
            v-model="partner.note"
            label="Ghi chú"
            rows="2"
            prepend-inner-icon="mdi-note"
          />
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
export default {
  data: () => ({
    rules,
    partner: {
      name: "",
      mobile: "",
      address: "",
      note: "",
    }
  }),
  computed: {
    ...mapState({
      editDialog: state => state.partner.editDialog,
      editingPartner: state => state.partner.editingPartner,
      currentUser: state => state.login.currentUser
    })
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return false;
      const partner = { ...this.partner };
      this.updatePartner({ id: partner.id, partner });
      this.fetchPartners();
      this.cancel();
    },
    cancel() {
      this.$refs.form.reset();
      this.setEditDialog(false);
    },
    ...mapActions("partner", ["setEditDialog", "updatePartner", "fetchPartners"])
  },
  watch: {
    editDialog(val) {
      if (val) this.partner = { ...this.editingPartner };
    }
  }
};
</script>
