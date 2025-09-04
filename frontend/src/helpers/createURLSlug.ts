export function createURLSlug(title: string): string {
  return title
    .normalize('NFD') // Normaliza a string para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Substitui espaços por hifens
    .replace(/^-+|-+$/g, ''); // Remove hifens no início e no fim
}
