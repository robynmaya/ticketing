process.env.NODE_ENV = 'development';

// Direct mock import
import { getEventById as mockGetEvent } from './src/repositories/event/mock';
// Barrel import for event (mock or prod based on NODE_ENV)
import { getEventById } from './src/repositories/event';
// Barrel import for order (mock or prod based on NODE_ENV)
import { createOrder } from './src/repositories/order';
// Service imports
import { fetchEvent } from './src/services/ticketing/event';
import { submitOrder } from './src/services/ticketing/order';

async function testMockRepoEvent() {
  console.log('=== MOCK REPO EVENT (NODE_ENV != production) ===');
  try {
    const e = mockGetEvent('btess');
    console.log('mockGetEvent("btess") →', e);
  } catch (err: any) {
    console.error('mock repo event error →', err.message);
  }
}

async function testProdRepoEvent() {
  console.log('\n=== PROD REPO EVENT (NODE_ENV=production) ===');
  try {
    const e = await getEventById('btess');
    console.log('repo getEventById("btess") →', e);
  } catch (err: any) {
    console.error('prod repo event error →', err.message);
  }
}

async function testServiceFetchEvent() {
  console.log('\n=== SERVICE fetchEvent ===');
  try {
    const e = await fetchEvent('btess');
    console.log('fetchEvent("btess") →', e);
  } catch (err: any) {
    console.error('service fetchEvent error →', err.message);
  }
}

async function testMockRepoOrder() {
  console.log('\n=== MOCK REPO ORDER ===');
  try {
    const o = createOrder({
      eventId: 'btess',
      tickets: [{ type: 'general', quantity: 2 }],
      customer: { name: 'Test', email: 'test@example.com' },
      time: Date.now(),
    });
    console.log('mock createOrder →', o);
  } catch (err: any) {
    console.error('mock repo order error →', err.message);
  }
}

async function testServiceSubmitOrder() {
  console.log('\n=== SERVICE submitOrder ===');
  try {
    const o = await submitOrder({
      eventId: 'btess',
      tickets: [{ type: 'general', quantity: 2 }],
      customer: { name: 'Test', email: 'test@example.com' },
    });
    console.log('submitOrder →', o);
  } catch (err: any) {
    console.error('service submitOrder error →', err.message);
  }
}

(async () => {
  await testMockRepoEvent();
  await testProdRepoEvent();
  await testServiceFetchEvent();
  await testMockRepoOrder();
  await testServiceSubmitOrder();
})();
