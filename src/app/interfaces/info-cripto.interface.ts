export interface Criptos {
  id: string;
  symbol: string;
  name: string;
  slug: string;
  color: string;
  image_url: string;
  listed: boolean;
  launched_at?: string;
  description?: string;
  exponent: number;
  unit_price_scale: number;
  transaction_unit_price_scale: number;
  address_regex: string;
  resource_urls: Resourceurl[];
  base: string;
  currency: string;
  rank: number;
  market_cap: string;
  percent_change: number;
  latest: string;
  volume_24h: string;
  circulating_supply: string;
  latest_price: Latestprice;
}

export interface Latestprice {
  amount: Amount;
  timestamp: string;
  percent_change: Percentchange;
}

export interface Percentchange {
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
  all: number;
}

export interface Amount {
  amount: string;
  currency: string;
  scale: string;
}

export interface Resourceurl {
  type: string;
  icon_url: string;
  title: string;
  link: string;
}

export interface Pagination {
  ending_before?: any;
  starting_after?: any;
  previous_ending_before?: any;
  next_starting_after: string;
  limit: number;
  order: string;
  previous_uri?: any;
  next_uri: string;
  timestamp: string;
}