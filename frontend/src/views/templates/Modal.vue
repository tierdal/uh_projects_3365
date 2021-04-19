<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header"></slot>
          <button type="button" class="btn-close" @click="close">x</button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
          </slot>
          <div class="editForm">
            <div class="editFormFooter-left">
              <button type="button" class="swal2-editform swal2-styled" @click="close">CLOSE</button>
            </div>
            <div class="editFormFooter-right">
              <button type="button" class="swal2-editform swal2-styled" @click="submit">SUBMIT</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>

</template>

<script>
//https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component
//https://medium.com/notonlycss/how-to-build-a-modal-in-vue-js-b3db644afaeb

export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit');
    }
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: auto;
  margin: 50px auto;
  border-radius: 5px;
  position: relative;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #c42727;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>
