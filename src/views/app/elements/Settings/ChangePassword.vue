<template>
  <div class="center">
    <vs-dialog prevent-close v-model="active">
      <template #header>
        <h4 class="not-margin">
          Change
          <b>Password</b>
        </h4>
      </template>

      <div class="con-form">
        <vs-input v-model="input1" type="password" autocomplete="off" placeholder="New password">
          <template #icon>
            <v-icon>mdi-lock</v-icon>
          </template>
        </vs-input>
        <vs-input
          type="password"
          v-model="input2"
          autocomplete="off"
          placeholder="Confirm password"
        >
          <template #icon>
            <v-icon>mdi-lock</v-icon>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>OK</vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<style lang="stylus">
getColor(vsColor, alpha = 1) {
  unquote('rgba(var(--vs-' + vsColor + '), ' + alpha + ')');
}

getVar(var) {
  unquote('var(--vs-' + var + ')');
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}

.con-form {
  width: 100%;

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
      font-size: 0.8rem;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }

  .vs-checkbox-label {
    font-size: 0.8rem;
  }

  .vs-input-content {
    margin: 10px 0px;
    width: calc(100%);

    .vs-input {
      width: 100%;
    }
  }
}

.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);

  .new {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    font-size: 0.7rem;

    a {
      color: getColor('primary') !important;
      margin-left: 6px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .vs-button {
    margin: 0px;
  }
}
</style>

<script>
export default {
  data: () => ({
    active: true,
    input1: "",
    input2: "",
    checkbox1: false
  }),
  methods: {}
};
</script>
