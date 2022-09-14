<template>
    <input
      v-bind="$attrs"
      :name="name"
      :id="name"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @focus="focused = true"
      @blur.passive="onBlur"
      @input="updateValue"
    />
  </template>
  
  <script>
  import { ref, toRefs } from 'vue';
  
  export default {
    name: 'AppInput',
    props: {
      name: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      error: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'text',
      },
      required: {
        type: Boolean,
      },
      modelValue: {
        type: [String, Number],
        default: '',
      },
      onValidate: {
        type: Function,
      },
    },
    emits: ['update:modelValue'],
    setup(props, context) {
      const { error, modelValue } = toRefs(props);
      const focused = ref(false);
  
      const onBlur = () => {
        setTimeout(() => {
          focused.value = false;
        }, 100);
  
        props.onValidate();
      };
  
      const updateValue = (event) => {
        context.emit('update:modelValue', event.target.value);
        props.onValidate();
      };
  
      return {
        modelValue,
        focused,
        onBlur,
        updateValue,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  