export function formatTitleForUrl(title: string): string {
    // Convert to lowercase
    title = title.toLowerCase();
    // Remove all characters except alphanumeric, spaces, and underscores
    title = title.replace(/[^a-z0-9\s_]/g, '');
    // Replace one or more spaces with a single hyphen
    title = title.replace(/\s+/g, '-');
    return title;
  }