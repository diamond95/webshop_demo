<template>
  <v-container>
    <div class="empty-space"></div>
    <v-row v-if="showUserInformation">
      <v-col cols="12" md="2" lg="2"></v-col>
      <v-col cols="12" md="8" lg="8">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" color="indigo">Your information</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" color="indigo">Payment</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" color="indigo">Finish order</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card class="mb-12" color="white lighten-1" height="200px">
                  <!-- User information -->
                  <v-row>
                    <v-col cols="12" md="1" lg="1"></v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-text-field
                        v-model="name"
                        :counter="30"
                        :rules="nameRules"
                        label="Name and surname"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                      <v-text-field
                        v-model="email"
                        :counter="30"
                        :rules="emailRules"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-text-field v-model="phone" :counter="12" label="Phone number" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="1" lg="1"></v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="1" lg="1"></v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-text-field
                        v-model="address"
                        :counter="30"
                        :rules="addressRules"
                        label="Address"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                      <v-text-field v-model="city" label="City" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-text-field v-model="zip" label="Zip Code" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="1" lg="1"></v-col>
                  </v-row>
                </v-card>
              </v-form>

              <v-btn color="indigo" class="white--text" @click="validate(e1 = 2); ">Continue</v-btn>

              <v-btn text @click="back()">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-form ref="form2" v-model="valid2" lazy-validation>
                <v-card class="mb-12" color="white lighten-1" height="200px">
                  <!-- Payment information -->
                  <v-row>
                    <v-col cols="12" md="1" lg="1"></v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-select
                        :items="payment"
                        label="Payment method"
                        :rules="[v => !!v || 'Payment is required']"
                        solo
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" lg="4">
                      <v-text-field
                        v-model="card"
                        :counter="12"
                        :rules="cardRules"
                        label="Card number"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" lg="3">
                      <v-text-field v-model="cvv" :counter="3" label="CVV number" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="1" lg="1"></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" lg="4"></v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Expiration date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable type="month">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="12" md="3" lg="3"></v-col>
                  </v-row>
                </v-card>
              </v-form>

              <v-btn color="indigo" class="white--text" @click="validate2(e1 = 3)">Continue</v-btn>

              <v-btn text @click="e1 = 1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="white lighten-1">
                <!-- Finish order -->
                <v-card class="mx-auto text-center" color="indigo " dark max-width="600">
                  <v-card-text>
                    <v-sheet color="rgba(0, 0, 0, .12)">
                      <v-sparkline
                        :value="value"
                        color="indigo lighten-3"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                        hide-details
                      ></v-sparkline>
                    </v-sheet>
                  </v-card-text>

                  <v-card-text>
                    <div class="display-1 font-weight-thin">Your order is on the way!</div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-center">
                    <v-btn block text @click="openReport()">Go to Report</v-btn>
                  </v-card-actions>
                </v-card>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="12" md="2" lg="2"></v-col>
    </v-row>
    <Report v-if="showReport"></Report>
  </v-container>
</template>

<style scoped>
.empty-space {
  height: 100px;
}
</style>

<script>
import Report from "./Report";
export default {
  components: {
    Report
  },
  methods: {
    back() {
      this.$router.push({
        name: "Cart"
      });
    },
    validate(dd) {
      let check = this.$refs.form.validate();
      this.e1 = dd - 1;
      if (check) this.e1 = dd;
    },
    validate2(dd) {
      let check2 = this.$refs.form2.validate();
      this.e1 = dd - 1;
      if (check2) this.e1 = dd;
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    openReport() {
      this.showUserInformation = false
      this.showReport = true
    }
  },
  data() {
    return {
      e1: 1,
      valid: true,
      valid2: true,
      name: "Louise V Kenyon",
      email: "admin@email.com",
      phone: "+38592829120",
      address: "1536 St. Danez Dove Lane",
      city: "New York",
      zip: 20179,
      cvv: 236,
      payment: ["American Express", "Visa", "Maestro"],
      card: 234666210925,
      cardRules: [v => !!v || "Card is required"],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      addressRules: [
        v => !!v || "Address is required",
        v => (v && v.length <= 30) || "Address must be less than 30 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      menu2: false,
      value: [423, 446, 675, 510, 590, 610, 760],
      showReport: false,
      showUserInformation: true
    };
  }
};
</script>