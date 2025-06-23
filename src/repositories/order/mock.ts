/**
 * Creates a new order in the mock store.
 * @param {OrderPayload} payload - The order details.
 * @returns {OrderRecord} The stored order record, including its confirmationId.
 */

const orders = {};
let nextId = 1;

export function createOrder(payload) {
  const confirmationId = `order-${nextId++}`;
  const record = { confirmationId, ...payload };
  orders[confirmationId] = record;

  return record;
}