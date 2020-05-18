<template>
  <div>
    <q-input
      autogrow
      outlined
      v-model="order.info"
      label="Дополнительная информация"
    />
  </div>
</template>

<script>
export default {
  name: 'OrderFields',
  props: {
    order: { type: Object, required: true }
  }
};
</script>
