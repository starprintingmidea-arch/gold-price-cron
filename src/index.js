import dotenv from 'dotenv';
import { fetchGoldPrice } from './services/apiService.js';
import { getLastPrice, insertPrice } from './services/dbService.js';
import { log, error } from './utils/logger.js';

dotenv.config();

const SYMBOL = 'XAU/USD';

async function main() {
  log('Job started');

  try {
    const price = await fetchGoldPrice(process.env.API_URL);

    const lastPrice = await getLastPrice();

    if (lastPrice === price) {
      log('No change, skipping...');
      return;
    }

    await insertPrice(SYMBOL, price);

    log('Inserted:', price);

  } catch (err) {
    error('Error:', err.message);
  }
}

main();