export const services = [
  { id: 'b2b2c3d4-0001-4b1b-9c1a-222222222222', name: 'Brušenje',     current_price_per_m2: 8 },
  { id: 'b2b2c3d4-0002-4b1b-9c1a-222222222222', name: 'Lakiranje',    current_price_per_m2: 7 },
  { id: 'b2b2c3d4-0003-4b1b-9c1a-222222222222', name: 'Postavljanje', current_price_per_m2: 12 },
  { id: 'b2b2c3d4-0004-4b1b-9c1a-222222222222', name: 'Parket',       current_price_per_m2: 25 },
  { id: 'b2b2c3d4-0005-4b1b-9c1a-222222222222', name: 'Laminat',      current_price_per_m2: 15 },
  { id: 'b2b2c3d4-0006-4b1b-9c1a-222222222222', name: 'Vinil',        current_price_per_m2: 18 },
];

const BRUSENJE = 'b2b2c3d4-0001-4b1b-9c1a-222222222222';
const LAKIRANJE = 'b2b2c3d4-0002-4b1b-9c1a-222222222222';
const POSTAVLJANJE = 'b2b2c3d4-0003-4b1b-9c1a-222222222222';
const PARKET = 'b2b2c3d4-0004-4b1b-9c1a-222222222222';
const LAMINAT = 'b2b2c3d4-0005-4b1b-9c1a-222222222222';
const VINIL = 'b2b2c3d4-0006-4b1b-9c1a-222222222222';

export const jobServices = [
  // 0001 - Parket u dnevnom boravku
  { id: 'd4d5c6b7-0001-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0001-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 28, price_per_m2: 25, material_cost: 0, created_at: '2026-07-10T09:00:00Z' },
  { id: 'd4d5c6b7-0002-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0001-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 28, price_per_m2: 12, material_cost: 35, created_at: '2026-07-10T09:00:00Z' },

  // 0002 - null notes -> laminat + postavljanje
  { id: 'd4d5c6b7-0003-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0002-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 22, price_per_m2: 15, material_cost: 0, created_at: '2026-07-08T10:30:00Z' },
  { id: 'd4d5c6b7-0004-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0002-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 22, price_per_m2: 12, material_cost: 20, created_at: '2026-07-08T10:30:00Z' },

  // 0003 - Brušenje parketa, stari pod
  { id: 'd4d5c6b7-0005-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0003-4a1a-9c1a-111111111111', service_id: BRUSENJE, square_meters: 18, price_per_m2: 8, material_cost: 0, created_at: '2026-07-08T08:15:00Z' },
  { id: 'd4d5c6b7-0006-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0003-4a1a-9c1a-111111111111', service_id: LAKIRANJE, square_meters: 18, price_per_m2: 7, material_cost: 15, created_at: '2026-07-08T08:15:00Z' },

  // 0004 - null notes -> vinil + postavljanje
  { id: 'd4d5c6b7-0007-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0004-4a1a-9c1a-111111111111', service_id: VINIL, square_meters: 26, price_per_m2: 18, material_cost: 0, created_at: '2026-07-03T11:00:00Z' },
  { id: 'd4d5c6b7-0008-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0004-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 26, price_per_m2: 12, material_cost: 25, created_at: '2026-07-03T11:00:00Z' },

  // 0005 - Klijent tražio hitno -> parket + postavljanje
  { id: 'd4d5c6b7-0009-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0005-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 20, price_per_m2: 25, material_cost: 0, created_at: '2026-07-01T07:45:00Z' },
  { id: 'd4d5c6b7-0010-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0005-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 20, price_per_m2: 12, material_cost: 30, created_at: '2026-07-01T07:45:00Z' },

  // 0006 - null notes -> laminat + postavljanje
  { id: 'd4d5c6b7-0011-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0006-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 15, price_per_m2: 15, material_cost: 0, created_at: '2026-06-26T09:20:00Z' },
  { id: 'd4d5c6b7-0012-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0006-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 15, price_per_m2: 12, material_cost: 10, created_at: '2026-06-26T09:20:00Z' },

  // 0007 - Laminat, hodnik i dnevni boravak
  { id: 'd4d5c6b7-0013-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0007-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 38, price_per_m2: 15, material_cost: 0, created_at: '2026-06-24T13:10:00Z' },
  { id: 'd4d5c6b7-0014-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0007-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 38, price_per_m2: 12, material_cost: 45, created_at: '2026-06-24T13:10:00Z' },

  // 0008 - null notes -> vinil + postavljanje
  { id: 'd4d5c6b7-0015-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0008-4a1a-9c1a-111111111111', service_id: VINIL, square_meters: 19, price_per_m2: 18, material_cost: 0, created_at: '2026-06-19T08:00:00Z' },
  { id: 'd4d5c6b7-0016-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0008-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 19, price_per_m2: 12, material_cost: 18, created_at: '2026-06-19T08:00:00Z' },

  // 0009 - Poliranje, kuhinja -> lakiranje
  { id: 'd4d5c6b7-0017-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0009-4a1a-9c1a-111111111111', service_id: LAKIRANJE, square_meters: 12, price_per_m2: 7, material_cost: 10, created_at: '2026-06-17T10:00:00Z' },

  // 0010 - null notes -> parket + postavljanje
  { id: 'd4d5c6b7-0018-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0010-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 24, price_per_m2: 25, material_cost: 0, created_at: '2026-06-14T09:30:00Z' },
  { id: 'd4d5c6b7-0019-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0010-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 24, price_per_m2: 12, material_cost: 28, created_at: '2026-06-14T09:30:00Z' },

  // 0011 - Parket, cijela kuća, veći posao
  { id: 'd4d5c6b7-0020-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0011-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 95, price_per_m2: 25, material_cost: 0, created_at: '2026-06-05T08:00:00Z' },
  { id: 'd4d5c6b7-0021-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0011-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 95, price_per_m2: 12, material_cost: 120, created_at: '2026-06-05T08:00:00Z' },

  // 0012 - null notes -> laminat + postavljanje
  { id: 'd4d5c6b7-0022-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0012-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 20, price_per_m2: 15, material_cost: 0, created_at: '2026-06-07T09:15:00Z' },
  { id: 'd4d5c6b7-0023-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0012-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 20, price_per_m2: 12, material_cost: 15, created_at: '2026-06-07T09:15:00Z' },

  // 0013 - Laminat
  { id: 'd4d5c6b7-0024-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0013-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 16, price_per_m2: 15, material_cost: 0, created_at: '2026-06-04T10:00:00Z' },
  { id: 'd4d5c6b7-0025-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0013-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 16, price_per_m2: 12, material_cost: 12, created_at: '2026-06-04T10:00:00Z' },

  // 0014 - null notes -> vinil + postavljanje
  { id: 'd4d5c6b7-0026-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0014-4a1a-9c1a-111111111111', service_id: VINIL, square_meters: 21, price_per_m2: 18, material_cost: 0, created_at: '2026-05-30T08:30:00Z' },
  { id: 'd4d5c6b7-0027-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0014-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 21, price_per_m2: 12, material_cost: 20, created_at: '2026-05-30T08:30:00Z' },

  // 0015 - Brušenje i lakiranje
  { id: 'd4d5c6b7-0028-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0015-4a1a-9c1a-111111111111', service_id: BRUSENJE, square_meters: 30, price_per_m2: 8, material_cost: 0, created_at: '2026-05-27T09:00:00Z' },
  { id: 'd4d5c6b7-0029-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0015-4a1a-9c1a-111111111111', service_id: LAKIRANJE, square_meters: 30, price_per_m2: 7, material_cost: 25, created_at: '2026-05-27T09:00:00Z' },

  // 0016 - null notes -> parket + postavljanje
  { id: 'd4d5c6b7-0030-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0016-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 18, price_per_m2: 25, material_cost: 0, created_at: '2026-05-24T10:45:00Z' },
  { id: 'd4d5c6b7-0031-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0016-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 18, price_per_m2: 12, material_cost: 15, created_at: '2026-05-24T10:45:00Z' },

  // 0017 - Poliranje starog parketa -> brušenje + lakiranje
  { id: 'd4d5c6b7-0032-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0017-4a1a-9c1a-111111111111', service_id: BRUSENJE, square_meters: 25, price_per_m2: 8, material_cost: 0, created_at: '2026-05-18T08:00:00Z' },
  { id: 'd4d5c6b7-0033-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0017-4a1a-9c1a-111111111111', service_id: LAKIRANJE, square_meters: 25, price_per_m2: 7, material_cost: 20, created_at: '2026-05-18T08:00:00Z' },

  // 0018 - Posao u tijeku (unfinished) -> parket + postavljanje
  { id: 'd4d5c6b7-0034-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0018-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 40, price_per_m2: 25, material_cost: 0, created_at: '2026-07-13T09:00:00Z' },
  { id: 'd4d5c6b7-0035-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0018-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 40, price_per_m2: 12, material_cost: 35, created_at: '2026-07-13T09:00:00Z' },

  // 0019 - Čekamo materijal (unfinished, material not bought yet)
  { id: 'd4d5c6b7-0036-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0019-4a1a-9c1a-111111111111', service_id: LAMINAT, square_meters: 28, price_per_m2: 15, material_cost: 0, created_at: '2026-07-14T07:30:00Z' },
  { id: 'd4d5c6b7-0037-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0019-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 28, price_per_m2: 12, material_cost: 0, created_at: '2026-07-14T07:30:00Z' },

  // 0020 - Parket, veća površina (unfinished)
  { id: 'd4d5c6b7-0038-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0020-4a1a-9c1a-111111111111', service_id: PARKET, square_meters: 60, price_per_m2: 25, material_cost: 0, created_at: '2026-07-11T08:45:00Z' },
  { id: 'd4d5c6b7-0039-4d1d-9c1a-444444444444', job_id: 'a1b2c3d4-0020-4a1a-9c1a-111111111111', service_id: POSTAVLJANJE, square_meters: 60, price_per_m2: 12, material_cost: 55, created_at: '2026-07-11T08:45:00Z' },
];