// Population pyramid data: each entry = [male%, female%] as % of total population
// Age groups: 0-4, 5-9, 10-14, 15-19, 20-24, 25-29, 30-34, 35-39, 40-44, 45-49, 50-54, 55-59, 60-64, 65-69, 70-74, 75+
// Source basis: UN World Population Prospects 2024

// Demographic stage helpers (not exported)
// Stage A: high fertility (Guatemala, Honduras, Haiti, Nicaragua, Bolivia)
const A = [[7.2,7.0],[6.8,6.6],[6.2,6.0],[5.5,5.3],[4.6,4.5],[3.8,3.7],[3.1,3.1],[2.5,2.4],[2.0,1.9],[1.6,1.6],[1.3,1.3],[1.0,1.0],[0.8,0.8],[0.6,0.6],[0.4,0.4],[0.4,0.5]]
// Stage B: medium-high fertility (El Salvador, Ecuador, Peru, Paraguay, Belize, Honduras variant)
const B = [[6.0,5.8],[5.8,5.6],[5.5,5.3],[5.0,4.9],[4.5,4.4],[4.0,3.9],[3.5,3.4],[3.0,2.9],[2.5,2.4],[2.0,2.0],[1.6,1.6],[1.2,1.2],[0.9,1.0],[0.6,0.7],[0.4,0.5],[0.4,0.5]]
// Stage C: medium fertility (Mexico, Colombia, Brazil, Dominican Rep, Jamaica, Venezuela, Ecuador)
const C = [[5.0,4.8],[5.0,4.8],[5.0,4.8],[5.0,4.8],[4.5,4.4],[4.2,4.1],[3.8,3.7],[3.4,3.3],[3.0,2.9],[2.5,2.5],[2.0,2.0],[1.6,1.6],[1.2,1.3],[0.8,0.9],[0.5,0.6],[0.5,0.7]]
// Stage D: low-medium fertility (Costa Rica, Panama, Trinidad, Barbados, Guyana, Suriname)
const D = [[4.5,4.3],[4.5,4.3],[4.5,4.3],[4.3,4.2],[4.2,4.1],[4.0,3.9],[3.8,3.7],[3.5,3.4],[3.2,3.1],[2.8,2.8],[2.3,2.3],[1.8,1.9],[1.4,1.5],[1.0,1.1],[0.6,0.7],[0.6,0.8]]
// Stage E: low fertility (Chile, Argentina, Uruguay, Cuba, Puerto Rico)
const E = [[3.8,3.7],[3.8,3.7],[3.8,3.7],[3.9,3.8],[4.0,3.9],[4.0,3.9],[3.8,3.7],[3.6,3.5],[3.3,3.3],[3.0,3.0],[2.6,2.7],[2.2,2.3],[1.8,2.0],[1.4,1.6],[1.0,1.2],[1.0,1.5]]
// Stage F: developed (United States)
const F = [[3.0,2.9],[3.1,3.0],[3.2,3.1],[3.3,3.2],[3.4,3.3],[3.6,3.5],[3.8,3.7],[3.6,3.5],[3.2,3.1],[3.2,3.2],[3.1,3.2],[2.9,3.0],[2.5,2.7],[2.1,2.3],[1.7,1.9],[1.9,2.6]]

export const pyramidData = {
  unitedstates: F,
  mexico: C,
  guatemala: A,
  belize: B,
  honduras: A,
  elsalvador: B,
  nicaragua: A,
  costarica: D,
  panama: D,
  cuba: E,
  jamaica: C,
  haiti: A,
  dominicanrepublic: C,
  puertorico: E,
  trinidadandtobago: D,
  barbados: D,
  colombia: C,
  venezuela: C,
  guyana: D,
  suriname: D,
  ecuador: B,
  peru: B,
  brazil: C,
  bolivia: A,
  paraguay: B,
  chile: E,
  argentina: E,
  uruguay: E,
}
