export function slugify(text) {
  if (!text) return '';
  
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace whitespace with hyphens
    .replace(/[^a-z0-9-]+/g, '')    // Remove non-alphanumeric (except hyphens)
    .replace(/--+/g, '-')           // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
}
