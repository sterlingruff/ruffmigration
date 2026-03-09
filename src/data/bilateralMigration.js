// Bilateral migration data - migrant stock estimates (thousands)
// Source basis: UN IOM Migration Data Portal, World Bank bilateral migration matrix
// * All figures are estimates and may be imprecise — bilateral migration data is notoriously difficult to measure

export const bilateralMigration = {
  unitedstates: {
    origins: [
      { country: 'Mexico', countryEs: 'México', value: 11200 },
      { country: 'India', countryEs: 'India', value: 2800 },
      { country: 'China', countryEs: 'China', value: 2500 },
      { country: 'Philippines', countryEs: 'Filipinas', value: 2000 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 1500 },
    ],
    destinations: [
      { country: 'Mexico', countryEs: 'México', value: 1200 },
      { country: 'Canada', countryEs: 'Canadá', value: 900 },
      { country: 'Germany', countryEs: 'Alemania', value: 250 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 200 },
      { country: 'Australia', countryEs: 'Australia', value: 180 },
    ],
  },
  mexico: {
    origins: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 800 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 50 },
      { country: 'Honduras', countryEs: 'Honduras', value: 35 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 30 },
      { country: 'Cuba', countryEs: 'Cuba', value: 22 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 11200 },
      { country: 'Spain', countryEs: 'España', value: 180 },
      { country: 'Canada', countryEs: 'Canadá', value: 80 },
      { country: 'Germany', countryEs: 'Alemania', value: 40 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 30 },
    ],
  },
  guatemala: {
    origins: [
      { country: 'Honduras', countryEs: 'Honduras', value: 18 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 14 },
      { country: 'Mexico', countryEs: 'México', value: 12 },
      { country: 'Nicaragua', countryEs: 'Nicaragua', value: 8 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 6 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1200 },
      { country: 'Mexico', countryEs: 'México', value: 30 },
      { country: 'Spain', countryEs: 'España', value: 25 },
      { country: 'Canada', countryEs: 'Canadá', value: 10 },
      { country: 'Honduras', countryEs: 'Honduras', value: 8 },
    ],
  },
  belize: {
    origins: [
      { country: 'Guatemala', countryEs: 'Guatemala', value: 20 },
      { country: 'Honduras', countryEs: 'Honduras', value: 12 },
      { country: 'Mexico', countryEs: 'México', value: 10 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 6 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 5 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 55 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 10 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 8 },
      { country: 'Mexico', countryEs: 'México', value: 4 },
      { country: 'Canada', countryEs: 'Canadá', value: 3 },
    ],
  },
  honduras: {
    origins: [
      { country: 'Nicaragua', countryEs: 'Nicaragua', value: 15 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 12 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 8 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 6 },
      { country: 'Mexico', countryEs: 'México', value: 4 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 900 },
      { country: 'Spain', countryEs: 'España', value: 60 },
      { country: 'Mexico', countryEs: 'México', value: 35 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 18 },
      { country: 'Canada', countryEs: 'Canadá', value: 10 },
    ],
  },
  elsalvador: {
    origins: [
      { country: 'Honduras', countryEs: 'Honduras', value: 12 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 10 },
      { country: 'Nicaragua', countryEs: 'Nicaragua', value: 6 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 5 },
      { country: 'Mexico', countryEs: 'México', value: 3 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1400 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 14 },
      { country: 'Mexico', countryEs: 'México', value: 12 },
      { country: 'Spain', countryEs: 'España', value: 10 },
      { country: 'Canada', countryEs: 'Canadá', value: 8 },
    ],
  },
  nicaragua: {
    origins: [
      { country: 'Honduras', countryEs: 'Honduras', value: 15 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 8 },
      { country: 'Guatemala', countryEs: 'Guatemala', value: 7 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 5 },
      { country: 'Colombia', countryEs: 'Colombia', value: 3 },
    ],
    destinations: [
      { country: 'Costa Rica', countryEs: 'Costa Rica', value: 450 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 400 },
      { country: 'Spain', countryEs: 'España', value: 45 },
      { country: 'Panama', countryEs: 'Panamá', value: 20 },
      { country: 'Mexico', countryEs: 'México', value: 12 },
    ],
  },
  costarica: {
    origins: [
      { country: 'Nicaragua', countryEs: 'Nicaragua', value: 450 },
      { country: 'Colombia', countryEs: 'Colombia', value: 30 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 25 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 20 },
      { country: 'El Salvador', countryEs: 'El Salvador', value: 10 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 140 },
      { country: 'Spain', countryEs: 'España', value: 30 },
      { country: 'Panama', countryEs: 'Panamá', value: 20 },
      { country: 'Mexico', countryEs: 'México', value: 10 },
      { country: 'Canada', countryEs: 'Canadá', value: 8 },
    ],
  },
  panama: {
    origins: [
      { country: 'Colombia', countryEs: 'Colombia', value: 80 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 35 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 25 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 15 },
      { country: 'Nicaragua', countryEs: 'Nicaragua', value: 12 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 140 },
      { country: 'Spain', countryEs: 'España', value: 20 },
      { country: 'Colombia', countryEs: 'Colombia', value: 15 },
      { country: 'Costa Rica', countryEs: 'Costa Rica', value: 12 },
      { country: 'Mexico', countryEs: 'México', value: 5 },
    ],
  },
  cuba: {
    origins: [
      { country: 'Haiti', countryEs: 'Haití', value: 5 },
      { country: 'Spain', countryEs: 'España', value: 4 },
      { country: 'Dominican Republic', countryEs: 'Rep. Dominicana', value: 3 },
      { country: 'China', countryEs: 'China', value: 2 },
      { country: 'Jamaica', countryEs: 'Jamaica', value: 1 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1300 },
      { country: 'Spain', countryEs: 'España', value: 160 },
      { country: 'Mexico', countryEs: 'México', value: 22 },
      { country: 'Italy', countryEs: 'Italia', value: 18 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 12 },
    ],
  },
  jamaica: {
    origins: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 12 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 8 },
      { country: 'Canada', countryEs: 'Canadá', value: 6 },
      { country: 'Haiti', countryEs: 'Haití', value: 4 },
      { country: 'Cuba', countryEs: 'Cuba', value: 2 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 700 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 160 },
      { country: 'Canada', countryEs: 'Canadá', value: 120 },
      { country: 'Spain', countryEs: 'España', value: 12 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 10 },
    ],
  },
  haiti: {
    origins: [
      { country: 'Dominican Republic', countryEs: 'Rep. Dominicana', value: 20 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 12 },
      { country: 'Cuba', countryEs: 'Cuba', value: 4 },
      { country: 'Jamaica', countryEs: 'Jamaica', value: 2 },
      { country: 'France', countryEs: 'Francia', value: 2 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 750 },
      { country: 'Dominican Republic', countryEs: 'Rep. Dominicana', value: 700 },
      { country: 'Canada', countryEs: 'Canadá', value: 120 },
      { country: 'France', countryEs: 'Francia', value: 100 },
      { country: 'Brazil', countryEs: 'Brasil', value: 60 },
    ],
  },
  dominicanrepublic: {
    origins: [
      { country: 'Haiti', countryEs: 'Haití', value: 700 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 50 },
      { country: 'Spain', countryEs: 'España', value: 18 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 15 },
      { country: 'Cuba', countryEs: 'Cuba', value: 10 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1200 },
      { country: 'Spain', countryEs: 'España', value: 180 },
      { country: 'Italy', countryEs: 'Italia', value: 40 },
      { country: 'Puerto Rico', countryEs: 'Puerto Rico', value: 35 },
      { country: 'France', countryEs: 'Francia', value: 12 },
    ],
  },
  puertorico: {
    origins: [
      { country: 'Dominican Republic', countryEs: 'Rep. Dominicana', value: 120 },
      { country: 'Cuba', countryEs: 'Cuba', value: 40 },
      { country: 'Mexico', countryEs: 'México', value: 15 },
      { country: 'Colombia', countryEs: 'Colombia', value: 12 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 8 },
    ],
    destinations: [
      { country: 'United States (mainland)', countryEs: 'EE.UU. (continental)', value: 5800 },
      { country: 'Dominican Republic', countryEs: 'Rep. Dominicana', value: 35 },
      { country: 'Spain', countryEs: 'España', value: 25 },
      { country: 'Florida (US)', countryEs: 'Florida (EE.UU.)', value: 4200 },
      { country: 'New York (US)', countryEs: 'Nueva York (EE.UU.)', value: 900 },
    ],
  },
  trinidadandtobago: {
    origins: [
      { country: 'Guyana', countryEs: 'Guyana', value: 25 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 20 },
      { country: 'Barbados', countryEs: 'Barbados', value: 5 },
      { country: 'Grenada', countryEs: 'Granada', value: 4 },
      { country: 'Jamaica', countryEs: 'Jamaica', value: 3 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 200 },
      { country: 'Canada', countryEs: 'Canadá', value: 100 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 80 },
      { country: 'Barbados', countryEs: 'Barbados', value: 10 },
      { country: 'Guyana', countryEs: 'Guyana', value: 8 },
    ],
  },
  barbados: {
    origins: [
      { country: 'Guyana', countryEs: 'Guyana', value: 15 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 8 },
      { country: 'Jamaica', countryEs: 'Jamaica', value: 6 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 4 },
      { country: 'St. Vincent', countryEs: 'San Vicente', value: 3 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 55 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 45 },
      { country: 'Canada', countryEs: 'Canadá', value: 30 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 5 },
      { country: 'Guyana', countryEs: 'Guyana', value: 3 },
    ],
  },
  colombia: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 280 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 25 },
      { country: 'Haiti', countryEs: 'Haití', value: 18 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 15 },
      { country: 'Spain', countryEs: 'España', value: 12 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1200 },
      { country: 'Spain', countryEs: 'España', value: 850 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 800 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 300 },
      { country: 'Panama', countryEs: 'Panamá', value: 80 },
    ],
  },
  venezuela: {
    origins: [
      { country: 'Colombia', countryEs: 'Colombia', value: 800 },
      { country: 'Spain', countryEs: 'España', value: 40 },
      { country: 'Portugal', countryEs: 'Portugal', value: 25 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 15 },
      { country: 'Italy', countryEs: 'Italia', value: 12 },
    ],
    destinations: [
      { country: 'Colombia', countryEs: 'Colombia', value: 2500 },
      { country: 'Peru', countryEs: 'Perú', value: 1500 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 700 },
      { country: 'Spain', countryEs: 'España', value: 500 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 480 },
    ],
  },
  guyana: {
    origins: [
      { country: 'Haiti', countryEs: 'Haití', value: 10 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 10 },
      { country: 'Suriname', countryEs: 'Surinam', value: 5 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 3 },
      { country: 'Barbados', countryEs: 'Barbados', value: 2 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 300 },
      { country: 'United Kingdom', countryEs: 'Reino Unido', value: 100 },
      { country: 'Canada', countryEs: 'Canadá', value: 90 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 25 },
      { country: 'Suriname', countryEs: 'Surinam', value: 10 },
    ],
  },
  suriname: {
    origins: [
      { country: 'Guyana', countryEs: 'Guyana', value: 8 },
      { country: 'Brazil', countryEs: 'Brasil', value: 5 },
      { country: 'Haiti', countryEs: 'Haití', value: 4 },
      { country: 'China', countryEs: 'China', value: 3 },
      { country: 'Barbados', countryEs: 'Barbados', value: 2 },
    ],
    destinations: [
      { country: 'Netherlands', countryEs: 'Países Bajos', value: 350 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 40 },
      { country: 'Guyana', countryEs: 'Guyana', value: 10 },
      { country: 'Trinidad', countryEs: 'Trinidad', value: 5 },
      { country: 'Brazil', countryEs: 'Brasil', value: 4 },
    ],
  },
  ecuador: {
    origins: [
      { country: 'Colombia', countryEs: 'Colombia', value: 300 },
      { country: 'Venezuela', countryEs: 'Venezuela', value: 480 },
      { country: 'Peru', countryEs: 'Perú', value: 40 },
      { country: 'Cuba', countryEs: 'Cuba', value: 20 },
      { country: 'Spain', countryEs: 'España', value: 10 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 600 },
      { country: 'Spain', countryEs: 'España', value: 550 },
      { country: 'Italy', countryEs: 'Italia', value: 120 },
      { country: 'Colombia', countryEs: 'Colombia', value: 40 },
      { country: 'Chile', countryEs: 'Chile', value: 35 },
    ],
  },
  peru: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 1500 },
      { country: 'Colombia', countryEs: 'Colombia', value: 120 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 35 },
      { country: 'Chile', countryEs: 'Chile', value: 20 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 15 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 650 },
      { country: 'Chile', countryEs: 'Chile', value: 450 },
      { country: 'Spain', countryEs: 'España', value: 250 },
      { country: 'Argentina', countryEs: 'Argentina', value: 200 },
      { country: 'Ecuador', countryEs: 'Ecuador', value: 40 },
    ],
  },
  brazil: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 60 },
      { country: 'Colombia', countryEs: 'Colombia', value: 40 },
      { country: 'Haiti', countryEs: 'Haití', value: 60 },
      { country: 'Portugal', countryEs: 'Portugal', value: 220 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 30 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 1500 },
      { country: 'Portugal', countryEs: 'Portugal', value: 300 },
      { country: 'Spain', countryEs: 'España', value: 150 },
      { country: 'Germany', countryEs: 'Alemania', value: 100 },
      { country: 'Italy', countryEs: 'Italia', value: 80 },
    ],
  },
  bolivia: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 30 },
      { country: 'Argentina', countryEs: 'Argentina', value: 20 },
      { country: 'Peru', countryEs: 'Perú', value: 15 },
      { country: 'Brazil', countryEs: 'Brasil', value: 10 },
      { country: 'Chile', countryEs: 'Chile', value: 8 },
    ],
    destinations: [
      { country: 'Argentina', countryEs: 'Argentina', value: 350 },
      { country: 'Spain', countryEs: 'España', value: 250 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 150 },
      { country: 'Brazil', countryEs: 'Brasil', value: 60 },
      { country: 'Chile', countryEs: 'Chile', value: 55 },
    ],
  },
  paraguay: {
    origins: [
      { country: 'Argentina', countryEs: 'Argentina', value: 30 },
      { country: 'Brazil', countryEs: 'Brasil', value: 180 },
      { country: 'Uruguay', countryEs: 'Uruguay', value: 8 },
      { country: 'Bolivia', countryEs: 'Bolivia', value: 6 },
      { country: 'Colombia', countryEs: 'Colombia', value: 4 },
    ],
    destinations: [
      { country: 'Argentina', countryEs: 'Argentina', value: 800 },
      { country: 'Spain', countryEs: 'España', value: 80 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 40 },
      { country: 'Brazil', countryEs: 'Brasil', value: 30 },
      { country: 'Uruguay', countryEs: 'Uruguay', value: 15 },
    ],
  },
  chile: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 550 },
      { country: 'Peru', countryEs: 'Perú', value: 450 },
      { country: 'Colombia', countryEs: 'Colombia', value: 280 },
      { country: 'Haiti', countryEs: 'Haití', value: 200 },
      { country: 'Bolivia', countryEs: 'Bolivia', value: 120 },
    ],
    destinations: [
      { country: 'United States', countryEs: 'Estados Unidos', value: 100 },
      { country: 'Spain', countryEs: 'España', value: 80 },
      { country: 'Argentina', countryEs: 'Argentina', value: 50 },
      { country: 'Peru', countryEs: 'Perú', value: 20 },
      { country: 'Colombia', countryEs: 'Colombia', value: 15 },
    ],
  },
  argentina: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 220 },
      { country: 'Bolivia', countryEs: 'Bolivia', value: 350 },
      { country: 'Paraguay', countryEs: 'Paraguay', value: 800 },
      { country: 'Chile', countryEs: 'Chile', value: 50 },
      { country: 'Peru', countryEs: 'Perú', value: 200 },
    ],
    destinations: [
      { country: 'Spain', countryEs: 'España', value: 300 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 250 },
      { country: 'Italy', countryEs: 'Italia', value: 150 },
      { country: 'Chile', countryEs: 'Chile', value: 50 },
      { country: 'Mexico', countryEs: 'México', value: 30 },
    ],
  },
  uruguay: {
    origins: [
      { country: 'Venezuela', countryEs: 'Venezuela', value: 50 },
      { country: 'Argentina', countryEs: 'Argentina', value: 40 },
      { country: 'Brazil', countryEs: 'Brasil', value: 30 },
      { country: 'Colombia', countryEs: 'Colombia', value: 15 },
      { country: 'Chile', countryEs: 'Chile', value: 5 },
    ],
    destinations: [
      { country: 'Argentina', countryEs: 'Argentina', value: 120 },
      { country: 'Spain', countryEs: 'España', value: 100 },
      { country: 'United States', countryEs: 'Estados Unidos', value: 80 },
      { country: 'Brazil', countryEs: 'Brasil', value: 40 },
      { country: 'Italy', countryEs: 'Italia', value: 20 },
    ],
  },
}
