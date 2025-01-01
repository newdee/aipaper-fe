// src/mixins/orderTypeMixin.js
import orderTypes from "@/utils/orderTypes";

const orderTypeMixin = {
  methods: {
    getOrderTypeName(typeKey) {
      return orderTypes[typeKey] || typeKey;
    },
  },
};

export default orderTypeMixin;
